// "centers" are points where there are numPoints randomized points
// at most maxDist distance from center (x, y)
interface centerOptions {
    numPoints: number,
    maxDist: number,
    minDist?: number
};

export const generateDataCenter = (center: [number, number], centerOptions: centerOptions): number[][] => {
    const data = [];
    const [x, y] = center;
    const { numPoints, maxDist } = centerOptions;
    let { minDist } = centerOptions;

    if (minDist === undefined) {
        minDist = 0;
    }

    for (let n = 0; n < numPoints; n++) {
        const minDistSquared = minDist * minDist;
        const squaredDiff = (maxDist * maxDist) - minDistSquared;

        const dist = Math.sqrt(Math.random() * squaredDiff + minDistSquared);
        const angle = Math.random() * 2 * Math.PI;

        data.push([
            x + Math.cos(angle) * dist,
            y + Math.sin(angle) * dist
        ]);
    }

    return data;
};

export interface line {
    from: number[],
    to: number[]
};

// ray starts from left end of canvas (x = 0)
const checkRayIntersects = (line: line, ray: number[]): boolean => {
    const { from, to } = line;

    const slope = (to[0] - from[0]) / (to[1] - from[1]);

    if (to[1] - from[1] === 0) return false;
    else if(to[0] - from[0] === 0) {
        return to[0] <= ray[0];
    }

    const intersectX = (ray[1] - from[1]) * slope + from[0];

    const minX = Math.min(from[0], to[0]);
    const maxX = Math.min(Math.max(from[0], to[0]), ray[0]);

    return intersectX >= minX && intersectX <= maxX;
};

const checkPointInsidePolygon = (vertices: number[][], point: number[]): boolean => {
    let count = 0;

    for (let i = 0; i < vertices.length; i++) {
        let j = i + 1;

        if (j == vertices.length) {
            j = 0;
        }

        const line = {
            from: vertices[i],
            to: vertices[j]
        };

        if (checkRayIntersects(line, point)) count++;
    }

    return count % 2 === 1;
};

export const generateDataShape = (vertices: number[][], centerOptions: centerOptions): number[][] => {
    // find the top left point
    // find the bottom right point
    // move in a spaced grid, creating dataCenters each time
    // the grid point is in the polygon (defined by the vertices)

    const data: number[][] = [];

    const topLeft = [-1, -1];
    const bottomRight = [-1, -1];

    for (let point of vertices) {
        if (topLeft[0] == -1 || point[0] < topLeft[0]) {
            topLeft[0] = point[0];
        }
        if (topLeft[1] == -1 || point[1] < topLeft[1]) {
            topLeft[1] = point[1];
        }
        if (bottomRight[0] == -1 || point[0] > bottomRight[0]) {
            bottomRight[0] = point[0];
        }
        if (bottomRight[1] == -1 || point[1] > bottomRight[1]) {
            bottomRight[1] = point[1];
        }
    }

    const { maxDist } = centerOptions;

    for (let x = topLeft[0]; x < bottomRight[0] + maxDist; x += maxDist) {
        for (let y = topLeft[1]; y < bottomRight[1] + maxDist; y += maxDist) {
            
            const point: [number, number] = [x, y];
            
            if (checkPointInsidePolygon(vertices, point)) {
                const dataCenterPoints = generateDataCenter(point, centerOptions);

                for (let dataCenterPoint of dataCenterPoints) {
                    data.push(dataCenterPoint);
                }
            }
        }
    }

    return data;
};