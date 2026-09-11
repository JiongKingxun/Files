import React, { useEffect, useId, useRef, useState } from 'react';
import { CaretDown } from '@phosphor-icons/react';
import { getVideoQualities } from './video-quality.js';
import './video-player.css';

export function SeriesPlayer({ src, poster, label }) {
  const videoRef = useRef(null);
  const qualityRoot = useRef(null);
  const resumeState = useRef(null);
  const controlsTimer = useRef(null);
  const menuId = useId();
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [quality, setQuality] = useState('original');
  const [qualityOpen, setQualityOpen] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const qualities = getVideoQualities(src);
  const selectedQuality = qualities.find(option => option.id === quality) || qualities.at(-1);
  const playbackSrc = selectedQuality.src;
  const streaming = playbackSrc.endsWith('.m3u8');

  useEffect(() => {
    setQuality('original');
    setQualityOpen(false);
    setControlsVisible(true);
    resumeState.current = null;
  }, [src]);

  useEffect(() => () => clearTimeout(controlsTimer.current), []);

  useEffect(() => {
    clearTimeout(controlsTimer.current);
    if (qualityOpen) setControlsVisible(true);
    else if (!videoRef.current?.paused) controlsTimer.current = setTimeout(() => setControlsVisible(false), 2200);
  }, [qualityOpen]);

  useEffect(() => {
    if (!qualityOpen) return;
    const onOutside = event => { if (!qualityRoot.current?.contains(event.target)) setQualityOpen(false); };
    const onEscape = event => { if (event.key === 'Escape') setQualityOpen(false); };
    document.addEventListener('pointerdown', onOutside);
    document.addEventListener('keydown', onEscape);
    return () => {
      document.removeEventListener('pointerdown', onOutside);
      document.removeEventListener('keydown', onEscape);
    };
  }, [qualityOpen]);

  useEffect(() => {
    const video = videoRef.current;
    let hls, disposed = false;
    setFailed(false);
    const restorePlayback = () => {
      const state = resumeState.current;
      if (!state) return;
      video.currentTime = Math.min(state.time, Number.isFinite(video.duration) ? Math.max(0, video.duration - .15) : state.time);
      video.volume = state.volume;
      video.muted = state.muted;
      video.playbackRate = state.rate;
      if (!state.paused) video.play().catch(() => {});
      resumeState.current = null;
    };
    video.addEventListener('loadedmetadata', restorePlayback);
    if (!streaming) {
      video.src = playbackSrc;
      return () => video.removeEventListener('loadedmetadata', restorePlayback);
    }
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = playbackSrc;
    } else {
      import('hls.js').then(({ default: Hls }) => {
        if (disposed) return;
        if (!Hls.isSupported()) { setFailed(true); return; }
        hls = new Hls({ startLevel: 0, maxBufferLength: 20, backBufferLength: 20, capLevelToPlayerSize: true });
        hls.on(Hls.Events.ERROR, (_, data) => { if (data.fatal) setFailed(true); });
        hls.loadSource(playbackSrc);
        hls.attachMedia(video);
      }).catch(() => { if (!disposed) setFailed(true); });
    }
    return () => {
      disposed = true;
      video.removeEventListener('loadedmetadata', restorePlayback);
      hls?.destroy();
      video.pause();
      video.removeAttribute('src');
      video.load();
    };
  }, [playbackSrc, streaming, attempt]);

  const changeQuality = next => {
    const video = videoRef.current;
    if (next === quality || !video) { setQualityOpen(false); return; }
    resumeState.current = { time: video.currentTime || 0, paused: video.paused, volume: video.volume, muted: video.muted, rate: video.playbackRate };
    setFailed(false);
    setQuality(next);
    setQualityOpen(false);
  };

  const revealControls = () => {
    clearTimeout(controlsTimer.current);
    setControlsVisible(true);
    if (!videoRef.current?.paused && !qualityOpen) controlsTimer.current = setTimeout(() => setControlsVisible(false), 2200);
  };

  const keepControls = () => {
    clearTimeout(controlsTimer.current);
    setControlsVisible(true);
  };

  const hideControlsLater = () => {
    clearTimeout(controlsTimer.current);
    if (!videoRef.current?.paused && !qualityOpen) controlsTimer.current = setTimeout(() => setControlsVisible(false), 500);
  };

  return <div className={`series-player-wrap ${controlsVisible || qualityOpen ? 'is-controls-visible' : ''}`} onPointerMove={revealControls} onPointerDown={revealControls} onMouseLeave={hideControlsLater} onFocusCapture={keepControls} onBlurCapture={hideControlsLater}>
    <video ref={videoRef} className="project-player" poster={poster} aria-label={label} controls playsInline preload="metadata" onPlay={revealControls} onPause={keepControls} onEnded={keepControls} onError={() => setFailed(true)}/>
    <div className="video-quality" ref={qualityRoot}>
      <button type="button" className="video-quality-trigger" aria-expanded={qualityOpen} aria-controls={menuId} onClick={() => setQualityOpen(open => !open)}>画质 · {selectedQuality.label}<CaretDown size={13} aria-hidden="true"/></button>
      <ul className="video-quality-menu" id={menuId} role="radiogroup" aria-label="选择视频画质" hidden={!qualityOpen}>
        {qualities.map(option => <li key={option.id}><button type="button" className="video-quality-option" role="radio" aria-checked={quality === option.id} onClick={() => changeQuality(option.id)}>{option.label}</button></li>)}
      </ul>
    </div>
    {failed && <p className="player-error" role="status">视频暂时未能加载 <button type="button" onClick={() => { setFailed(false); streaming ? setAttempt(n => n + 1) : videoRef.current?.load(); }}>重新加载</button></p>}
  </div>;
}
