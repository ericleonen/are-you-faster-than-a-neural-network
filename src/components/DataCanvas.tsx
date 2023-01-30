import { drawData, drawGrid } from "@/utils/data";
import { generateDataCenter } from "@/utils/dataGen";
import { useEffect, useRef } from "react";

const DataCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        drawGrid(canvasRef.current, {
            lineWidth: 0.25,
            numLines: 25,
            lineColor: "gray"
        });

        const cyanData = generateDataCenter([200, 250], {
            maxDist: 100,
            minDist: 50,
            numPoints: 100
        });

        drawData(canvasRef.current, {
            data: cyanData,
            radius: 5,
            color: "cyan"
        })
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