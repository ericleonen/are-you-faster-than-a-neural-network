// "centers" are points where there are numPoints randomized points
// at most maxDist distance from center (x, y)
interface centerOptions {
    numPoints: number,
    maxDist: number
};

export const generateDataCenter = (center: [number, number], centerOptions: centerOptions): number[][] => {
    const data = [];
    const [x, y] = center;
    const { numPoints, maxDist } = centerOptions;

    for (let n = 0; n < numPoints; n++) {
        const dist = Math.random() * maxDist;
        const angle = Math.random() * 2 * Math.PI;

        data.push([
            x + Math.cos(angle) * dist,
            y + Math.sin(angle) * dist
        ]);
    }

    return data;
};