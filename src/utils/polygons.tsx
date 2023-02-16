export interface line {
    from: [number, number],
    to: [number, number]
};

// ray starts from left end of canvas (x = 0)
const checkRayIntersects = (line: line, ray: [number, number]): number => {
    const { from, to } = line;

    const slope = (to[0] - from[0]) / (to[1] - from[1]);

    if (to[1] - from[1] === 0) return -1;
    else if (to[0] - from[0] === 0) {
        return (to[0] <= ray[0]) ? ray[0] - to[0] : - 1;
    }

    const intersectX = (ray[1] - from[1]) * slope + from[0];

    const minX = Math.min(from[0], to[0]);
    const maxX = Math.min(Math.max(from[0], to[0]), ray[0]);

    return (intersectX >= minX && intersectX <= maxX) ? ray[0] - intersectX : -1;
};

export const checkLinesIntersect = (line1: line, line2: line): boolean => {
    const { from: from1, to: to1 } = line1;
    const { from: from2, to: to2 } = line2;

    const [xf1, yf1] = from1;
    const [xt1, yt1] = to1;
    const [xf2, yf2] = from2;
    const [xt2, yt2] = to2;

    const m1 = (yt1 - yf1) / (xt1 - xf1);
    const m2 = (yt2 - yf2) / (xt2 - xf2);

    if (m1 - m2 === 0) return false; // parallel lines don't intersect

    if (xf1 === xt1 || xf2 === xt2) {
        // handle a vertical line (only one is vertical)
        let x, yfv, ytv, xf, yf, xt, yt, m;

        if (xf1 === xt1) {
            // line 1 is vertical
            x = xf1;
            yfv = yf1;
            ytv = yt1;
            [xf, yf] = from2;
            [xt, yt] = to2;
            m = m2;
        }
        else {
            // line 2 is vertical
            x = xf2;
            yfv = yf2;
            ytv = yt2;
            [xf, yf] = from1;
            [xt, yt] = to1;
            m = m1;
        }

        const y = m * (x - xf) + yf;

        const minX = Math.min(xf, xt);
        const maxX = Math.max(xf, xt);
        const minYV = Math.min(yfv, ytv);
        const maxYV = Math.max(yfv, ytv);
        const minY = Math.min(yf, yt);
        const maxY = Math.max(yf, yt);

        // console.log("intersection at: (" +  x + ", " + y + ")");
        // console.log("maxY: " + Math.min(maxYV, maxY));
        // console.log("minY: " + Math.max(minYV, minY));

        return (
            x > minX && x < maxX &&
            y < Math.min(maxYV, maxY) &&
            y > Math.max(minYV, minY)
        );
    }
    else {
        // normal case (non-parallel, non-vertical lines)
        const x = (m1 * xf1 - yf1 - m2 * xf2 + yf2) / (m1 - m2);
        const y = yf1 + m1 * (x - xf1);

        const minX1 = Math.min(xf1, xt1);
        const maxX1 = Math.max(xf1, xt1);
        const minY1 = Math.min(yf1, yt1);
        const maxY1 = Math.max(yf1, yt1);

        const minX2 = Math.min(xf2, xt2);
        const maxX2 = Math.max(xf2, xt2);
        const minY2 = Math.min(yf2, yt2);
        const maxY2 = Math.max(yf2, yt2);

        return (
            x > Math.max(minX1, minX2) && 
            x < Math.min(maxX1, maxX2) &&
            y > Math.max(minY1, minY2) && 
            y < Math.min(maxY1, maxY2)
        );
    }
};

export const checkPointInsidePolygon = (vertices: [number, number][], point: [number, number], getDistance: boolean = false): boolean | number => {
    let count = 0;
    let minDist = Number.MAX_SAFE_INTEGER;

    for (let i = 0; i < vertices.length; i++) {
        let j = i + 1;

        if (j == vertices.length) {
            j = 0;
        }

        const line = {
            from: vertices[i],
            to: vertices[j]
        };

        const dist = checkRayIntersects(line, point);
        if (dist >= 0) {
            count++;
            minDist = Math.min(minDist, dist);
        }
    }

    if (count % 2 === 1) {
        return getDistance ? minDist : true;
    }
    else {
        return getDistance ? -1 : false;
    }
};

export const getTopLeftAndBottomRight = (vertices: [number, number][]): { topLeft: [number, number], bottomRight: [number, number] } => {
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

export interface shape {
    vertices: [number, number][],
    cyanCount: number,
    indigoCount: number
};