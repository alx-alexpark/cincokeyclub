import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ["latin"] });

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider>
        <main className={inter.className}>
          <Component {...pageProps} />
          <Analytics />
        </main>
      </ChakraProvider>
    </SessionProvider>
  );
}
