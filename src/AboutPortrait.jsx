import React, { useState } from 'react';

export function AboutPortrait() {
  const [alternate, setAlternate] = useState(false);
  return <div className="portrait-block">
    <button className={`portrait-frame about-photo-switch${alternate ? ' is-alternate' : ''}`}
      onPointerEnter={event => { if (event.pointerType === 'mouse') setAlternate(true); }}
      onPointerLeave={event => { if (event.pointerType === 'mouse') setAlternate(false); }}
      onFocus={event => { if (event.currentTarget.matches(':focus-visible')) setAlternate(true); }} onBlur={() => setAlternate(false)}
      onClick={event => { if (event.detail === 0 || !matchMedia('(hover: hover)').matches) setAlternate(value => !value); }}
      aria-label="切换钟启轩的两张个人照片" aria-pressed={alternate}>
      <img className="about-photo-original" src="/media/axuan-about-default.webp" alt="钟启轩，蓝衬衫与黑色针织衫，保留原始背景" loading="lazy" width="1000" height="1222"/>
      <img className="about-photo-alternate" src="/media/axuan-about-hover.webp" alt="钟启轩，白衬衫与圆框眼镜" loading="lazy" width="1000" height="1000"/>
    </button>
    <div className="portrait-caption"><span>钟启轩 <small>AXUAN</small></span><span className="portrait-switch-hint">悬停切换肖像</span></div>
  </div>;
}
