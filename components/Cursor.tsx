"use client";

import { useEffect } from "react";

export default function Cursor() {
  useEffect(() => {
    const cursor = document.getElementById("cursor")!;
    const ring = document.getElementById("cursor-ring")!;
    let mx = 0, my = 0, rx = 0, ry = 0;
    let frameId = 0;

    let isHovering = false;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      ring.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
    };
    document.addEventListener("mousemove", onMove);

    const animRing = () => {
      rx += (mx - rx) * 0.35;
      ry += (my - ry) * 0.35;
      cursor.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) ${isHovering ? 'scale(2.5)' : 'scale(1)'}`;
      frameId = requestAnimationFrame(animRing);
    };
    animRing();

    const els = document.querySelectorAll("button, a");
    els.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        isHovering = true;
        cursor.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(2.5)`;
        ring.style.opacity = "0";
      });
      el.addEventListener("mouseleave", () => {
        isHovering = false;
        cursor.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(1)`;
        ring.style.opacity = "0.5";
      });
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frameId);
    };
  }, []);
  return (
    <>
      <div id="cursor" />
      <div id="cursor-ring" />
    </>
  );
}
