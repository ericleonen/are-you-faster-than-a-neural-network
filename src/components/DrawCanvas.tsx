import React, { useEffect, useRef, useState } from "react";
import { getDistanceBetweenPoints, shape, checkPointInsidePolygon, line, checkLinesIntersect } from "@/utils/polygons";

interface DrawCanvasProps {
    shapes: shape[],
    setShapes: any
};

const DrawCanvas = ({ shapes, setShapes }: DrawCanvasProps) => {
    // implement point and click polygon generator

    const [origin, setOrigin] = useState<[number, number] | null>(null);
    
    const [currentShape, setCurrentShape] = useState<[number, number][]>([]);
    const [currentPoint, setCurrentPoint] = useState<[number, number] | null>(null);

    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (origin === null) {
            const canvas = canvasRef.current;
            const canvasRect = canvas?.getBoundingClientRect();
            
            if (canvas && canvasRect)
                setOrigin([canvasRect.left, canvasRect.top]);
        }
    }, [origin, setOrigin]);

    useEffect(() => {
        clearCanvas();

        // draw shapes
        shapes.forEach(({ vertices }) => {
            for (let p = 0; p < vertices.length; p++) {
                if (p === 0) drawLine(vertices[vertices.length - 1], vertices[0]);
                else drawLine(vertices[p - 1], vertices[p]);
            }
        });

        // draw current shape
        if (currentShape.length > 0) {
            for (let p = 1; p < currentShape.length; p++) {
                drawLine(currentShape[p - 1], currentShape[p]);
            }
        }

        // draw current line
        if (currentPoint) {
            drawLine(currentShape[currentShape.length - 1], currentPoint);
        }
    }, [shapes, currentShape, currentPoint]);

    const trackMouse = ({ clientX, clientY } : React.MouseEvent<HTMLCanvasElement>) => {
        if (origin) {
            const currentPos: [number, number] = [clientX - origin[0], clientY - origin[1]];

            if (currentPoint && currentShape.length > 2 && getDistanceBetweenPoints(currentPos, currentShape[0]) < 10)
                setCurrentPoint(currentShape[0]);
            else setCurrentPoint(currentPos);
        }
    };

    const checkAnyIntersections = (): boolean => {
        if (currentPoint && currentShape.length) {
            // check if there are any line intersections
            const line2: line = {
                from: currentShape[currentShape.length - 1],
                to: currentPoint
            };

            for (const { vertices } of shapes) {
                for (let p = 0; p < vertices.length; p++) {
                    const line1: line = {
                        from: vertices[p],
                        to: vertices[p + 1 == vertices.length ? 0 : p + 1]
                    };

                    if (checkLinesIntersect(line1, line2)) return true;
                }
            }

            for (let p = 1; p < currentShape.length; p++) {
                const line1: line = {
                    from: currentShape[p - 1],
                    to: currentShape[p]
                };

                if (checkLinesIntersect(line1, line2)) return true;
            }
        }

        return false;
    };

    const setPoint = () => {
        if (currentPoint) {
            if (checkAnyIntersections()) return;

            if (currentShape.length > 2 && getDistanceBetweenPoints(currentPoint, currentShape[0]) === 0) {
                setCurrentPoint(null);

                // save shape
                const newShape: shape = {
                    vertices: currentShape,
                    indigoCount: 0,
                    cyanCount: 0
                };

                setShapes((shapes: shape[]) => [
                    newShape,
                    ...shapes
                ]);
                setCurrentShape([]);
            }
            else {
                setCurrentShape(currentShape => {
                    return [...currentShape, currentPoint]
                });
            }
        }
    };

    const drawLine = (prev: [number, number] | null, curr: [number, number]) => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");

        if (canvas && context && prev) {
            context.beginPath();
            context.moveTo(prev[0], prev[1]);
            context.lineTo(curr[0], curr[1]);
            context.lineWidth = 5;
            context.lineCap = "round";
            context.strokeStyle = "white";
            context.stroke();
            context.closePath();
        } 
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");

        if (canvas && context)
            context.clearRect(0, 0, canvas.width, canvas.height);
    };

    return (
        <div className="absolute">
            <canvas 
                ref={canvasRef}
                height="500"
                width="500"
                className="touch-none"

                onMouseMove={trackMouse}
                onClick={setPoint}
            />
        </div>
    );
};

export default DrawCanvas;