import '@/styles/globals.css'
import type { AppProps } from 'next/app';
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Are You Faster than a Neural Network?</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
