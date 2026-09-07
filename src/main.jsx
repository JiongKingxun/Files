import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, ArrowDown, ArrowRight, X, List, FilmStrip, Cube, PencilRuler, UsersThree, PlayCircle, Sparkle } from '@phosphor-icons/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { IconMotion } from './generated/home-motion-v2/developer/react/IconMotion.js';
import { Portrait } from './Portrait.jsx';
import { AboutPortrait } from './AboutPortrait.jsx';
import { videoProjects } from './video-projects.js';
import { modelResearchProject, ModelResearchDetail } from './ModelResearch.jsx';
import { projectCovers } from './project-covers.js';
import { ContactSection } from './ContactSection.jsx';
import { CreativeTools } from './CreativeTools.jsx';
import '@fontsource/manrope/latin-400.css';
import '@fontsource/manrope/latin-500.css';
import '@fontsource/manrope/latin-600.css';
import '@fontsource/manrope/latin-700.css';
import './styles.css';
import './portrait.css';
import './anime.css';
import './project-covers.css';
import './sections.css';
import './portrait-sections.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const asset = name => `/media/${name.includes('.') ? name : `${name}.webp`}`;

const projects = [
  {
    id: '01', featured: true, title: '把一段话剧史，重新带回镜头',
    category: '成都文旅 / AIGC 历史影像复原', image: 'chengdu-camellias-poster.jpg', video: 'chengdu-camellias.mp4', duration:'04:52', summary:'以 AI 影像复原《茶花女》片段，让曾孝谷与李叔同的历史重新进入镜头',
    name: '曾孝谷 × 李叔同 ·《茶花女》片段复原',
    intro: '以 1907 年春柳社义演《茶花女》第三幕为历史起点，复原茶花女与亚猛之父正面交锋的戏剧片段，并将人物表演、时代氛围和成都本地文化线索组织成完整的文旅叙事',
    scope: '《茶花女》片段复原 · AIGC 影像 · 完整展示 4′52″',
    note: '个人职责：《茶花女》片段的 AIGC 影像复原，完整影片还包含曾孝谷、李叔同与春柳社的历史及文旅介绍',
    facts: [
      ['1873', '曾孝谷生于成都，后来赴日本学习西洋画，是中国早期话剧运动的先驱之一'],
      ['1906', '曾孝谷与李叔同等留日学生在东京组织春柳社，探索以对白和动作推进的新剧形式'],
      ['1907 / 02 / 11', '春柳社为国内水灾举行义演，公开演出《茶花女》第三幕，李叔同饰茶花女，曾孝谷饰亚猛之父'],
      ['片段焦点', '亚猛之父以家族名誉相逼，要求茶花女离开亚猛，复原片段围绕尊严、爱情与牺牲展开'],
      ['1907 / 06', '曾孝谷随后改编《黑奴吁天录》，春柳社在东京公演，成为中国早期话剧史的重要节点'],
    ],
    references: [
      ['巴蜀全书 · 曾孝谷', 'https://ahcm365.com/html/mingxianjinxiandai13031378566587.html'],
      ['光明日报 ·《茶花女》的中国艺坛往事', 'https://news.gmw.cn/2023-07/28/content_36727709.htm'],
    ],
  },
  ...videoProjects,
  modelResearchProject,
];

const projectTotal = String(projects.length).padStart(2, '0');
const creativityProjects = projects.filter(project => !project.video);
const filmTotal = String(projects.filter(project => project.video).length).padStart(2, '0');
const seriesEpisodes = projects.filter(project => project.series);
const filmCollection = [
  ...projects.filter(project => project.video && !project.series),
  {
    id:'05—07', name:'《高欢前传》连续影像', title:'高欢前传 · 连续三部曲',
    category:'系列作品 / 06—08 连续篇章', summary:'六人结盟、权贵设局与南门冤案，按 06、07、08 的剧情顺序连续观看',
    episodes:seriesEpisodes,
  },
];

const skillCards = [
  { n:'01', Icon:PencilRuler, title:'视觉与品牌表达', en:'VISUAL & BRAND', body:'从概念、风格到图像表达，建立统一的视觉语言，让设计回应品牌和内容的真实需求', tags:'视觉概念 / 风格探索 / 图像设计' },
  { n:'02', Icon:FilmStrip, title:'AIGC 影视全流程', en:'IDEA TO FINAL FRAME', body:'贯通编导、角色场景资产、导演图、AI 视频与后期剪辑，理解每一环节对最终成片的影响', tags:'剧本 / 图片 / 视频 / 剪辑' },
  { n:'03', Icon:Cube, title:'工程思维与交付', en:'SYSTEMS THAT DELIVER', body:'把复杂目标拆成任务与节点，用标准、文档和版本管理控制过程，让创意落在可执行的计划里', tags:'空间控制 / 项目统筹 / 标准化' },
  { n:'04', Icon:UsersThree, title:'培训与团队协作', en:'BUILD WITH PEOPLE', body:'在短剧项目中参与双团队管理，带领零基础大学生团队进入 AIGC 制作，把知识、分工与反馈组织成可执行的创作过程', tags:'双团队统筹 / 零基础带教 / 协同交付' },
];

function ProjectCard({ project:p, onSelect }) {
  const isCollection = Boolean(p.episodes);
  return <button className={`project reveal ${p.featured ? 'project-featured' : ''} ${isCollection ? 'project-series-collection' : ''} ${p.kind === 'model-research' ? 'project-model-research' : ''}`} onClick={() => onSelect(p)} aria-label={isCollection ? '打开高欢前传连续影像 06 至 08' : `${p.video ? '播放' : '查看'}${p.name}`}>
    <div className="project-image">
      <img src={asset(projectCovers[p.id] || p.image)} alt={`${p.name} · 氛围封面`} loading="lazy" decoding="async" width="1600" height="900"/>
      <span className="project-number">{p.id} / {projectTotal}</span>
      <span className="project-open">{isCollection ? <FilmStrip size={29} weight="fill"/> : p.video ? <PlayCircle size={31} weight="fill"/> : <ArrowUpRight size={27}/>}</span>
      {(p.video || isCollection) && <span className="video-duration">{isCollection ? '03 EPISODES' : p.duration}</span>}
    </div>
    <div className="project-meta"><div><p>{p.category}</p><h3>{p.title}</h3></div><span>{isCollection ? '进入系列' : p.video ? '播放影片' : '查看案例'} <ArrowUpRight size={17}/></span></div>
    {p.summary && <p className="project-summary">{p.summary}</p>}
  </button>;
}

function SeriesDetail({ episodes, activeIndex, onChange }) {
  const current = episodes[activeIndex];
  return <>
    <div className="series-detail-head">
      <p className="eyebrow">SERIES COLLECTION / 05—07</p>
      <div><h2>《高欢前传》连续影像</h2><p>以小说《敕勒川悲歌》第一季修改版为剧本，三支影片沿 06、07、08 的剧情顺序连续展开，均由我制作</p></div>
    </div>
    <div className="series-viewer-layout">
      <aside className="series-rail" aria-label="高欢前传剧集栏">
        <div className="series-rail-header"><span>EPISODE LIST</span><strong>{String(activeIndex + 1).padStart(2,'0')} / 03</strong></div>
        {episodes.map((episode,index) => <button className={index === activeIndex ? 'is-active' : ''} key={episode.id} onClick={() => onChange(index)} aria-current={index === activeIndex ? 'true' : undefined}>
          <span className="series-thumb"><img src={asset(episode.image)} alt=""/><i>{index + 1}</i></span>
          <span className="series-episode-copy"><small>{episode.episode}</small><strong>{episode.name.replace('《高欢前传》','')}</strong><em>{episode.duration}</em></span>
        </button>)}
        <p className="series-rail-note">按编号连续观看<br/>点击剧集即可切换</p>
      </aside>
      <div className="series-active" key={current.video}>
        <figure className="video-figure"><video className="project-player" src={asset(current.video)} poster={asset(current.image)} controls playsInline preload="metadata"/><figcaption><span><PlayCircle size={18} weight="fill"/></span>{current.playbackCaption}</figcaption></figure>
        <div className="series-active-copy"><div className="dialog-series"><span>{current.series}</span><strong>{current.seriesIndex} · {current.episode}</strong></div><h3>{current.name}</h3><p className="dialog-intro">{current.intro}</p><p className="dialog-scope">{current.scope}</p><p className="source-note">{current.note}</p></div>
        <section className="project-research"><div className="research-heading"><Sparkle size={23}/><div><span>{current.researchLabel}</span><h3>{current.researchTitle}</h3></div></div><div className="fact-list">{current.facts.map(([label,text]) => <article key={label}><strong>{label}</strong><p>{text}</p></article>)}</div></section>
      </div>
    </div>
  </>;
}

function App(){
  const [menu,setMenu] = useState(false);
  const [selected,setSelected] = useState(null);
  const [seriesEpisode,setSeriesEpisode] = useState(0);
  const [activeSection,setActiveSection] = useState('home');
  const [scrolled,setScrolled] = useState(false);
  const app = useRef(null), hero = useRef(null), character = useRef(null), dialog = useRef(null), homeMotion = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add({ desktop:'(min-width: 901px)', reduceMotion:'(prefers-reduced-motion: reduce)' }, context => {
      const { desktop, reduceMotion } = context.conditions;
      if (reduceMotion) return;
      const intro = gsap.timeline({ defaults:{ ease:'power3.out' } });
      intro.from('.hero-kicker', { autoAlpha:0, y:16, duration:.55 })
        .from('.hero-title-line', { autoAlpha:0, yPercent:38, duration:.88, stagger:.1 }, '<.08')
        .from('.hero-summary', { autoAlpha:0, y:22, duration:.68 }, '<.32')
        .from('.hero-actions', { autoAlpha:0, y:18, duration:.58 }, '<.16')
        .from('.hero-portrait-stage', { autoAlpha:0, duration:1.2, ease:'power2.out' }, .12)
        .from('.hero-metric', { autoAlpha:0, y:12, duration:.48, stagger:.07 }, '<.12');
      gsap.utils.toArray('.reveal').forEach(element => gsap.from(element, { opacity:0, y:desktop ? 38 : 22, duration:.85, ease:'power3.out', scrollTrigger:{ trigger:element, start:'top 91%', once:true } }));

    }, app);
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad, { once:true });
    return () => { mm.revert(); window.removeEventListener('load', onLoad); };
  }, { scope:app });


  useEffect(() => {
    const sections = [...document.querySelectorAll('main section[id]')];
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 35);
      const current = sections.filter(section => section.getBoundingClientRect().top < window.innerHeight * .4).at(-1);
      setActiveSection(current?.id || 'home');
    };
    const scroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    addEventListener('scroll', scroll, { passive:true }); update();
    return () => { removeEventListener('scroll', scroll); cancelAnimationFrame(frame); };
  }, []);

  useEffect(() => {
    let ctx;
    if (selected && dialog.current && !dialog.current.open) {
      dialog.current.showModal(); document.body.style.overflow = 'hidden';
      if (!matchMedia('(prefers-reduced-motion: reduce)').matches) ctx = gsap.context(() => gsap.fromTo('.dialog-content', { opacity:0, y:20 }, { opacity:1, y:0, duration:.4, ease:'power3.out' }), dialog);
    } else if (!selected) document.body.style.overflow = '';
    return () => { ctx?.revert(); document.body.style.overflow = ''; };
  }, [selected]);

  const close = () => { if (dialog.current?.open) dialog.current.close(); setSelected(null); };
  const activateNav = id => { setMenu(false); if (id === 'home') homeMotion.current?.restart(); };
  const openProject = project => { if (project.episodes) setSeriesEpisode(0); setSelected(project); };

  return <div ref={app}>
    <a className="skip" href="#about">跳转到个人介绍</a>
    <header className={`header ${scrolled ? 'is-scrolled' : ''}`}><div className="nav-wrap wrap">
      <a className="logo name-logo" href="#home" aria-label="钟启轩 首页" onClick={() => homeMotion.current?.restart()}>钟启轩<span className="logo-mark" aria-hidden="true"/></a>
      <nav id="main-navigation" className={menu ? 'nav open' : 'nav'} aria-label="主导航">{[['home','首页'],['about','关于我'],['expertise','个人优势'],['work','精选作品'],['creativity','个人突出创意及经历']].map(([id,label],i) => <a key={id} href={`#${id}`} aria-current={activeSection === id ? 'location' : undefined} onClick={() => activateNav(id)}>{id === 'home' ? <IconMotion ref={homeMotion} className="home-icon-motion" accent="#e1d9ff" light="#f3f0ff" foreground="#f0eff8" background="#0b0e0c" muted="#a7a4b1" bar="#101111" label="首页" autoplay={false} loop={false} presentation="inline" aria-hidden="true"/> : <span className="nav-index" aria-hidden="true">0{i+1}</span>}{label}</a>)}</nav>
      <a className="nav-contact" href="#contact">聊聊合作 <ArrowUpRight size={17}/></a>
      <button className="menu-button" aria-label={menu ? '关闭导航' : '打开导航'} aria-expanded={menu} aria-controls="main-navigation" onClick={() => setMenu(!menu)}>{menu ? <X size={24}/> : <List size={24}/>}</button>
    </div></header>

    <main>
      <section className="hero portrait-hero" id="home" ref={hero}>
        <div className="hero-portrait-stage" ref={character}><Portrait/></div><div className="hero-cinematic-shade" aria-hidden="true"/>
        <div className="hero-layout wrap">
          <div className="hero-copy-panel">
            <div className="eyebrow hero-kicker"><span className="status-dot"/> VISUAL DESIGN · AI FILM · CHENGDU</div>
            <h1 className="hero-title" aria-label="我把想象推进到成片"><span className="hero-title-line">我把想象</span><span className="hero-title-line hero-title-accent">推进到成片</span></h1>
            <p className="hero-summary">钟启轩 / AXUAN<br/>视觉设计、AIGC 影视全流程、项目统筹与团队培训</p>
            <div className="hero-actions"><a className="primary-button" href="#work">查看作品 <ArrowDown size={19}/></a><a className="text-button" href="#about">认识我 <ArrowRight size={18}/></a></div>
            <div className="hero-metrics"><div className="hero-metric"><strong>04+</strong><span>年项目经验</span></div><div className="hero-metric"><strong>08</strong><span>个 AIGC 生产环节</span></div><div className="hero-metric"><strong>10+</strong><span>团队管理规模</span></div></div>
          </div>
        </div>
        <div className="hero-bottom wrap"><div className="hero-roles">视觉设计 <i/> 品牌设计 <i/> AI 影视 <i/> 培训与团队</div><a href="#about" className="scroll-hint">SCROLL TO EXPLORE <ArrowDown size={15}/></a></div>
      </section>

      <section className="section about wrap" id="about">
        <div className="section-label reveal"><span>01 / ABOUT ME</span><span>有想象力，也有执行力</span></div>
        <div className="about-grid reveal"><AboutPortrait/><div className="about-copy"><div className="eyebrow muted">DESIGNER / CREATOR / TEAM BUILDER</div><h2>感性的创作<br/><span className="dim">理性的落地</span></h2><p>我关注视觉与品牌表达，也探索 AI 如何参与真实的影视生产，从校园内容创作、工程项目管理，到 AIGC 影视实践，我习惯把想法拆解成清晰的任务，再一步步完成交付</p><p>从 Flow / Veo 2、Sora 2 到持续迭代的视频模型，我一路积累生成、分镜与后期经验，也在项目中参与双团队管理，带领零基础大学生团队进入 AIGC 制作</p><p className="early-practice">作为国内较早投入 Codex 与智能体工作流实践的创作者，我把工具用于任务拆解、资料整理与流程自动化，再将经验沉淀为教学材料与团队方法</p><div className="about-contacts"><a href="mailto:Axuanxxx@foxmail.com">Axuanxxx@foxmail.com <ArrowUpRight size={17}/></a><a href="tel:17348060633">173 4806 0633 <ArrowUpRight size={17}/></a></div></div></div>
        <section className="expertise about-expertise" id="expertise" aria-labelledby="expertise-title"><div className="section-label reveal"><span>WHAT I BRING</span><span>个人优势</span></div><div className="section-heading reveal"><h2 id="expertise-title">创意之外，<br/><span className="dim">让项目向前</span></h2><p>既能参与具体的视觉制作，<br/>也能统筹流程，与团队一起完成交付</p></div><div className="skills">{skillCards.map(({n,Icon,title,en,body,tags}) => <article className="skill reveal" key={n}><div className="skill-top"><Icon size={34} weight="light"/><span>{n}</span></div><p className="skill-en">{en}</p><h3>{title}</h3><p className="skill-body">{body}</p><div className="skill-tags">{tags}</div></article>)}</div><CreativeTools/></section>
        <div className="experience reveal"><div className="experience-art" aria-hidden="true"><img src="/media/axuan-experience-director-v4.webp" alt="" loading="lazy" decoding="async"/></div><div className="experience-title">经历的每一步，<br/>都成为创作的一部分<span>THE PATH SO FAR</span></div><div className="timeline"><article><time>2025 — 至今</time><div><h3>AIGC 影视创作与流程实践</h3><p>经历 Flow / Veo 2、Sora 2 等模型阶段，探索九宫格分镜与 Codex 智能体工作流；参与《深宫劫之奸妃当道》双团队管理并制作 AI 花絮，并担任执行导演，项目已上线红果平台</p></div><span className="current-dot"/></article><article><time>2022 / 05 — 2025 / 07</time><div><h3>四川华西 · 安装工程师</h3><p>四川省第四建筑有限公司，参与武侯区亚中医疗项目，负责多专业协同、团队管理、甲方沟通与验收交付</p></div></article><article><time>2019 — 2022</time><div><h3>校园组织与内容创作</h3><p>四川建筑职业技术学院；社团联合会办公室副主任、易班工作站创产负责人，开展视频剪辑、组织运营与跨部门协作</p></div></article></div></div>
      </section>

      <section className="section works" id="work"><div className="wrap">
        <div className="section-label reveal"><span>02 / SELECTED WORK</span><span>视觉 × 技术 × 叙事</span></div>
        <div className="section-heading reveal"><h2>让想象，<br/><span className="dim">被看见</span></h2><p>历史复原、连续叙事、团队项目与早期影像实验<br/>从具体作品，看见创作方法的积累</p></div>
        <div className="work-category-heading reveal"><span>FILM COLLECTION</span><h3>影像作品 <small>{filmTotal} FILMS</small></h3></div>
        <div className="projects film-projects">{filmCollection.map(project => <ProjectCard key={project.id} project={project} onSelect={openProject}/>)}</div>
      </div></section>

      <section className="section creativity wrap" id="creativity" aria-labelledby="creativity-title">
        <div className="section-label reveal"><span>03 / IDEAS & EXPERIENCE</span><span>从实践中形成自己的方法</span></div>
        <div className="section-heading reveal"><h2 id="creativity-title" aria-label="个人突出创意及经历">个人突出创意<br/><span className="dim">及经历</span></h2><p>从历史考据到 Blender 建模复原<br/>用真实项目，记录创意的形成与落地</p></div>
        <div className="projects design-projects creativity-projects">{creativityProjects.map(project => <ProjectCard key={project.id} project={project} onSelect={openProject}/>)}</div>
      </section>

      <ContactSection onHome={() => homeMotion.current?.restart()}/>
    </main>

    <dialog ref={dialog} aria-label={selected?.name || '项目详情'} className={`project-dialog ${selected?.episodes ? 'series-dialog' : ''} ${selected?.kind === 'model-research' ? 'modeling-dialog' : ''}`} onCancel={event => { event.preventDefault(); close(); }} onClick={event => { if (event.target === event.currentTarget) close(); }}>
      {selected && <>
        <button className="dialog-close" onClick={close} aria-label="关闭项目详情" autoFocus><X size={24}/></button>
        <div className="dialog-content">
          {selected.episodes ? <SeriesDetail episodes={selected.episodes} activeIndex={seriesEpisode} onChange={setSeriesEpisode}/> : selected.kind === 'model-research' ? <ModelResearchDetail/> : <>
            <p className="eyebrow">SELECTED WORK / {selected.id}</p><h2>{selected.name}</h2><p className="dialog-intro">{selected.intro}</p><p className="dialog-scope">{selected.scope}</p><p className="source-note">{selected.note}</p>
            {selected.video && <figure className="video-figure"><video className="project-player" src={asset(selected.video)} poster={asset(selected.image)} controls playsInline preload="metadata"/><figcaption><span><PlayCircle size={18} weight="fill"/></span>{selected.playbackCaption || '完整成片 · 建议开启声音观看'}</figcaption></figure>}
            {selected.facts && <section className="project-research"><div className="research-heading"><Sparkle size={23}/><div><span>{selected.researchLabel || 'HISTORICAL CONTEXT'}</span><h3>{selected.researchTitle || '这段复原背后的历史'}</h3></div></div><div className="fact-list">{selected.facts.map(([year,text]) => <article key={year}><strong>{year}</strong><p>{text}</p></article>)}</div><div className="research-links">{selected.references?.length > 0 && <span>资料来源</span>}{selected.references?.map(([label,url]) => <a key={url} href={url} target="_blank" rel="noreferrer">{label}<ArrowUpRight size={14}/></a>)}</div></section>}
            {selected.images?.map((im,i) => <figure key={im}><img src={asset(im)} alt={selected.captions[i]} loading="lazy"/><figcaption><span>0{i+1}</span>{selected.captions[i]}</figcaption></figure>)}
            {selected.steps && <ol className="workflow">{selected.steps.map(step => <li key={step}>{step}</li>)}</ol>}
          </>}
          <button className="close-bottom" onClick={close}>返回作品集 <ArrowRight size={19}/></button>
        </div>
      </>}
    </dialog>
  </div>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
