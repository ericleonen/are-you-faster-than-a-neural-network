import { drawData, drawGrid, dataPoint } from "@/utils/data";
import { useEffect, useRef } from "react";

interface DataCanvasProps {
    dataPoints: dataPoint[]
};

const DataCanvas = ({ dataPoints }: DataCanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const clearCanvas = () => {
        const canvas = canvasRef?.current;
        const context = canvas?.getContext("2d");

        if (canvas && context) {
            context.clearRect(0, 0, canvas.width, canvas.height);
        }
    };

    useEffect(() => {
        clearCanvas();

        drawGrid(canvasRef.current, {
            lineWidth: 0.25,
            numLines: 25,
            lineColor: "gray"
        });
        drawData(canvasRef.current, {
            dataPoints,
            radius: 5,
        })
    }, [dataPoints]);

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