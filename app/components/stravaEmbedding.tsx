"use client";

import { FC, useEffect, useRef } from "react";

declare global {
  interface Window {
    __stravaEmbedding?: () => void;
  }
}

type TStravaEmbeddingProps = {
  embedId: string;
};

const StravaEmbedding: FC<TStravaEmbeddingProps> = ({ embedId }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const scriptId = "strava-embed-script";
    const existingScript = document.getElementById(scriptId);

    if (!existingScript) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://strava-embeds.com/embed.js";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        if (window.__stravaEmbedding) {
          window.__stravaEmbedding(); // Strava's embed init function
        }
      };
    } else {
      // Already loaded — call the embed initializer
      if (window.__stravaEmbedding) {
        window.__stravaEmbedding();
      }
    }
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div
        ref={containerRef}
        className="strava-embed-placeholder"
        data-embed-type="activity"
        data-embed-id={embedId}
        data-style="standard"
        data-from-embed="false"
      />
    </div>
  );
};

export { StravaEmbedding };
