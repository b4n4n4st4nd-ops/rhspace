"use client";

import { useRef, useState } from "react";
import Image from "next/image";

interface VisualReactiveMediaProps {
  videoSrc: string;
  audioSrc?: string;
  workspaceImage: { src: string; alt: string };
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function clampTime(time: number, max: number): number {
  if (!Number.isFinite(max) || max <= 0) return Math.max(0, time);
  return Math.max(0, Math.min(time, max));
}

const AUDIO_RATE_TIERS = [
  { at: 9.5, rate: 1.5 },
  { at: 3, rate: 1.25 },
] as const;

function getAudioPlaybackRate(videoTime: number): number {
  for (const tier of AUDIO_RATE_TIERS) {
    if (videoTime >= tier.at) return tier.rate;
  }
  return 1;
}

export function VisualReactiveMedia({
  videoSrc,
  audioSrc,
  workspaceImage,
}: VisualReactiveMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const isSeekingRef = useRef(false);
  const wasPlayingRef = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const getVideoDuration = () => videoRef.current?.duration ?? duration;

  const syncAudioPlaybackRate = (videoTime: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    const rate = getAudioPlaybackRate(videoTime);

    if (audio.playbackRate !== rate) {
      audio.playbackRate = rate;
    }
  };

  const applyTime = (time: number) => {
    const video = videoRef.current;
    const audio = audioRef.current;
    if (!video) return;

    const clamped = clampTime(time, video.duration);
    video.currentTime = clamped;
    if (audio) {
      audio.currentTime = clamped;
      syncAudioPlaybackRate(clamped);
    }
    setCurrentTime(clamped);
  };

  const stopBoth = () => {
    videoRef.current?.pause();
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  const startBoth = async () => {
    const video = videoRef.current;
    const audio = audioRef.current;
    if (!video) return false;

    video.muted = true;

    try {
      if (audio && audioSrc) {
        audio.currentTime = video.currentTime;
        audio.muted = isMuted;
        syncAudioPlaybackRate(video.currentTime);
        await Promise.all([video.play(), audio.play()]);
      } else {
        await video.play();
      }
      setIsPlaying(true);
      return true;
    } catch {
      stopBoth();
      return false;
    }
  };

  const togglePlay = async () => {
    if (isPlaying) {
      stopBoth();
      return;
    }
    await startBoth();
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    const audio = audioRef.current;
    if (audio) {
      audio.muted = nextMuted;
    }
  };

  const handleSeekStart = () => {
    isSeekingRef.current = true;
    wasPlayingRef.current = isPlaying;
    if (isPlaying) {
      videoRef.current?.pause();
      audioRef.current?.pause();
    }
  };

  const handleSeek = (value: number) => {
    applyTime(value);
  };

  const handleSeekEnd = async () => {
    isSeekingRef.current = false;
    if (wasPlayingRef.current) {
      await startBoth();
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    const audio = audioRef.current;
    if (!video || isSeekingRef.current) return;

    const time = video.currentTime;
    setCurrentTime(time);
    syncAudioPlaybackRate(time);

    if (
      audio &&
      isPlaying &&
      getAudioPlaybackRate(time) === 1 &&
      Math.abs(audio.currentTime - time) > 0.25
    ) {
      audio.currentTime = time;
    }
  };

  const handleVideoLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration)) return;
    setDuration(video.duration);
  };

  const handleVideoEnded = () => {
    stopBoth();
    const end = getVideoDuration();
    if (Number.isFinite(end) && end > 0) {
      setCurrentTime(end);
    }
  };

  const handleVideoPause = () => {
    if (isSeekingRef.current) return;
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 md:max-w-4xl md:flex-row md:items-stretch md:justify-center md:gap-6">
      <div className="w-full max-w-[200px] shrink-0 overflow-hidden rounded-xl border border-border bg-black sm:max-w-[220px]">
        <video
          ref={videoRef}
          src={videoSrc}
          className="mx-auto max-h-[min(45vh,360px)] w-full cursor-pointer object-contain"
          playsInline
          muted
          preload="metadata"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleVideoLoadedMetadata}
          onEnded={handleVideoEnded}
          onPause={handleVideoPause}
          onPlay={() => setIsPlaying(true)}
          onClick={togglePlay}
        />

        {audioSrc ? (
          <audio ref={audioRef} src={audioSrc} preload="metadata" />
        ) : null}

        <div className="border-t border-border/40 bg-surface/95 px-2.5 py-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={togglePlay}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded border border-border bg-background text-[10px] font-semibold uppercase text-foreground transition-colors hover:border-accent/40"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? "❚❚" : "▶"}
            </button>
            {audioSrc ? (
              <button
                type="button"
                onClick={toggleMute}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded border border-border bg-background text-[10px] text-foreground transition-colors hover:border-accent/40"
                aria-label={isMuted ? "Unmute soundtrack" : "Mute soundtrack"}
              >
                {isMuted ? "🔇" : "🔊"}
              </button>
            ) : null}
            <input
              type="range"
              min={0}
              max={duration || 0}
              step={0.1}
              value={currentTime}
              onPointerDown={handleSeekStart}
              onPointerUp={() => void handleSeekEnd()}
              onPointerCancel={() => void handleSeekEnd()}
              onChange={(e) => handleSeek(Number(e.target.value))}
              className="min-w-0 flex-1 accent-accent"
              aria-label="Seek"
            />
            <span className="shrink-0 font-mono text-[9px] tabular-nums text-muted">
              {formatTime(currentTime)}/{formatTime(duration)}
            </span>
          </div>
        </div>
      </div>

      <div className="w-full max-w-md overflow-hidden rounded-xl border border-border md:max-w-none md:flex-1">
        <div className="relative aspect-[4/3] w-full md:aspect-auto md:h-full md:min-h-[200px] md:max-h-[min(45vh,360px)]">
          <Image
            src={workspaceImage.src}
            alt={workspaceImage.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 420px"
          />
        </div>
      </div>
    </div>
  );
}
