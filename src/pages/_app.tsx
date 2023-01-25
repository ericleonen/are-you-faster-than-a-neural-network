import '@/styles/globals.css'
import type { AppProps } from 'next/app';
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-black/90">
      <Head>
        <title>Are You Faster than a Neural Network?</title>
      </Head>
      <Component {...pageProps} />
    </div>
  );
}
