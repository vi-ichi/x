import { useEffect, useState, useRef } from "react";
import keyboardjs from "keyboardjs";
import { useDebouncedCallback } from "use-debounce";
import data from "@/data";

export default function Home() {
  const [level, setLevel] = useState(data[0]);
  const [title, setTitle] = useState("Instant Crush");
  const [jump, setJump] = useState(false);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const ref = useRef();

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
      <div className="absolute text-center w-full mt-8">
        <div className="text-2xl">{level.title}</div>
        <div>{level.author}</div>
      </div>
      <div className="absolute text-center w-full bottom-0 mb-8">press SPACE to play</div>
      <canvas height={height} width={width} ref={ref}></canvas>
    </>
  );
}
