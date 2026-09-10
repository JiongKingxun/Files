import React, { useEffect, useRef, useState } from 'react';

export function SeriesPlayer({ src, poster, label }) {
  const videoRef = useRef(null);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const streaming = src.endsWith('.m3u8');

  useEffect(() => {
    const video = videoRef.current;
    let hls, disposed = false;
    setFailed(false);
    if (!streaming) return;
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
    } else {
      import('hls.js').then(({ default: Hls }) => {
        if (disposed) return;
        if (!Hls.isSupported()) { setFailed(true); return; }
        hls = new Hls({ maxBufferLength: 20, backBufferLength: 20, capLevelToPlayerSize: true });
        hls.on(Hls.Events.ERROR, (_, data) => { if (data.fatal) setFailed(true); });
        hls.loadSource(src);
        hls.attachMedia(video);
      }).catch(() => { if (!disposed) setFailed(true); });
    }
    return () => {
      disposed = true;
      hls?.destroy();
      video.pause();
      video.removeAttribute('src');
      video.load();
    };
  }, [src, streaming, attempt]);

  return <div className="series-player-wrap">
    <video ref={videoRef} className="project-player" src={streaming ? undefined : src} poster={poster} aria-label={label} controls playsInline preload="metadata" onError={() => setFailed(true)}/>
    {failed && <p className="player-error" role="status">视频暂时未能加载 <button type="button" onClick={() => { setFailed(false); streaming ? setAttempt(n => n + 1) : videoRef.current?.load(); }}>重新加载</button></p>}
  </div>;
}
