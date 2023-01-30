import DataCanvas from "@/components/DataCanvas";

const Level = () => {
    return (
        <div className="flex justify-around w-full p-12">
            <div className="flex flex-col items-center w-2/5">
                <p className="mb-10 text-5xl font-semibold theme">You</p>
                <DataCanvas />
            </div>
            
        </div>
    );
};

export default Level;