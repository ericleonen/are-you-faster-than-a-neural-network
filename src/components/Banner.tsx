const Banner = () => {
    return (
        <div className="fixed top-0 left-0 z-10 w-full bg-black/80">
            <div className="flex items-center justify-center w-full h-12 border-b-2 bg-cyan-300/10 border-cyan-300">
                <p className="text-lg font-semibold theme">Are You Faster than a Neural Network?</p>
            </div>
        </div>
    );
};

export default Banner;