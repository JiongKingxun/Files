import React from 'react';
import { ArrowUpRight } from '@phosphor-icons/react';

const tools = [
  ['Procreate', 'https://procreate.com/procreate'],
  ['Photoshop', 'https://www.adobe.com/products/photoshop.html'],
  ['Premiere', 'https://www.adobe.com/products/premiere.html'],
  ['SketchUp', 'https://sketchup.trimble.com/en'],
  ['Midjourney', 'https://www.midjourney.com/'],
  ['Seedance', 'https://seed.bytedance.com/en/seedance2_0'],
  ['Codex', 'https://openai.com/codex/'],
];

export function CreativeTools() {
  return <div className="creative-tools reveal">
    <h3>创作工具与方法</h3>
    <div className="creative-tool-links">{tools.map(([name, url]) => <a key={name} href={url} target="_blank" rel="noopener noreferrer" aria-label={`${name} 官网介绍（新窗口打开）`}><span>{name}</span><ArrowUpRight size={17} aria-hidden="true"/></a>)}</div>
  </div>;
}
