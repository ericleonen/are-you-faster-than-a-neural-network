import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { FaPlay } from "react-icons/fa";

interface Props {
    levelNumber: number
};

const LevelPreview = ({ levelNumber }: Props) => {
    const [hover, setHover] = useState(false);

    return (
        <Link 
            href={`/levels/${levelNumber}`}
            onMouseOver={() => setHover(true)}
            onMouseOut={() => setHover(false)}
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
                {
                    hover ?
                    (
                        <>
                            <span className="text-xl">Level title</span>
                            <FaPlay className="mt-2"/>
                        </>
                    )
                    :
                    <span>{ levelNumber }</span>
                }
            </div>
        </Link>
    );
};

export default LevelPreview;