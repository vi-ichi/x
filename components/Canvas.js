import { useEffect, useRef } from "react";

export default function Canvas() {
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const c = ref.current.getContext("2d");
    c.fillStyle = "black";
    c.fillRect(0, 0, 1000, 1000);

    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
  }, []);

  return <canvas height={200} width={200} className="ml-auto pb-2 pr-2" ref={ref}></canvas>;
}
