"use client";

import { useRef, useState } from "react";

interface MusicProductionPlayerProps {
  audioSrc: string;
  title: string;
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function MusicProductionPlayer({
  audioSrc,
  title,
}: MusicProductionPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }
    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const handleSeek = (value: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value;
    setCurrentTime(value);
  };

  return (
    <div className="max-w-md overflow-hidden rounded-xl border border-border bg-surface">
      <p className="border-b border-border px-4 py-3 text-sm font-semibold">{title}</p>
      <audio
        ref={audioRef}
        src={audioSrc}
        preload="metadata"
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime ?? 0)}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration ?? 0)}
        onEnded={() => {
          setIsPlaying(false);
          setCurrentTime(0);
        }}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />
      <div className="flex items-center gap-3 px-4 py-3">
        <button
          type="button"
          onClick={() => void togglePlay()}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded border border-border bg-background text-xs font-semibold transition-colors hover:border-accent/40"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? "❚❚" : "▶"}
        </button>
        <input
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={currentTime}
          onChange={(e) => handleSeek(Number(e.target.value))}
          className="min-w-0 flex-1 accent-accent"
          aria-label="Seek"
        />
        <span className="shrink-0 font-mono text-[10px] tabular-nums text-muted">
          {formatTime(currentTime)}/{formatTime(duration)}
        </span>
      </div>
    </div>
  );
}
