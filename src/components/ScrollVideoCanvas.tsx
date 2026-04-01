"use client";

import { useEffect, useRef } from "react";

interface ScrollVideoCanvasProps {
  videoSrc: string | string[]; // Support single string or array for multiple formats
  fallbackImageSrc?: string;
}

export default function ScrollVideoCanvas({ videoSrc, fallbackImageSrc }: ScrollVideoCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const video = document.createElement("video");
    video.muted = true;
    video.playsInline = true;
    video.crossOrigin = "anonymous";
    video.preload = "auto";
    video.setAttribute('webkit-playsinline', 'webkit-playsinline');

    // Handle multiple sources if provided
    if (Array.isArray(videoSrc)) {
      videoSrc.forEach(src => {
        const source = document.createElement("source");
        source.src = src;
        // Basic type detection from extension
        if (src.endsWith(".webm")) source.type = "video/webm";
        else if (src.endsWith(".mp4")) source.type = "video/mp4";
        video.appendChild(source);
      });
    } else {
      video.src = videoSrc;
    }

    let animationFrameId: number;
    let targetTime = 0;
    let currentTime = 0;

    const drawFrame = () => {
      if (video.videoWidth && video.videoHeight) {
        const scale = Math.max(canvas.width / video.videoWidth, canvas.height / video.videoHeight);
        const x = (canvas.width / 2) - (video.videoWidth / 2) * scale;
        const y = (canvas.height / 2) - (video.videoHeight / 2) * scale;
        ctx.drawImage(video, x, y, video.videoWidth * scale, video.videoHeight * scale);
      }
    };

    const onLoadedMetadata = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      video.currentTime = 0.01;
      drawFrame();
    };

    video.addEventListener("loadedmetadata", onLoadedMetadata);
    // Some browsers need 'canplay' or 'canplaythrough' to be reliable
    video.addEventListener("canplay", drawFrame);

    const renderLoop = () => {
      if (video.readyState >= 2 && video.duration) {
        const scrollY = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = maxScroll > 0 ? scrollY / maxScroll : 0;
        
        targetTime = scrollProgress * video.duration;
        currentTime += (targetTime - currentTime) * 0.08;
        
        if (Math.abs(video.currentTime - currentTime) > 0.005) {
          video.currentTime = currentTime;
        }

        drawFrame();
      }
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame();
    };

    window.addEventListener("resize", handleResize);

    // Initial trigger to start loading properly in some mobile browsers
    video.load();

    return () => {
      window.removeEventListener("resize", handleResize);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("canplay", drawFrame);
      cancelAnimationFrame(animationFrameId);
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, [videoSrc]);

  return (
    <>
      {fallbackImageSrc && (
        <div 
          className="fixed top-0 left-0 w-full h-full -z-20 bg-cover bg-center"
          style={{ backgroundImage: `url(${fallbackImageSrc})` }}
        />
      )}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full -z-10 object-cover pointer-events-none"
      />
    </>
  );
}
