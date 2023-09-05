import { useEffect, useState, useRef } from "react";
import keyboardjs from "keyboardjs";
import { useDebouncedCallback } from "use-debounce";
import data from "@/data";
import YouTube from "react-youtube";
import Image from "next/image";
import Head from "next/head";
import useInterval from "use-interval";

function Interval({ yt, setSeek }) {
  useInterval(() => {
    setSeek(yt.current?.getCurrentTime());
  }, 1000);

  return null;
}

export default function Home() {
  const [i, setI] = useState(0);
  // const [jump, setJump] = useState(false);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [isPlay, setIsPlay] = useState(false);
  const [seek, setSeek] = useState(0);
  const ref = useRef();
  const yt = useRef();

  function next() {
    if (i + 1 > data.length - 1) {
      setI(0);
      return;
    }

    setI(i + 1);
  }

  function prev() {
    if (i - 1 < 0) {
      setI(data.length - 1);
      return;
    }

    setI(i - 1);
  }

  function play() {
    setIsPlay(true);
  }

  function pause() {
    setIsPlay(false);
  }

  function blue() {}

  function red() {}

  function onReady({ target }) {
    target.playVideo();
    yt.current = target;
  }

  function onPause() {}

  function onPlay() {}

  function onError() {}

  useEffect(() => {
    setHeight(innerHeight);
    setWidth(innerWidth);
  }, []);

  // const debounce = useDebouncedCallback(() => {
  //   setJump(false);
  // }, 100);

  // useEffect(() => {
  //   keyboardjs.bind("space", () => {
  //     if (!level) {
  //       return;
  //     }

  //     setJump(true);
  //     debounce();
  //   });
  // }, [level, debounce]);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const c = ref.current.getContext("2d");
    c.fillStyle = "black";
    c.fillRect(0, 0, width, height);

    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
  }, [width, height]);

  return (
    <>
      <Head>
        <title>x</title>
      </Head>
      {isPlay && <Interval yt={yt} setSeek={setSeek} />}
      <div className="absolute bottom-0 flex flex-col justify-center w-full gap-8">
        <div className="mx-auto">
          {isPlay && (
            <YouTube
              videoId={data[i].yt}
              onReady={onReady}
              onPause={onPause}
              onPlay={onPlay}
              onError={onError}
              opts={{
                playerVars: {
                  disablekb: 1,
                  controls: 0,
                },
                width: "300",
                height: "176",
              }}
            />
          )}
          {!isPlay && (
            <Image
              src={`https://i.ytimg.com/vi/${data[i].yt}/hqdefault.jpg`}
              alt=""
              width={300}
              height={176}
              className="-mb-6"
            />
          )}
        </div>
        <div className="text-center w-full mt-8">
          <div className="text-2xl">{data[i].title}</div>
          <div className="text-gray-400">{data[i].author}</div>
        </div>
        <div className="px-8 relative max-w-sm mx-auto w-full">
          <div className="absolute p-3 -mt-2 -ml-2 rounded-full bg-white"></div>
          <div className="bg-gray-500 h-2 rounded-full w-full"></div>
        </div>
        <div className="flex justify-center mb-16 gap-8">
          {!isPlay && (
            <button className="rounded-full p-4" onClick={prev}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="white"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z"
                />
              </svg>
            </button>
          )}
          {isPlay && (
            <>
              <button className="rounded-full bg-sky-400 p-4" onClick={blue}>
                <div className="w-6 h-6"></div>
              </button>
              <button className="rounded-full p-4" onClick={pause}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="white"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 5.25v13.5m-7.5-13.5v13.5"
                  />
                </svg>
              </button>
              <button className="rounded-full bg-pink-400 p-4" onClick={red}>
                <div className="w-6 h-6"></div>
              </button>
            </>
          )}
          {!isPlay && (
            <>
              <button className="rounded-full bg-gray-300 p-4" onClick={play}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="black"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                  />
                </svg>
              </button>
              <button className="rounded-full p-4" onClick={next}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="white"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"
                  />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
      <canvas height={height} width={width} ref={ref}></canvas>
    </>
  );
}
