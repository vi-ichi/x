import { useEffect, useState } from "react";
import keyboardjs from "keyboardjs";
import { useDebouncedCallback } from "use-debounce";

export default function Home() {
  const [level, setLevel] = useState(false);
  const [jump, setJump] = useState(false);

  const debounce = useDebouncedCallback(() => {
    setJump(false);
  }, 100);

  function openLevel() {
    setLevel(true);
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
    <div className="grid grid-cols-3 gap-4 mx-auto max-w-5xl pt-8">
      {!level &&
        [...Array(9)].map(() => (
          <div
            onClick={openLevel}
            className="bg-gray-500 rounded-lg px-4 pt-2 pb-32 text-2xl hover:bg-gray-400 transition"
          >
            Level Name
          </div>
        ))}
      {level && (
        <div className="relative">
          <div
            className={`absolute bg-gray-500 ${
              jump ? "mt-[200px]" : "mt-[400px]"
            } w-32 h-[200px]`}
          >
            &nbsp;
          </div>
          <div className="absolute bg-gray-500 rounded-full w-[100px] h-[100px] mt-[200px]">&nbsp;</div>
        </div>
      )}
    </div>
  );
}
