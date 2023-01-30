import Banner from "@/components/Banner";
import LevelPreview from "@/components/LevelPreview";

const Levels = () => {
    return (
        <div className="flex flex-col h-full p-12 overflow-y-scroll">
            <Banner />
            <h1 className="mt-12 mb-8 text-4xl font-semibold theme">Levels</h1>
            <div className="flex flex-wrap max-w-[80vw]">
                <LevelPreview levelNumber={1} />
                <LevelPreview levelNumber={2} />
                <LevelPreview levelNumber={3} />
                <LevelPreview levelNumber={4} />
                <LevelPreview levelNumber={5} />
                <LevelPreview levelNumber={6} />
                <LevelPreview levelNumber={7} />
                <LevelPreview levelNumber={8} />
                <LevelPreview levelNumber={9} />
                <LevelPreview levelNumber={10} />
                <LevelPreview levelNumber={11} />
                <LevelPreview levelNumber={12} />
                <LevelPreview levelNumber={13} />
                <LevelPreview levelNumber={14} />
                <LevelPreview levelNumber={15} />
                <LevelPreview levelNumber={16} />
                <LevelPreview levelNumber={17} />
                <LevelPreview levelNumber={18} />
            </div>
        </div>
    );
};

export default Levels;