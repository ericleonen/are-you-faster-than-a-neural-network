import { useEffect, useRef } from "react";

const DataCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");

        const lineWidth = 0.25;
        const numLines = 25;

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
            context.strokeStyle = "gray";
            context.stroke();
        }
    }, []);

    useEffect(() => {
        const cyanData = [[50, 50], [53, 55]];

        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");

        if (canvas && context) {
            for (let cyanPoint of cyanData) {
                const [x, y] = cyanPoint;
                
                context.beginPath();
                context.arc(x, y, 5, 0, Math.PI * 2);
                context.fillStyle = "rgba(0, 255, 255, 0.5)";
                context.fill();
            }
        }
    }, []);

    return (
        <div>
            <canvas
                ref={canvasRef}
                height="500"
                width="500"
            />
        </div>
    );
};

export default DataCanvas;