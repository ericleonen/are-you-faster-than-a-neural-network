import DataCanvas from "@/components/DataCanvas";
import DrawCanvas from "@/components/DrawCanvas";
import { dataPoint } from "@/utils/data";
import { generateDataShape } from "@/utils/dataGen";
import { useEffect, useState } from "react";
import { checkPointInsidePolygon, shape } from "@/utils/polygons";

const PlayerCanvas = () => {
    const [dataPoints, setDataPoints] = useState<dataPoint[]>([]);
    const [shapes, setShapes] = useState<shape[]>([]);

    const [correct, setCorrect] = useState(0);

    useEffect(() => {
        const dataShape1 = generateDataShape(
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
        );

        const dataShape2 = generateDataShape(
            [
                [0, 500],
                [500, 500],
                [500, 400]
            ],
            {
                numPoints: 5,
                maxDist: 20,
                color: "indigo"
            }
        );

        setDataPoints(dataShape1.concat(dataShape2));
    }, []);

    const categorizePoints = () => {
        const dataPoints_ = dataPoints;
        const shapes_ = shapes;

        for (let dataPointIndex = 0; dataPointIndex < dataPoints.length; dataPointIndex++) {
            const dataPoint = dataPoints[dataPointIndex];

            let minDist = Number.MAX_SAFE_INTEGER;
            let minShapeIndex = -1;

            for (let shapeIndex = 0; shapeIndex < shapes.length; shapeIndex++) {
                const shape = shapes[shapeIndex];

                const dist = checkPointInsidePolygon(shape.vertices, dataPoint.coord, true);
                if (dist >= 0 && typeof dist === 'number') {
                    if (dist < minDist) {
                        minDist = dist;
                        minShapeIndex = shapeIndex;
                    }
                };
            }

            if (minShapeIndex >= 0 && dataPoint.shapeIndex !== minShapeIndex) {
                const oldShapeIndex = dataPoint.shapeIndex;

                if (dataPoint.color === 'cyan') {
                    shapes_[minShapeIndex].cyanCount++;

                    if (oldShapeIndex >= 0) shapes_[oldShapeIndex].cyanCount--;
                }
                else {
                    shapes_[minShapeIndex].indigoCount++;
                    if (oldShapeIndex >= 0) shapes_[oldShapeIndex].indigoCount--;
                }

                dataPoints_[dataPointIndex].shapeIndex = minShapeIndex;
                dataPoints_[dataPointIndex].distance = minDist;
            }
        }

        let correctlyClassified = 0;

        for (let { shapeIndex, color } of dataPoints_) {
            if (shapeIndex >= 0) {
                const { cyanCount, indigoCount } = shapes_[shapeIndex];
                
                if (cyanCount > indigoCount && color === "cyan") correctlyClassified++;
                else if (indigoCount > cyanCount && color === "indigo") correctlyClassified++;
            }
        };

        setDataPoints(dataPoints_);
        setShapes(shapes_);
        setCorrect(correctlyClassified);
    };

    return (
        <>
            <div className="relative">
                <DrawCanvas setShapes={setShapes} shapes={shapes} categorizePoints={categorizePoints}/>
                <DataCanvas dataPoints={dataPoints}/>
            </div>
            <div className="flex">
                <p className="font-semibold text-white">Accuracy: {Math.round(correct / dataPoints.length * 100 * 100) / 100}%</p>
            </div>
        </>
    );
};

export default PlayerCanvas;