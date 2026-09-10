import React from 'react';
import { ArrowUpRight, CaretDown } from '@phosphor-icons/react';
import script from './gaohuan-episode10.json';
import './development-experience.css';

export const roughCutProject = {
  id: '12', title: '高欢前传 10 · 红颜破局 · 粗剪版',
  name: '《高欢前传》10 · 红颜破局', category: '粗剪展示 / 导演思维 × 剪辑思维',
  image: 'gaohuan-10-poster.jpg', video: 'gaohuan-10/index.m3u8', duration: '09:33',
  series: '《高欢前传》连续影像', episode: '粗剪版 · EP 10', seriesIndex: '04 / 04', roughCut: true,
  intro: '娄昭君携证据赶赴刑场，救人的希望在权力压制中再度落空；韩婉儿以婚约换取高欢生路，让一次免死转化为更沉重的情感代价，人物也由此走向新的命运岔路',
  scope: '个人粗剪辑 · 剧本到影像的叙事组织 · 完整展示 9′33″',
  note: '本片为粗剪阶段作品，用于展示导演判断、镜头组织与节奏设计；精剪、声音及画面细节仍可继续完善',
  playbackCaption: '第十集《红颜破局》· 粗剪版 · 建议开启声音观看',
  researchLabel: 'DIRECTING THROUGH THE EDIT', researchTitle: '在粗剪中，看见叙事判断',
  facts: [
    ['导演思维', '先确立每场戏的目标与人物处境：娄昭君争取公道，韩婉儿承担交换的代价，高欢面对获救之后的失去，再围绕这些关系组织画面'],
    ['剪辑思维', '通过镜头取舍、对话与反应镜头的衔接、信息揭示顺序和停顿长短，把剧情中的希望、受阻与代价连接成可感知的情绪变化'],
    ['创作价值', '我把素材组织为有因果、有视点、有节奏的连续叙事，让技术生成的画面承担明确的戏剧任务；这些持续的选择，构成不同创作者作品观感与表达的差异'],
  ],
};

export function RoughCutDetail() {
  return <div className="roughcut-extra">
    <p className="roughcut-reference">剪辑参考：Walter Murch 在《眨眼之间》中将情绪、故事与节奏列为切点判断的重要依据，这也为阅读本片的粗剪思路提供了一个视角 <a href="https://blogs.ischool.berkeley.edu/i290-viznarr-s12/the-rule-of-six-walter-murch/" target="_blank" rel="noreferrer">阅读原文摘录 <ArrowUpRight size={13}/></a></p>
    <details className="case-disclosure episode-script">
      <summary><span><strong>第十集《红颜破局》剧本</strong><small>点击展开 · 剧情、对白、置景、灯光与分镜调度</small></span><CaretDown size={20}/></summary>
      <div className="script-body">
        <p className="script-source">选自《敕勒川悲歌续改版》第十集，保留原文内容供对照阅读，剧本设计与当前粗剪的呈现可能存在差异</p>
        {script.scenes.map((scene,i) => <section className="script-scene" key={scene.title}><h4>{scene.title}</h4>{scene.lines.map((line,j) => ['置景美术','灯光氛围','分镜调度'].includes(line) ? <h5 key={j}>{line}</h5> : <p key={j} className={line.endsWith('：') ? 'script-speaker' : undefined}>{line}</p>)}</section>)}
      </div>
    </details>
  </div>;
}
