"use client";

import { ImageField } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";
import { useEffect, useRef } from "react";

type Props = {
  backgroundImage: ImageField;
  foregroundImage: ImageField;
  className?: string;
};

export function ParallaxImage({
  backgroundImage,
  foregroundImage,
  className,
}: Props) {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const foregroundRef = useRef<HTMLDivElement>(null);

  const targetPosition = useRef({ x: 0, y: 0 });
  const currentPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const frameId = requestAnimationFrame(animationFrame);
    window.addEventListener("mousemove", onMouseMove);

    function onMouseMove(event: MouseEvent) {
      const { innerWidth, innerHeight } = window;

      // Calculate x position as percentage from -1 to 1
      // First normalize clientX to 0-1 range by dividing by window width
      // Then shift to -0.5 to 0.5 range by subtracting 0.5
      // Finally multiply by 2 to get -1 to 1 range
      const xPercent = (event.clientX / innerWidth - 0.5) * 2;
      const yPercent = (event.clientY / innerHeight - 0.5) * 2;

      // Update target position based on mouse coordinates
      // Multiply by 20 to amplify the parallax effect
      // x and y will range from -20 to +20 pixels
      // This creates a subtle floating movement effect
      // as the mouse moves across the screen
      targetPosition.current = {
        x: xPercent * -20,
        y: yPercent * -20,
      };
    }

    function animationFrame() {
      const { x: targetX, y: targetY } = targetPosition.current;
      const { x: currentX, y: currentY } = currentPosition.current;

      // Calculate new X position by interpolating between current and target positions
      // Uses linear interpolation with a factor of 0.1 to create smooth movement
      // This means the position moves 10% of the remaining distance each frame
      const newX = currentX + (targetX - currentX) * 0.1;
      const newY = currentY + (targetY - currentY) * 0.1;

      currentPosition.current = { x: newX, y: newY };

      if (backgroundRef.current) {
        backgroundRef.current.style.transform = `translate(${newX}px, ${newY}px)`;
      }
      if (foregroundRef.current) {
        foregroundRef.current.style.transform = `translate(${newX * 2.5}px, ${newY * 2.5}px)`;
      }

      requestAnimationFrame(animationFrame);
    }

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className={clsx("grid grid-cols-1 place-items-center", className)}>
      <div
        ref={backgroundRef}
        className="col-start-1 row-start-1 transition-transform"
      >
        <PrismicNextImage field={backgroundImage} alt="" className="w-11/12" />
      </div>
      <div
        ref={foregroundRef}
        className="col-start-1 row-start-1 h-full w-full place-items-center transition-transform"
      >
        <PrismicNextImage
          field={foregroundImage}
          alt=""
          imgixParams={{ height: 600 }}
          className="h-full max-h-[500px] w-auto"
        />
      </div>
    </div>
  );
}
