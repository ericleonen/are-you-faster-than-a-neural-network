interface gridOptions {
    lineWidth: number,
    numLines: number,
    lineColor: string
};

export const drawGrid = (canvas: HTMLCanvasElement | null, gridOptions: gridOptions) => {
    const context = canvas?.getContext("2d");
    const { lineWidth, numLines, lineColor } = gridOptions;
    
    if (canvas && context) {
        canvas.width = canvas.width;
        const dX = canvas.width / numLines;

        for (let x = dX; x < canvas.width - 1; x += dX) {
            context.moveTo(lineWidth + x, 0);
            context.lineTo(lineWidth + x, canvas.height);
        }

        const dY = canvas.height / numLines;

        for (let y = dY; y < canvas.height - 1; y += dY) {
            context.moveTo(0, lineWidth + y);
            context.lineTo(canvas.width, lineWidth + y);
        }

        context.lineWidth = lineWidth;
        context.strokeStyle = lineColor;
        context.stroke();
    }
    else {
        console.log("Draw grid failed: Canvas is invalid");
    }
};

interface dataOptions {
    data: number[][],
    radius: number,
    color: "cyan" | "indigo"
};

export const drawData = (canvas: HTMLCanvasElement | null, dataOptions: dataOptions) => {
    const context = canvas?.getContext("2d");

    if (canvas && context) {
        const { data, radius, color } = dataOptions;

        for (let point of data) {
            const [x, y] = point;

            context.beginPath();
            context.arc(x, y, 5, 0, Math.PI * 2);
            context.fillStyle = 
                (color == "cyan") ? 
                    "rgba(0, 255, 255, 0.5)" : 
                    "rgba(255, 0, 255, 0.5)";
                    ;
            context.fill();
        }
    }
    else {
        console.log("Draw data failed: Canvas is invalid")
    }
};