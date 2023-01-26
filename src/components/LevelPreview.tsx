import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { FaPlay } from "react-icons/fa";
import { ifStyle } from "@/utils/styling";

interface Props {
    levelNumber: number
};

const LevelPreview = ({ levelNumber }: Props) => {
    const [hover, setHover] = useState(false);

    return (
        <Link 
            href={`/levels/${levelNumber}`}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className="group transition-colors hover:border-cyan-300 relative h-[10rem] w-[10rem] mb-6 mr-6 bg-white border-2"
        >
            <Image 
                className="absolute top-0 left-0 w-full h-full"
                src="/images/levelTemp.png" 
                alt="temp"
                height="100"
                width="100"
            />
            <div className="flex flex-col items-center justify-center w-full h-full text-4xl font-semibold text-white transition-colors group-hover:bg-cyan-300/20 backdrop-blur-sm">
                <span className={
                        ifStyle(
                            "text-xl opacity-0 transition-opacity",
                            [hover, "opacity-100"]
                        )
                    }
                >
                    Level title
                </span>
                <FaPlay className={
                    ifStyle(
                        "mt-2 opacity-0 transition-opacity",
                        [hover, "opacity-100"]
                    )
                }/>

                <span className={
                    ifStyle(
                        "transition-opacity absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]",
                        [hover, "opacity-0"]
                    )
                }>{ levelNumber }</span>
                </div>
        </Link>
    );
};

export default LevelPreview;