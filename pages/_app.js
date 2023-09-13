import "@/styles/globals.css";
import { useEffect, useState } from "react";
import AnimatedCursor from "react-animated-cursor";
import { Rubik_Pixels } from "next/font/google";

const rubik_pixels = Rubik_Pixels({
  subsets: ["latin"],
  variable: "--font-rubik-pixels",
  weight: ["400"],
});

export default function App({ Component, pageProps }) {
  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  return (
    <>
      {client && (
        <AnimatedCursor
          innerSize={8}
          outerSize={35}
          innerScale={1}
          outerScale={2}
          outerAlpha={0}
          hasBlendMode={true}
          innerStyle={{
            backgroundColor: "white",
          }}
          outerStyle={{
            border: "3px solid white",
          }}
        />
      )}
      <main className={`${rubik_pixels.variable} font-sans`}>
        <Component {...pageProps} />
      </main>
    </>
  );
}
