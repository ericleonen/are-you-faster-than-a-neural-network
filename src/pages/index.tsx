import Link from "next/link";

const App = () => {
  return (
    <>
      <h1 className="text-5xl font-bold text-center theme">Are You Faster than a Neural Network?</h1>
      <Link 
        href="./levels "
        className="px-10 py-1 mt-6 text-xl text-cyan-300 transition-colors border-[3px] border-cyan-300 hover:bg-cyan-300/30"
      >
        Let's find out!
      </Link>
      <button className="mt-4 text-indigo-300 underline transition-colors hover:text-indigo-400 text-md">
        How to play?
      </button>
      <p className="absolute text-white bottom-4">made by <a className="text-cyan-300 hover:text-cyan-400" href="https://github.com/ericleonen">ericleonen</a></p>
    </>
  );
};

export default App;