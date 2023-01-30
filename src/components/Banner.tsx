import { FaChevronLeft } from "react-icons/fa";
import Link from "next/link";

const Banner = () => {
    return (
        <div className="fixed top-0 left-0 z-10 flex w-full bg-black/80">
            <Link href="/" className="absolute top-0 flex items-center justify-center h-12 left-4">
                <FaChevronLeft className="text-xl text-cyan-300 hover:text-cyan-400" />
            </Link>
            <div className="flex items-center justify-center w-full h-12 border-b-2 bg-cyan-300/10 border-cyan-300">
                <p className="text-lg font-semibold theme">Are You Faster than a Neural Network?</p>
            </div>
        </div>
    );
};

export default Banner;