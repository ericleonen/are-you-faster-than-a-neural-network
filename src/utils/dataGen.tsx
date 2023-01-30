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

    return data;
};