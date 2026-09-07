import React, { useEffect, useRef } from 'react';
import { createEyeMotion } from './eye-motion.js';

const portrait = '/media/axuan-anime-hero.webp';

export function Portrait() {
  const canvas = useRef(null);
  useEffect(() => {
    const motion = matchMedia('(min-width: 901px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    let dispose;
    const setup = () => {
      dispose?.();
      dispose = motion.matches ? createEyeMotion(canvas.current, portrait) : undefined;
    };
    setup();
    motion.addEventListener('change', setup);
    return () => { motion.removeEventListener('change', setup); dispose?.(); };
  }, []);
  return <div className="portrait-viewer anime-viewer">
    <img className="anime-portrait" src={portrait} alt="以钟启轩本人为原型的三渲二动漫肖像，黑色卷发、圆框眼镜与电影感侧光" fetchPriority="high" width="1672" height="941"/>
    <canvas className="anime-eye-canvas" ref={canvas} aria-hidden="true"/>
  </div>;
}
