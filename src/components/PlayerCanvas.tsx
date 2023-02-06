import DataCanvas from "@/components/DataCanvas";
import DrawCanvas from "@/components/DrawCanvas";
import { dataPoint } from "@/utils/data";
import { generateDataShape } from "@/utils/dataGen";
import { useEffect, useState } from "react";

const PlayerCanvas = () => {
    const [dataPoints, setDataPoints] = useState<dataPoint[]>([]);

    useEffect(() => {
        setDataPoints(
            generateDataShape(
                [
                    [0, 0],
                    [300, 300],
                    [500, 0]
                ],
                {
                    numPoints: 5,
                    maxDist: 20,
                    color: "cyan"
                }
            )
        );
    }, []);

    return (
        <div className="relative">
            <DrawCanvas />
            <DataCanvas dataPoints={dataPoints}/>
        </div>
    );
};

export default PlayerCanvas;