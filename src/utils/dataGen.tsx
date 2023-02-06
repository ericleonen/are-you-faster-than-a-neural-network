import { checkPointInsidePolygon, getTopLeftAndBottomRight } from "./polygons";
import { dataPoint } from "./data";

// "centers" are points where there are numPoints randomized points
// at most maxDist distance from center (x, y)
interface centerOptions {
    numPoints: number,
    maxDist: number,
    minDist?: number,
    color: "cyan" | "indigo"
};

export const generateDataCenter = (center: [number, number], centerOptions: centerOptions): dataPoint[] => {
    const dataPoints: dataPoint[] = [];
    const [x, y] = center;
    const { numPoints, maxDist, color } = centerOptions;
    let { minDist } = centerOptions;

    if (minDist === undefined) {
        minDist = 0;
    }

    for (let n = 0; n < numPoints; n++) {
        const minDistSquared = minDist * minDist;
        const squaredDiff = (maxDist * maxDist) - minDistSquared;

        const dist = Math.sqrt(Math.random() * squaredDiff + minDistSquared);
        const angle = Math.random() * 2 * Math.PI;

        const coord: [number, number] = [
            x + Math.cos(angle) * dist,
            y + Math.sin(angle) * dist
        ];

        dataPoints.push({
            coord,
            color
        });
    }

    return dataPoints;
};

export const generateDataShape = (vertices: number[][], centerOptions: centerOptions): dataPoint[] => {
    // find the top left point
    // find the bottom right point
    // move in a spaced grid, creating dataCenters each time
    // the grid point is in the polygon (defined by the vertices)

    let dataPoints: dataPoint[] = [];

    const { topLeft, bottomRight } = getTopLeftAndBottomRight(vertices);

    const { maxDist } = centerOptions;

    for (let x = topLeft[0]; x < bottomRight[0] + maxDist; x += maxDist) {
        for (let y = topLeft[1]; y < bottomRight[1] + maxDist; y += maxDist) {
            
            const point: [number, number] = [x, y];
            
            if (checkPointInsidePolygon(vertices, point)) {
                const dataCenterPoints = generateDataCenter(point, centerOptions);
                dataPoints = dataPoints.concat(dataCenterPoints);
            }
        }
    }

    return dataPoints;
};