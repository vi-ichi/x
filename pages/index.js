import { useEffect, useState } from "react";
import keyboardjs from "keyboardjs";
import { useDebouncedCallback } from "use-debounce";
import useInterval from "use-interval";
import data from "@/data";
import Canvas from "@/components/Canvas";

function Move({ setOffset }) {
  useInterval(() => {
    setOffset((x) => x - 4);
  }, 16);

  return null;
}

export default function Home() {
  const [level, setLevel] = useState(false);
  const [title, setTitle] = useState("");
  const [jump, setJump] = useState(false);
  const [offset, setOffset] = useState(1000);
  const [changeableData, setChangeableData] = useState(data);

  const debounce = useDebouncedCallback(() => {
    setJump(false);
  }, 100);

  function openLevel(title) {
    setLevel(true);
    setTitle(title);
  }

  useEffect(() => {
    keyboardjs.bind("space", () => {
      if (!level) {
        return;
      }

      setJump(true);
      debounce();
    });
  }, [level, debounce]);

  return (
    <div className="grid gap-4 mx-auto max-w-5xl py-8">
      {!level &&
        changeableData.map((x, i) => (
          <div
            key={i}
            onClick={() => openLevel(x.title)}
            className="relative bg-gray-500 rounded-lg hover:bg-gray-400 transition"
          >
            <div className="px-4 pt-2 text-2xl">{x.title}</div>
            <div className="px-4 pb-2">{x.author}</div>
            <Canvas />
          </div>
        ))}
      {level && (
        <div className="relative">
          <Move setOffset={setOffset} />
          <div
            className={`absolute bg-gray-500 ${
              jump ? "mt-[200px]" : "mt-[400px]"
            } w-32 h-[200px]`}
          >
            <Canvas />
          </div>
          {changeableData
            .find((x) => x.title === title)
            .points.map((x, i) => (
              <div
                key={i}
                style={{ left: `${x[0] + offset}px` }}
                className={`absolute bg-gray-500 rounded-full w-[100px] h-[100px] ${
                  x[1] === 1 ? "mt-[200px]" : "mt-[400px]"
                }`}
              >
                &nbsp;
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
