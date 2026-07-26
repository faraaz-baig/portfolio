import { useRef, useState } from "react";

const TRACK = {
  artist: "John Dowland",
  title: "Bookes of Songes or Ayres",
  src: "/audio/dowland.mp3",
  cover: "/images/dowland.png",
};

const PlayIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const PauseIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 5h4v14H6V5zm8 0h4v14h-4V5z" />
  </svg>
);

export default function FloatingPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);
  const [coverError, setCoverError] = useState(false);

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
    <div className={playing ? "floating-player playing" : "floating-player"}>
      <div className="floating-player-frame">
        <div className="floating-player-card">
          <div className="floating-player-cover">
            <div className="floating-player-cover-inner">
              {coverError ? (
                <span className="floating-player-cover-initial">D</span>
              ) : (
                <img
                  src={TRACK.cover}
                  alt="John Dowland"
                  className="floating-player-cover-img"
                  onError={() => setCoverError(true)}
                />
              )}
            </div>
          </div>

          <div className="floating-player-info">
            <div className="floating-player-labels">
              <span>Lute</span>
              <span>Air</span>
            </div>
            <span className="floating-player-title" title={`${TRACK.artist} — ${TRACK.title}`}>
              {error ? "Add /audio/dowland.mp3" : `${TRACK.artist} — ${TRACK.title}`}
            </span>
          </div>

          <span className="floating-player-play-wrap">
            <span className="floating-player-ring" />
            <span className="floating-player-ring" />
            <span className="floating-player-ring" />
            <button
              type="button"
              className="floating-player-play"
              onClick={togglePlay}
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? <PauseIcon /> : <PlayIcon />}
            </button>
          </span>
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
