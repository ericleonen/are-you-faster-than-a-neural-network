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

    useEffect(() => {
        const cyanData = [[50, 50], [53, 55]];

        drawData(canvasRef.current, {
            data: cyanData,
            radius: 5,
            color: "indigo"
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