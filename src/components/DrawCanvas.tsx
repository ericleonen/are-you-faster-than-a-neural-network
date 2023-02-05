import React, { useEffect, useRef, useState } from "react";

const DrawCanvas = () => {
    const [draw, setDraw] = useState(false);
    const [prevLoc, setPrevLoc] = useState<[number, number] | null>(null);

    const [touchDraw, setTouchDraw] = useState(false);
    const [prevTouch, setPrevTouch] = useState<[number, number] | null>(null);

    const [origin, setOrigin] = useState<[number, number] | null>(null);

    const [drawnShapes, setDrawnShapes] = useState<[number, number][][]>([]);
    const [currentShape, setCurrentShape] = useState<[number, number][]>([]);

    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        clearCanvas();

        for (let shape of drawnShapes) {
            for (let i = 1; i < shape.length; i++) {
                drawLine(shape[i - 1], shape[i]);
            }
        }
    }, [drawnShapes]);

    useEffect(() => {
        if (origin === null) {
            const canvas = canvasRef.current;
            const canvasRect = canvas?.getBoundingClientRect();
            
            if (canvas && canvasRect)
                setOrigin([canvasRect.left, canvasRect.top]);
        }
    }, [origin, setOrigin]);

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');

        if (canvas && context) {
            context.clearRect(0, 0, canvas.width, canvas.height)
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

    const startDraw = () => setDraw(true);
    const onDraw = ({ clientX, clientY }: React.MouseEvent<HTMLCanvasElement>) => {
        if (draw && origin) {
            const loc: [number, number] = [clientX - origin[0], clientY - origin[1]];

            drawLine(prevLoc, loc);
            setCurrentShape(currentShape => {
                currentShape.push(loc);
                return currentShape;
            });
            setPrevLoc(loc)
        }
    };
    const endDraw = () => {
        if (draw) {
            setDraw(false);
            setPrevLoc(null);

            saveCurrentShape();
        }
    }

    const startTouchDraw = () => {
        setTouchDraw(true);
    };
    const onTouchDraw = ({ touches }: React.TouchEvent<HTMLCanvasElement>) => {
        if (touchDraw && origin) {
            const { clientX, clientY } = touches[0];
            const touchLoc: [number, number] = [clientX - origin[0], clientY - origin[1]]
            
            drawLine(prevTouch, touchLoc);
            setCurrentShape(currentShape => {
                currentShape.push(touchLoc);
                return currentShape;
            });
            setPrevTouch(touchLoc);
        }
    };
    const endTouchDraw = () => {
        if (touchDraw) {
            setTouchDraw(false);
            setPrevTouch(null);

            saveCurrentShape();
        }
    };

    const saveCurrentShape = () => {
        if (currentShape.length > 0) {
            const simpleShape = currentShape.filter((_, i) => i % 10 === 0);

            // needs to be closed
            // need to remove any extra "tails"

            setDrawnShapes(
                drawnShapes => 
                [
                    simpleShape, 
                    ...drawnShapes
                ]
            );

            setCurrentShape([]);
        }
    };

    return (
        <div className="absolute">
            <canvas 
                ref={canvasRef}
                height="500"
                width="500"
                className="touch-none"

                onMouseDown={startDraw}
                onMouseUp={endDraw}
                onMouseMove={onDraw}
                onMouseLeave={endDraw}

                onTouchStart={startTouchDraw}
                onTouchEnd={endTouchDraw}
                onTouchMove={onTouchDraw}
            />
        </div>
    );
};

export default DrawCanvas;