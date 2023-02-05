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

export const checkPointInsidePolygon = (vertices: number[][], point: number[]): boolean => {
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

export const getTopLeftAndBottomRight = (vertices: number[][]): { topLeft: [number, number], bottomRight: [number, number] } => {
    const topLeft: [number, number] = [-1, -1];
    const bottomRight: [number, number] = [-1, -1];

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

    return { topLeft, bottomRight };
};

export const getDistanceBetweenPoints = (p1: [number, number], p2: [number, number]): number => {
    return Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2));
};