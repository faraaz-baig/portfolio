import { useEffect, useRef, useState } from "react";

const TRACK = {
  artist: "John Dowland",
  title: "Bookes of Songes or Ayres",
  src: "/audio/dowland.mp3",
};

const PlayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const PauseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 5h4v14H6V5zm8 0h4v14h-4V5z" />
  </svg>
);

export default function FloatingPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => setError(true));
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  return (
    <div className="floating-player">
      <div
        style={{
          background: "#f1ece1",
          border: "1px solid rgba(27,25,22,0.45)",
          padding: "5px",
          boxShadow: "0 6px 28px rgba(0,0,0,0.10)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            border: "1px solid rgba(27,25,22,0.2)",
            padding: "10px 14px",
            background: "#f1ece1",
          }}
        >
          {/* Drop cap in the manner of the article openings */}
          <span
            className="floating-player-dropcap"
            style={{
              flexShrink: 0,
              width: "44px",
              height: "44px",
              border: "1px solid rgba(27,25,22,0.45)",
              padding: "3px",
              background: "#ece5d7",
              display: "flex",
            }}
          >
            <span
              className="floating-player-dropcap-inner"
              style={{
                flex: 1,
                border: "1px solid rgba(27,25,22,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Cormorant Garamond', 'EB Garamond', Georgia, serif",
                fontSize: "28px",
                lineHeight: 1,
                color: "#8f2e18",
              }}
            >
              D
            </span>
          </span>

          <div className="floating-player-info" style={{ display: "grid", gap: "4px", minWidth: 0 }}>
            <span
              style={{
                fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
                fontSize: "9px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#8f2e18",
              }}
            >
              {error ? "Audio" : "Lute air"}
            </span>
            <span
              className="floating-player-title"
              style={{
                fontFamily: "'EB Garamond', Georgia, serif",
                fontSize: "14px",
                fontStyle: "italic",
                color: "#4a453c",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "min(260px, calc(100vw - 190px))",
              }}
              title={`${TRACK.artist} — ${TRACK.title}`}
            >
              {error ? "Add /audio/dowland.mp3" : `${TRACK.artist} — ${TRACK.title}`}
            </span>
          </div>

          <button
            type="button"
            className="floating-player-play"
            onClick={togglePlay}
            aria-label={playing ? "Pause" : "Play"}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border: "1px solid rgba(143,46,24,0.45)",
              background: "transparent",
              color: "#8f2e18",
              cursor: "pointer",
              flexShrink: 0,
              transition: "background .2s ease, color .2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#8f2e18";
              e.currentTarget.style.color = "#f1ece1";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#8f2e18";
            }}
          >
            {playing ? <PauseIcon /> : <PlayIcon />}
          </button>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={TRACK.src}
        loop
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onError={() => setError(true)}
      />
    </div>
  );
}
