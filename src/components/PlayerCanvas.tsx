import DataCanvas from "@/components/DataCanvas";
import DrawCanvas from "@/components/DrawCanvas";

const PlayerCanvas = () => {
    return (
        <div className="relative">
            <DrawCanvas />
            <DataCanvas />
        </div>
    );
};

export default PlayerCanvas;