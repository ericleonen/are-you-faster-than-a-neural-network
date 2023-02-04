import { line, checkPointInsidePolygon, getTopLeftAndBottomRight } from "./polygons";

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

export const generateDataShape = (vertices: number[][], centerOptions: centerOptions): number[][] => {
    // find the top left point
    // find the bottom right point
    // move in a spaced grid, creating dataCenters each time
    // the grid point is in the polygon (defined by the vertices)

    const data: number[][] = [];

    const { topLeft, bottomRight } = getTopLeftAndBottomRight(vertices);

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