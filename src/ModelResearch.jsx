import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight, MagnifyingGlassPlus, PlayCircle } from '@phosphor-icons/react';
import { SeriesPlayer } from './SeriesPlayer.jsx';
import './model-research.css';

const media = file => `/media/shaocheng/${file}`;

export const modelResearchProject = {
  id: '08',
  kind: 'model-research',
  title: '建模工程历史考据',
  category: '少城春柳 / 历史考据 × Blender × AI',
  image: 'shaocheng/stage.webp',
  name: '少城春柳 · 建模工程历史考据',
  summary: '从历史资料到三维空间，再到可控镜头，附 2026 年 2 月的早期建模生成记录',
};

function CaseImage({ file, label, caption, className = '' }) {
  return <figure className={`case-image ${className}`}>
    <a href={media(file)} target="_blank" rel="noreferrer" aria-label={`放大查看${label}`}>
      <img src={media(file)} alt={label} loading="lazy"/>
      <span className="case-image-zoom"><MagnifyingGlassPlus size={18}/> 放大查看</span>
    </a>
    <figcaption><strong>{label}</strong>{caption && <p>{caption}</p>}</figcaption>
  </figure>;
}

const galleryChoices = ['建筑与模型', '舞台复原', '人物资产', '分镜演示'];
const workflow = [
  ['查证史料', '把人物、年代与场馆逐项对应，归档旧照、建筑图纸和研究资料，明确哪些细节有依据'],
  ['搭建空间', '从图纸提取层高、门窗与空间关系，将模型导入 Blender，整理场景并调整机位与人物比例'],
  ['生成与校对', '锁定角色、服装和场景版本，以模型与参考图约束生成，逐镜检查构图、光向和连续性'],
  ['整理交付', '用镜头编号对应素材、工程和输出，记录修改与审核状态，让下一轮制作能接着推进'],
];

export function ModelResearchDetail() {
  const [gallery, setGallery] = useState(0);
  const [showDate, setShowDate] = useState(false);

  return <article className="model-case">
    <header className="model-case-head">
      <p className="eyebrow">SELECTED STUDY / 08</p>
      <p className="model-case-project">《少城春柳》</p>
      <h2>建模工程历史考据</h2>
      <p className="model-case-intro">以曾孝谷、李叔同与春柳社相关历史为线索，将旧照、建筑图纸与人物研究转化为可用于影像制作的视觉资产，在 Blender 中整理模型、推演空间与机位，再进入 AI 图片与视频生成</p>
      <div className="model-case-meta"><span>历史资料研究</span><i/><span>Blender 场景与机位</span><i/><span>AI 视觉复原</span></div>
    </header>

    <section className="model-case-gallery" aria-label="少城春柳项目资料与制作成果">
      <div className="case-gallery-switch" role="group" aria-label="选择项目资料类别">
        {galleryChoices.map((choice, index) => <button key={choice} aria-pressed={gallery === index} onClick={() => setGallery(index)}><small>0{index + 1}</small>{choice}</button>)}
      </div>
      <div className="case-gallery-content" key={gallery}>
        {gallery === 0 && <>
          <div className="case-gallery-pair case-architecture">
            <CaseImage file="historic-elevation.webp" label="01 / 建筑立面档案" caption="以门窗、屋顶和立面比例建立结构参照"/>
            <CaseImage file="model-object.webp" label="02 / 三维建筑资产" caption="工程中的 YMCA 模型预览，进入 Blender 继续整理与调整"/>
          </div>
          <p className="case-gallery-description">把平面的建筑信息转成可以观察和调整的空间，模型为机位、透视与尺度提供共同参照，让后续生成围绕同一套空间关系展开</p>
          <details className="case-extra"><summary>展开建筑平面参考 <ArrowRight size={17}/></summary><CaseImage file="historic-plan.webp" label="建筑平面档案" caption="用于对照楼层分区、出入口与空间组织"/></details>
        </>}
        {gallery === 1 && <>
          <CaseImage file="stage.webp" label="《茶花女》片段 · 舞台视觉复原" caption="结合存世舞台照片研究人物站位与室内陈设，再推演镜头中的完整场景"/>
          <div className="case-gallery-pair">
            <CaseImage file="empty-stage.webp" label="空台资产" caption="先整理背景、家具与表演区域"/>
            <CaseImage file="audience.webp" label="观众席反向视角" caption="推演戏台与观众区域之间的空间关系"/>
          </div>
        </>}
        {gallery === 2 && <>
          <p className="case-gallery-description">从人物旧照中提取面部、发式与服装特征，分别整理生活身份和舞台角色，三视图用于约束不同机位下的人物一致性</p>
          <CaseImage file="zeng-character.webp" label="曾孝谷 · 便装多视角资产"/>
          <CaseImage file="li-character.webp" label="李叔同 · 便装多视角资产"/>
        </>}
        {gallery === 3 && <>
          <figure className="video-figure case-demo">
            <SeriesPlayer src={media('opening-demo-v2.mp4')} poster={media('opening-demo.jpg')} label="开场氛围分镜 Demo"/>
            <figcaption><PlayCircle size={18}/><span>开场氛围分镜 Demo · 01:53</span></figcaption>
          </figure>
          <p className="case-gallery-description">项目资料中的 P1-1-1 分镜演示，以雨夜街巷和屋瓦上的猫建立开场氛围，展示从静态视觉资产进入镜头测试的制作阶段</p>
        </>}
      </div>
      <p className="case-evidence-note">考据边界｜康德尔设计的 YMCA 建筑资料用于比较性复原，与 1907 年实际演出场馆的对应关系仍待核实，生成画面与模型为制作推演</p>
      <a className="case-source-link" href="https://rmda.kulib.kyoto-u.ac.jp/item/rb00020085" target="_blank" rel="noreferrer">图纸来源 · 京都大学贵重资料数字档案 <ArrowUpRight size={15}/></a>
    </section>

    <section className="model-method" aria-labelledby="model-method-heading">
      <div className="case-section-head"><span>THE WORKFLOW</span><h3 id="model-method-heading">让考据，进入制作流程</h3></div>
      <p className="case-section-intro">把项目 SOP 收束为四个环节，既让画面有依据，也让制作有顺序</p>
      <ol>{workflow.map(([title, text], index) => <li key={title}><span>0{index + 1}</span><div><h4>{title}</h4><p>{text}</p></div></li>)}</ol>
    </section>

    <section className="model-practice" aria-labelledby="model-practice-heading">
      <div className="case-section-head"><span>EARLY PRACTICE / 个人实践记录</span><span>从早期探索，到项目方法</span></div>
      <time dateTime="2026-02-26" className="practice-date">2026 <span>/</span> 02 <span>/</span> 26</time>
      <h3 id="model-practice-heading">那时，我已用建模辅助图片与视频生成</h3>
      <p className="case-section-intro">这张 Blender 操作照片保留了右下角的系统日期，早在 2026 年 2 月 26 日，我就已通过模型安排空间、人物站位与机位，再把画面推进到 AI 生成，这些早期实践逐渐成为《少城春柳》中更系统的制作方法</p>
      <div className="practice-record-grid">
        <div className="practice-record">
          <CaseImage file="early-blender.png" label="建模现场 · 2026/2/26" caption="亭子、树木、车马与人物站位的 Blender 场景记录"/>
          <button className="practice-date-button" aria-expanded={showDate} aria-controls="practice-date-zoom" onClick={() => setShowDate(!showDate)}><MagnifyingGlassPlus size={16}/>{showDate ? '收起日期细节' : '放大右下角日期'}</button>
          {showDate && <div className="practice-date-detail" id="practice-date-zoom"><div className="practice-date-crop" role="img" aria-label="原始照片右下角的系统日期 2026/2/26"/><p>原照片局部放大</p></div>}
        </div>
        <CaseImage file="early-video-still.png" label="从场景参考，到视频画面" caption="早期古装雪景生成视频的播放截图，记录从空间构想到影像画面的尝试"/>
      </div>
      <div className="practice-classroom-head"><h4>同一思路，也用在教室场景</h4><span>模型布局 <ArrowRight size={15}/> 生成画面</span></div>
      <div className="case-gallery-pair practice-classroom">
        <CaseImage file="classroom-model.png" label="先确定空间与人物关系" caption="在模型中安排课桌、人物座位和观察角度"/>
        <CaseImage file="classroom-result.png" label="再生成材质、光线与氛围" caption="以空间布局作为参考，推进完整的教室画面"/>
      </div>
      <p className="practice-closing">我的积累，是把建模、镜头和生成反复放进实际创作，让经验成为下一次制作可以复用的方法</p>
    </section>
  </article>;
}
