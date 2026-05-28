import { useEffect, useRef } from "react";

type GalaxyProps = {
  starSpeed?: number;
  density?: number;
  glowIntensity?: number;
};

const Galaxy = ({
  starSpeed = 1,
  density = 1,
  glowIntensity = 0.5,
}: GalaxyProps) => {

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {

    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    let animationFrameId: number;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = Array.from(
      { length: 300 * density },
      () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * canvas.width,
      })
    );

    const render = () => {

      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (const star of stars) {

        star.z -= starSpeed;

        if (star.z <= 0) {
          star.z = canvas.width;
        }

        const k = 128 / star.z;

        const px =
          (star.x - canvas.width / 2) * k +
          canvas.width / 2;

        const py =
          (star.y - canvas.height / 2) * k +
          canvas.height / 2;

        if (
          px >= 0 &&
          px <= canvas.width &&
          py >= 0 &&
          py <= canvas.height
        ) {

          const size =
            (1 - star.z / canvas.width) * 3;

          ctx.beginPath();

          ctx.fillStyle = `rgba(
            255,
            255,
            255,
            ${glowIntensity}
          )`;

          ctx.arc(px, py, size, 0, Math.PI * 2);

          ctx.fill();
        }
      }

      animationFrameId =
        requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };

  }, [starSpeed, density, glowIntensity]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
    />
  );
};

export default Galaxy;