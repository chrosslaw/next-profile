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
  videoId: string;
}

export default function YouTubeAudioPlayer({
  videoId,
}: YouTubeAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const playerRef = useRef<any>(null);
  const playerClasses =
    "absolute aspect-video rounded-lg overflow-hidden shadow-2xl z-30 transition-all duration-500 pointer-events-none " +
    "left-[0%] top-[101%] w-full max-w-7xl " +
    "md:left-[50%] md:top-[11%] md:w-[24%] md:p-0 md:max-w-none";
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
        height: "100%",
        width: "100%",
        videoId: videoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          rel: 0,
          iv_load_policy: 3,
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
        className="absolute top-[57%] left-[83%] min-h-6 min-w-4 md:min-h-10 md:min-w-8 rounded-md hover:bg-blue-100 hover:opacity-[5%] cursor-pointer hover:!shadow-none animate-pulse transition-all"
      >
        {isPlaying ? "Pause" : ""}{" "}
      </button>

      <div
        className={`${playerClasses} ${isPlaying ? "opacity-100" : "opacity-0"}`}
        aria-hidden={!isPlaying}
      >
        <div id="youtube-hidden-player" className="w-full h-full" />
      </div>
    </div>
  );
}
