import React, { useEffect, useRef, useState } from "react";

const DrawCanvas = () => {
    const [draw, setDraw] = useState(false);
    const [prevLoc, setPrevLoc] = useState<[number, number] | null>(null);

    const [touchDraw, setTouchDraw] = useState(false);
    const [prevTouch, setPrevTouch] = useState<[number, number] | null>(null);

    const [origin, setOrigin] = useState<[number, number] | null>(null);

    const [drawnShapes, setDrawnShapes] = useState<number[][][]>([]);
    const [currentShape, setCurrentShape] = useState<number[][]>([]);

    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (origin === null) {
            const canvas = canvasRef.current;
            const canvasRect = canvas?.getBoundingClientRect();
            
            if (canvas && canvasRect)
                setOrigin([canvasRect.left, canvasRect.top]);
        }
    }, [origin, setOrigin]);

    const drawLine = (prev: [number, number] | null, curr: [number, number]) => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");

        if (canvas && context && prev) {
            context.moveTo(prev[0], prev[1]);
            context.lineTo(curr[0], curr[1]);
            context.lineWidth = 5;
            context.lineCap = "round";
            context.strokeStyle = "white";
            context.stroke();
            context.closePath();

            setCurrentShape(currentShape => {
                currentShape.push(curr);
                return currentShape;
            });
        } 
    };

    const startDraw = () => setDraw(true);
    const onDraw = ({ clientX, clientY }: React.MouseEvent<HTMLCanvasElement>) => {
        if (draw && origin) {
            const loc: [number, number] = [clientX - origin[0], clientY - origin[1]];

            drawLine(prevLoc, loc);
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
            setDrawnShapes(
                drawnShapes => 
                [
                    currentShape.filter((_, i) => i % 10 === 0), 
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