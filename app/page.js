"use client";

import { useEffect, useState, useRef } from "react";
import data from "@/data";
import YouTube from "react-youtube";
import useInterval from "use-interval";
import { Joystick } from "react-joystick-component";

function ProgressInterval({ yt, setProgress }) {
  useInterval(() => {
    setProgress(
      (100 * yt.current?.getCurrentTime()) / yt.current?.getDuration()
    );
  }, 100);

  return null;
}

export default function Home() {
  const [i, setI] = useState(0);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [isPlay, setIsPlay] = useState(false);
  const [afterLoad, setAfterLoad] = useState(true);
  const [progress, setProgress] = useState(0);
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

  function stop() {
    setIsPlay(false);
    yt.current.stopVideo();
  }

  function onReady({ target }) {
    target.playVideo();
    yt.current = target;
  }

  function onPause() {}

  function onPlay() {}

  function onError() {}

  function onPlayButtonClick() {
    setAfterLoad(false);
  }

  useEffect(() => {
    setHeight(innerHeight);
    setWidth(innerWidth);
  }, []);

  useEffect(() => {
    if (!ref.current || !width || !height) {
      return;
    }

    const c = ref.current.getContext("2d");
    c.fillStyle = "black";
    c.fillRect(0, 0, width, height);

    if (afterLoad) {
      return;
    }

    const img = new window.Image();
    img.onload = () => {
      // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
      c.drawImage(img, width / 2 - 50, height / 2 - 50, 100, 100);
    };
    img.src = "/shark.png";
  }, [width, height, afterLoad]);

  return (
    <>
      {afterLoad ? (
        <div
          className="relative h-screen cursor-pointer"
          onClick={onPlayButtonClick}
        >
          <div className="max-w-xs mx-auto h-screen justify-center gap-4 w-full flex-col flex items-center">
            <div className="flex">
              <div className="bg-sky-400 text-black inline-block px-3">the</div>
              <div className="text-white px-3 animate-ping -mt-[2px]">x</div>
              <div className="bg-pink-400 text-black inline-block px-3">
                game
              </div>
            </div>
            <div>click anywhere to play</div>
          </div>
        </div>
      ) : (
        <div className="snap-y snap-mandatory h-screen overflow-y-scroll">
          <ProgressInterval yt={yt} setProgress={setProgress} />
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
                autoplay: 1,
              },
              width: "0",
              height: "0",
            }}
          />
          {data.map((d, i) => (
            <div
              className="relative h-screen snap-always snap-start"
              key={i}
              onClick={play}
            >
              {!isPlay && (
                <div className="text-center pt-16 space-y-1">
                  <div className="bg-white inline-block text-black px-3 bg-sky-300">
                    click anywhere to play
                  </div>
                  <div>or</div>
                  <div className="bg-white inline-block text-black px-3 bg-sky-300">
                    swipe down
                  </div>
                </div>
              )}
              {isPlay && (
                <>
                  <div
                    className="absolute flex justify-center h-[175px] items-center w-full z-10"
                    onClick={stop}
                  >
                    click here to stop
                  </div>
                  <div className="flex justify-center absolute z-30 w-full bottom-[100px]">
                    <Joystick baseColor="white" stickColor="black" size={70} />
                  </div>
                </>
              )}
              {isPlay && (
                <div className="absolute h-screen flex items-center justify-center w-full">
                  <div className="border border-dashed w-full max-w-xs h-[calc(100vh-350px)] divide-x divide-dashed flex">
                    <div className="w-1/2 text-right pr-2 text-sky-400">
                      xxxxxxxxxxxxxxxxxx
                    </div>
                    <div>
                      <div className="pl-2 text-pink-400">
                        xxxxxxxxxxxxxxxxxx
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="absolute bottom-0 flex flex-col justify-center w-full gap-8">
                <div className="text-left w-full mt-8 max-w-xs mx-auto">
                  <div className="text-center text-lime-400">{d.author}</div>
                </div>
                <div className="relative max-w-xs mx-auto w-full">
                  <div className="text-2xl text-black bg-pink-400 -mt-4 z-20 left-1/2 -translate-x-1/2 inline-block px-3 absolute">
                    {d.title}
                  </div>
                  <div
                    className="absolute bg-gray-300 h-1 z-10"
                    style={{ width: progress + "%" }}
                  ></div>
                  <div className="absolute bg-gray-700 h-1 w-full"></div>
                </div>
                <div className="mb-16 gap-8 max-w-xs mx-auto w-full">
                  <div className="absolute max-w-xs w-full flex justify-between">
                    <div className="text-sky-400">click sky</div>
                    <div>or</div>
                    <div className="text-pink-400">click pink</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <canvas
        className="fixed -z-10 inset-0"
        height={height}
        width={width}
        ref={ref}
      ></canvas>
    </>
  );
}
