"use client";

import { useEffect, useRef, useState } from "react";

// Declare the global YT object created by the IFrame API script
declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: any;
  }
}

interface YouTubeAudioPlayerProps {
  videoId: string; // The 11-character YouTube video ID (e.g. "jfKfPfyJRdk")
}

export default function YouTubeAudioPlayer({
  videoId,
}: YouTubeAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    // 1. Load the IFrame Player API script asynchronously if not already present
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    // 2. Initialize the player when the script triggers the global ready hook
    const initPlayer = () => {
      playerRef.current = new window.YT.Player("youtube-hidden-player", {
        height: "1",
        width: "1",
        videoId: videoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          playsinline: 1,
        },
        events: {
          onReady: () => setIsReady(true),
          onStateChange: (event: any) => {
            // YT.PlayerState.PLAYING is 1, PAUSED is 2, ENDED is 0
            if (event.data === 1) setIsPlaying(true);
            if (event.data === 2 || event.data === 0) setIsPlaying(false);
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      // Cleanup player on unmount
      if (
        playerRef.current &&
        typeof playerRef.current.destroy === "function"
      ) {
        playerRef.current.destroy();
      }
    };
  }, [videoId]);

  const togglePlayback = () => {
    if (!playerRef.current || !isReady) return;

    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  return (
    <div>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={togglePlayback}
        disabled={!isReady}
        className="absolute top-[57%] left-[83%] min-h-6 min-w-4 md:min-h-10 md:min-w-8 rounded-md hover:bg-blue-400 hover:opacity-[5%] cursor-pointer hover:!shadow-none animate-pulse transition-all"
      ></button>

      {/*
        Container element for the YouTube iframe.
        Do NOT use 'display: none' or the iframe won't initialize or execute playback.
        Instead, set size to 1px with absolute positioning or opacity 0.
      */}
      <div
        id="youtube-hidden-player"
        className="absolute -left-[9999px] top-0 pointer-events-none opacity-0"
        aria-hidden="true"
      />
    </div>
  );
}
