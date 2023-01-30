import { drawData, drawGrid } from "@/utils/data";
import { useEffect, useRef } from "react";

const DataCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        drawGrid(canvasRef.current, {
            lineWidth: 0.25,
            numLines: 25,
            lineColor: "gray"
        });
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