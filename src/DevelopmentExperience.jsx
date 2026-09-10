import React from 'react';
import { ArrowUpRight, CaretDown, MagnifyingGlassPlus } from '@phosphor-icons/react';
import './development-experience.css';

export const developmentExperienceProject = {
  id: '11', kind: 'development-experience',
  name: '个人开发程序 · Vibe Coding', title: '个人开发程序 · Vibe Coding',
  category: '阿轩画布 × 阿轩的图片工坊 / 从创作需求到桌面工具',
  image: 'development/studio-interface.webp',
  summary: '把 AIGC 制作中反复遇到的问题转化为工具需求，结合 Codex 等编程助手，持续开发节点画布与图片处理软件，推进功能、交互、数据保存和桌面交付',
};

export function DevelopmentCover() {
  return <div className="development-cover" aria-hidden="true"><div className="development-cover-copy"><small>BUILT FROM REAL WORK</small><strong>让工具<br/>跟上创作</strong><span>AXUAN CANVAS<br/>AXUAN IMAGE STUDIO</span></div><div className="development-cover-screens"><img src="/media/development/canvas-interface.webp" alt="" width="1460" height="920" loading="lazy"/><img src="/media/development/studio-interface.webp" alt="" width="1600" height="1000" loading="lazy"/></div></div>;
}

function AppImage({name,caption,detail,width,height}) {
  const src=`/media/development/${name}.webp`;
  return <figure className="development-image"><a href={src} target="_blank" rel="noreferrer" aria-label={`放大查看${caption}`}><img src={src} alt={caption} width={width} height={height} loading="lazy" decoding="async"/><span><MagnifyingGlassPlus size={16}/> 查看界面</span></a><figcaption><strong>{caption}</strong><span>{detail}</span></figcaption></figure>;
}

const workflow = [
  ['从使用场景提需求', '围绕剧本、参考素材、模型调用、图片处理与结果交接，把重复操作和具体痛点写成可实现的功能要求'],
  ['用 AI 辅助推进实现', '由我明确产品方向、交互和验收目标，与 Codex 等编程助手协作，将需求逐步转化为界面、处理逻辑和桌面程序'],
  ['把问题变成迭代清单', '从拖入素材、画笔跟手、任务恢复到导出文件，持续试用并反馈问题，让功能经得起真实操作'],
  ['让成果能够继续使用', '整理版本记录、测试与打包配置，关注项目缓存、素材保存和迁移，使开发成果能够交付并持续迭代'],
];

export function DevelopmentExperienceDetail() {
  return <article className="development-case">
    <header className="development-head"><p className="eyebrow">PERSONAL DEVELOPMENT / 04</p><h2>个人开发程序<br/><span>Vibe Coding</span></h2><p className="development-lead">我把创作中的反复操作，逐步做成自己的工具<br/>从提出需求、打磨交互，到验证输出和整理交付，阿轩画布与图片工坊记录了我把想法转化为程序的过程</p><div className="development-tags"><span>需求定义</span><span>AI 辅助编程</span><span>交互迭代</span><span>本地桌面工具</span></div></header>

    <section className="development-product" aria-labelledby="canvas-case-title">
      <div className="development-product-heading"><span>01 / AXUAN CANVAS</span><small>v0.8.3 · Windows 桌面版</small></div>
      <h3 id="canvas-case-title">阿轩画布</h3><p className="development-product-intro">把剧本、素材与生成任务，组织在同一张画布上</p>
      <AppImage name="canvas-interface" caption="阿轩画布 · 节点创作界面" detail="本地项目、素材与连线组织" width="1460" height="920"/>
      <div className="development-features">
        <article><h4>从资料到生成的节点流程</h4><p>将文本、剧本、角色、图片、视频和音频放在无限画布中，通过连线组织上下文，串联素材准备与生成任务</p></article>
        <article><h4>把导演意图变成可操作的画面</h4><p>结合 3D 导演台的姿态、机位与截图回传，以及图片工作台的构图相机、局部 Mark 标记、手绘与图层编辑，辅助表达具体修改意图</p></article>
        <article><h4>管理多模型与生成状态</h4><p>统一管理多组 API 和模型入口，保存生成记录与任务 ID，支持失败重试和取回结果，让等待与异常处理进入可追踪的流程</p></article>
        <article><h4>把连续创作留在本机</h4><p>项目自动保存、素材本地缓存、工作流导入导出与恢复快照相互配合，围绕关闭重开和跨设备迁移整理交付方案</p></article>
      </div>
      <p className="development-credit">基于 MIT 协议的 <a href="https://github.com/sjolt-ai/open-canvas-tv" target="_blank" rel="noreferrer">Open Canvas <ArrowUpRight size={12}/></a> 二次开发，围绕个人 AIGC 工作流进行桌面化、功能整合与体验迭代，保留上游许可与署名</p>
    </section>

    <section className="development-product" aria-labelledby="studio-case-title">
      <div className="development-product-heading"><span>02 / AXUAN IMAGE STUDIO</span><small>v1.8.0 · 图片与视频处理</small></div>
      <h3 id="studio-case-title">阿轩的图片工坊</h3><p className="development-product-intro">把分散的图片处理步骤，收进一套可以连续使用的工作台</p>
      <AppImage name="studio-interface" caption="图片工坊 · 格式转换工作区" detail="基于 v1.8.0 界面源码的静态预览" width="1600" height="1000"/>
      <div className="development-features">
        <article><h4>批量处理与连续交接</h4><p>支持格式转换、像素分辨率、目标大小压缩、1–32 宫格拼图与切图，处理结果可传到其他分栏继续调整，并统一管理保存位置</p></article>
        <article><h4>本地 AI 与可编辑输出</h4><p>整合本地人像抠图和 LaMa 消除，支持证件照、修图、SVG 矢量描摹及主体与背景分层 PSD，让处理结果能继续进入设计工作</p></article>
        <article><h4>视频衍生内容与架构图</h4><p>将视频片段转成 GIF 或兼容的动态照片资源包，并提供可编辑的 AI 架构图，导出 PNG、SVG、draw.io 与 JSON</p></article>
        <article><h4>用自然语言调用工具</h4><p>接入可配置模型的 Agent，支持图片和文档附件，通过明确的工具白名单执行处理任务，普通图片操作在本机完成</p></article>
      </div>
      <p className="development-credit">整合开源图像库、本地模型和媒体处理组件，重点推进工作流、交互与功能集成；动态照片的显示效果取决于接收设备和相册的兼容能力</p>
    </section>

    <section className="development-process"><p className="eyebrow">HOW I BUILD</p><h3>把需求推进到可交付的工具</h3><div className="development-process-list">{workflow.map(([title,body],i)=><article key={title}><span>0{i+1}</span><div><h4>{title}</h4><p>{body}</p></div></article>)}</div></section>

    <details className="case-disclosure development-iterations"><summary><span><strong>查看具体迭代与验证记录</strong><small>从“有这个功能”，到“操作和结果可靠”</small></span><CaretDown size={20}/></summary><div className="development-iteration-list">
      <article><span>图片工坊 / 1.5</span><h4>打通附件、接口与实际操作</h4><p>修复文字与附件不能一起发送、接口地址误填及拖入交互问题，加入连接测试和更明确的错误反馈</p></article>
      <article><span>图片工坊 / 1.6—1.7</span><h4>从图片处理扩展到创作工作台</h4><p>增加视频转 GIF 与实况资源、全局保存位置，再接入本地 AI 消除和架构图编辑，逐步串联处理流程</p></article>
      <article><span>图片工坊 / 1.8</span><h4>把质量落实到具体细节</h4><p>修正画布拉伸导致的画笔偏移，补充智能框选消除、单图直接保存、SVG 描摹和 PSD 分层；版本记录包含 34 项自动化测试，覆盖图层读取、模型推理及媒体输出等内容</p></article>
      <article><span>阿轩画布 / 0.8.3</span><h4>补齐交互、保存与桌面交付</h4><p>统一菜单、工具栏与弹窗交互，支持减少动态效果；交付记录包括类型检查、生产构建、Windows 安装包与隔离启动自检，保留后续 macOS 迁移配置</p></article>
    </div><p className="development-credit">以上依据软件包中的源码、版本说明与交付记录整理</p></details>

    <div className="development-outcome"><p className="eyebrow">WHAT THIS BRINGS TO MY WORK</p><h3>发现问题、定义工具、推动落地</h3><p>这段实践让我的创作能力延伸到工具建设：理解制作中的具体需求，组织功能和交互，用清晰反馈推动修正，再用实际输出检查结果，将个人经验沉淀成可以重复使用的工作方法</p></div>
  </article>;
}
