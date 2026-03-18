"use client";

import { useEffect, useRef } from "react";

interface ScrollVideoCanvasProps {
  videoSrc: string;
  fallbackImageSrc?: string;
}

export default function ScrollVideoCanvas({ videoSrc, fallbackImageSrc }: ScrollVideoCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Optimize canvas by disabling alpha channel since it's an opaque background
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const video = document.createElement("video");
    video.src = videoSrc;
    video.muted = true;
    video.playsInline = true;
    video.crossOrigin = "anonymous";
    video.preload = "auto";
    video.setAttribute('webkit-playsinline', 'webkit-playsinline');

    let animationFrameId: number;
    let targetTime = 0;
    let currentTime = 0;

    const drawFrame = () => {
      if (video.videoWidth && video.videoHeight) {
        // Calculate dimensions to cover the screen while maintaining aspect ratio
        const scale = Math.max(canvas.width / video.videoWidth, canvas.height / video.videoHeight);
        const x = (canvas.width / 2) - (video.videoWidth / 2) * scale;
        const y = (canvas.height / 2) - (video.videoHeight / 2) * scale;
        ctx.drawImage(video, x, y, video.videoWidth * scale, video.videoHeight * scale);
      }
    };

    video.addEventListener("loadedmetadata", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      video.currentTime = 0.01;
      // Provide an initial draw as a placeholder while the user hasn't scrolled
      drawFrame();
    });

    const renderLoop = () => {
      // readyState >= 2 means HAVE_CURRENT_DATA (can play current frame)
      if (video.readyState >= 2 && video.duration) {
        const scrollY = window.scrollY;
        // Total scrollable height minus the viewport
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = maxScroll > 0 ? scrollY / maxScroll : 0;
        
        targetTime = scrollProgress * video.duration;
        
        // Linear interpolation (lerp) for smooth scrubbing
        // The factor (0.08) determines how "heavy" or smoothed the scrub feels
        currentTime += (targetTime - currentTime) * 0.08;
        
        // Only set currentTime if there's a meaningful change to avoid jitter
        if (Math.abs(video.currentTime - currentTime) > 0.005) {
          video.currentTime = currentTime;
        }

        drawFrame();
      }
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    // Kick off continuous animation loop
    animationFrameId = requestAnimationFrame(renderLoop);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      // Clean up video memory
      video.removeAttribute("src");
      video.load();
    };
  }, [videoSrc]); // fallbackImageSrc is ignored but kept in props for compatibility

  return (
    <>
      {/* We keep the fallback image underneath the canvas, so that if the canvas fails or takes a moment to load on slow mobile connections, there is not a blank black screen. */}
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
