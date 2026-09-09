import React from 'react';
import { ArrowUpRight, CaretDown, MagnifyingGlassPlus } from '@phosphor-icons/react';
import './training-experience.css';

const media = name => `/media/training/${name}.webp`;

export const trainingExperienceProject = {
  id: '09',
  kind: 'training-experience',
  title: '管理经验及培训经验',
  category: '四川财经学院 / 驻校培养 × 商业实训 × 团队管理',
  image: 'training/teaching-composition.webp',
  name: '管理经验及培训经验',
  summary: '带领 20 位零经验大学生并行推进 3 部商业漫剧，兼顾驻校授课、项目团队管理与甲方对接，并担任《血染凤印》总导演',
};

const courseGroups = [
  {
    title: '视觉资产与考据', subtitle: '先理解角色与世界，再建立视觉资产',
    topics: [
      ['服化道资产考据', '学习从历史与文化背景理解服装、化妆和道具，让视觉设计与故事所处的环境相符'],
      ['角色设计与三视图', '介绍人物外貌、妆容、体型、表情与多视角设定，培养人物辨识度、真实感和一致性的判断能力'],
      ['场景设计', '从环境概念、空间层次到镜头中的场景关系，理解场景如何承载叙事与情绪'],
      ['道具设计', '围绕角色身份与剧情功能认识道具，关注材质、比例及其与人物、场景的关系'],
    ],
  },
  {
    title: '镜头语言与视听表达', subtitle: '让每个镜头承担明确的叙事作用',
    topics: [
      ['摄影构图与镜头控制', '覆盖 16 种摄影构图、景别和机位选择，学习组织视觉重心，并用提示词表达镜头意图'],
      ['焦段、镜头类型与光圈', '认识焦段、镜头类型、透视和景深之间的关系，理解它们如何改变观众与人物的距离感'],
      ['运镜、正反打与焦点转移', '介绍基础运镜、对话正反打、视线与空间连续性，让运动和焦点变化服务剧情'],
      ['表情控制、光线与影调', '从微表情、色调、快门、光线和影调认识画面质感，学习用视觉风格传递情绪'],
      ['转场与蒙太奇', '讲解镜头衔接、动作与声音转场及不同蒙太奇的叙事作用，形成连贯的视听节奏'],
    ],
  },
  {
    title: 'AI 制作与项目交付', subtitle: '把创作意图落实到可检查的制作过程',
    topics: [
      ['动态影像与视频风格', '比较静态画面与动态镜头的表达差异，认识动作、时序和画面风格对 AI 视频的影响'],
      ['AI 工作流与分镜编排', '了解剧本、分镜、资产和镜头制作之间的衔接，建立按项目组织素材与进度的意识'],
      ['AI 提示词', '介绍手写与 AI 辅助提示词的应用边界，练习清楚描述主体、场景和镜头目标，并判断生成是否符合意图'],
      ['导演图到 Seedance 视频', '理解导演图、故事版确认与视频生成的关系，认识从镜头预演进入动态制作的协作方式'],
      ['常见生成问题与质量判断', '围绕人物与场景一致性、主体表达、动态效果和生成质量，训练发现问题与复核结果的能力'],
      ['AI 短剧全流程 SOP', '介绍项目定位、剧本分析、画风、资产、分镜、视频、内审剪辑、甲方审核、成本与备份交接，并覆盖花絮沉淀和预告片制作'],
    ],
  },
  {
    title: '内容创作与案例复盘', subtitle: '从观众体验出发，理解内容为何成立',
    topics: [
      ['爆款内容创作', '从受众需求、情绪、开场吸引力、叙事节奏和观看期待分析传播潜力，培养内容判断与复盘意识'],
      ['原创角色与观众共情', '讨论角色出场、人物动机和情感表达，理解如何让观众愿意关心角色并继续观看'],
      ['历史考据与复现', '以成都文旅与春柳社相关实践为例，介绍资料研究、人物与场景复原，以及史实与创作推演的区分'],
      ['广告与叙事宣传片', '通过品牌宣传片分析文案、画面证据、镜头尺度和节奏之间的关系，理解商业叙事的表达方式'],
      ['蒙医药宣传片项目复盘', '从实际承制案例认识需求沟通、专业素材确认、视听验证、修改反馈与终审交付之间的关系'],
    ],
  },
  {
    title: '行业认知与团队经营', subtitle: '把技术能力放进真实的行业与组织环境',
    topics: [
      ['AIGC 影视行业现状与发展策略', '介绍模型演进、平台变化、内容供需和行业参与者的差异，训练信息辨别与发展方向判断'],
      ['监管与平台', '认识生成内容标识、备案、授权及平台要求，让学生了解商业制作需要承担的责任'],
      ['生产与经营', '讨论人员分工、成本、返工、交付与经营的关系，理解模型能力如何转化为可持续的项目能力'],
      ['团队发展、运营及架构', '介绍商务协作、媒体账号运营、前中后台分工和企业沟通工具，建立团队运作的整体认识'],
    ],
  },
];

const productions = [
  { name: '少帅，你夫人飒爆了', role: '带队培养与项目交付', href: 'https://novelquickapp.com/s/b7lkZWEbZIQ/' },
  { name: '血染凤印', role: '总导演 / 带队制作与交付', href: 'https://novelquickapp.com/s/6d-3eDFQT98/' },
  { name: '老祖宗她风华绝代', role: '带队培养与项目交付', href: 'https://novelquickapp.com/s/i9L05FVr_Xo/' },
];

function Photo({ name, label, caption, className = '' }) {
  const portrait = name === 'director-at-work' || name === 'production-monitor';
  return <figure className={`training-photo ${className}`}>
    <a href={media(name)} target="_blank" rel="noreferrer" aria-label={`放大查看${label}`}>
      <img src={media(name)} alt={label} width={portrait ? 1086 : 1448} height={portrait ? 1448 : 1086} loading="lazy" decoding="async"/>
      <span className="training-photo-zoom"><MagnifyingGlassPlus size={18}/> 放大查看</span>
    </a>
    <figcaption><strong>{label}</strong>{caption && <span>{caption}</span>}</figcaption>
  </figure>;
}

export function TrainingExperienceDetail() {
  return <article className="training-case">
    <header className="training-head">
      <p className="eyebrow">PEOPLE & PRODUCTION / 09</p>
      <h2>管理经验及培训经验</h2>
      <p className="training-lead">在四川财经学院驻校培养大学生，以真实商业订单带领零经验学生进入 AIGC 制作，同时管理另一支项目团队、对接甲方，让教学与商业交付同步推进</p>
      <div className="training-keywords"><span>驻校培养</span><span>双团队统筹</span><span>总导演</span><span>商业项目交付</span></div>
    </header>

    <div className="training-opening">
      <Photo name="teaching-composition" label="驻校授课现场" caption="摄影构图与镜头语言教学"/>
      <div className="training-opening-copy"><span className="eyebrow">LEARNING THROUGH PRODUCTION</span><h3>从零经验，<br/>到完成商业交付</h3><p>学生的学习直接进入商业订单，在真实项目中积累制作经验，我同时承担授课、带教、团队统筹与甲方沟通，让学习进度与交付目标保持一致</p><div className="training-role-lines"><span>教学端 <b>课程讲解与制作指导</b></span><span>项目端 <b>学生团队与项目团队并行管理</b></span><span>合作端 <b>甲方对接与成果交付</b></span></div></div>
    </div>

    <dl className="training-metrics dialog-jump-target" id="training-results" tabIndex={-1} aria-label="培养与交付成果">
      <div><dt><strong>20</strong><span>位</span></dt><dd>零经验大学生带队培养</dd></div>
      <div><dt><strong>03</strong><span>部</span></dt><dd>商业漫剧并行推进与交付</dd></div>
      <div><dt><strong>15</strong><span>天</span></dt><dd>《血染凤印》视频生成与粗剪</dd></div>
    </dl>

    <section className="training-section" aria-labelledby="training-delivery-heading">
      <div className="training-section-head"><span className="eyebrow">COMMERCIAL DELIVERY</span><h3 id="training-delivery-heading">20 位学生，三个项目同时推进</h3></div>
      <p className="training-description">带领 20 位大学生并行参与以下三部商业漫剧，以订单培养制作能力并完成成果交付，作品均已上线红果</p>
      <div className="training-productions">{productions.map((project, index) => <a href={project.href} target="_blank" rel="noreferrer" key={project.name}><span className="production-index">0{index + 1}</span><h4>《{project.name}》</h4><p>{project.role}</p><span className="production-link">红果观看 <ArrowUpRight size={17}/></span></a>)}</div>
      <aside className="training-director"><span className="eyebrow">《血染凤印》 / 总导演</span><h4>15 天，完成视频生成与粗剪</h4><p>在当时尚无成熟 Codex 工作流、也没有自动生成工作流的条件下，我担任《血染凤印》总导演，带队在 15 天内完成该项目的视频生成与粗剪工作</p></aside>
      <Photo name="classroom-team" label="学生团队学习与项目讨论" caption="商业实训中的集体学习现场"/>
    </section>

    <section className="training-section dialog-jump-target" id="training-curriculum" tabIndex={-1} aria-labelledby="training-curriculum-heading">
      <div className="training-section-head"><span className="eyebrow">TEACHING SCOPE</span><h3 id="training-curriculum-heading">从视觉基础，到行业与团队认知</h3></div>
      <p className="training-description">授课内容围绕《AI 反思录》持续整理，以下按课件主题介绍教学范围与学习目标</p>
      <div className="training-curriculum">{courseGroups.map((group, index) => <details key={group.title} open={index === 0 ? true : undefined}><summary><span className="curriculum-index">0{index + 1}</span><span><strong>{group.title}</strong><small>{group.subtitle}</small></span><CaretDown size={19}/></summary><div className="curriculum-topics">{group.topics.map(([title, text]) => <div key={title}><h4>{title}</h4><p>{text}</p></div>)}</div></details>)}</div>
      <Photo name="teaching-analysis" label="构图案例讲解" caption="结合画面分析，帮助学生理解视觉与叙事的关系"/>
    </section>

    <section className="training-section" aria-labelledby="training-growth-heading">
      <div className="training-section-head"><span className="eyebrow">PEOPLE WHO KEEP CREATING</span><h3 id="training-growth-heading">从带着做，到能够独立接棒</h3></div>
      <div className="training-growth"><article><span>带教延续</span><h4>《我的出马仙是狼族三太子》</h4><p>完成徒弟们这一项目的起头工作，帮助项目进入制作，徒弟们随后成功出师，继续推进自己的创作</p><a href="https://novelquickapp.com/s/Qu_TZEd3XqQ/" target="_blank" rel="noreferrer">南泽文化 AI 剧场 · 查看作品 <ArrowUpRight size={16}/></a></article><article><span>组织建设</span><h4>赴河北石家庄，参与分公司起步搭建</h4><p>在教学与项目实践之后，赴河北石家庄参与新公司分支的起步搭建，将一线带教与制作协作经验带入新的团队建设</p></article></div>
      <div className="training-photo-pair"><Photo name="director-at-work" label="工作现场记录"/><Photo name="production-monitor" label="镜头中的创作现场"/></div>
    </section>
  </article>;
}
