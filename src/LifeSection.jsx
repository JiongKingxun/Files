import React, { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, CaretDown, CaretUp } from '@phosphor-icons/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const photos = [
  { file:'city-walk', title:'在街头，收集新的颜色', caption:'城市漫步与日常片段', width:1200, height:1600 },
  { file:'railway', title:'走近旧时光', caption:'旅途中的铁路记忆', width:1200, height:1600 },
  { file:'old-street', title:'慢一点，看一看', caption:'老街与建筑的细节', width:1200, height:1600 },
  { file:'stadium', title:'在不同的城市走走', caption:'北京 · 鸟巢', width:1600, height:1200 },
  { file:'temple', title:'留意空间，也留意光', caption:'北京 · 天坛', width:1200, height:1600 },
  { file:'playful-day', title:'保留一点好奇心', caption:'轻松、有趣的出游片段', width:1600, height:1200 },
  { file:'seaside', title:'把时间留给生活', caption:'海边散步', width:1200, height:1600 },
  { file:'football', title:'也会为一场球认真热血', caption:'看台上的足球时刻', width:1200, height:1600 },
];

const dimensions = [['Ti','内倾思考',34.6],['Ni','内倾直觉',33.2],['Ne','外倾直觉',32.1],['Te','外倾思考',31.9],['Se','外倾感觉',28.4],['Si','内倾感觉',28.0],['Fi','内倾情感',26.7],['Fe','外倾情感',25.2]];

function LifeAlbum() {
  const [index,setIndex] = useState(0);
  const photo=photos[index];
  const change = step => setIndex(current=>(current+step+photos.length)%photos.length);
  return <div className="life-album" role="region" aria-label="生活相册">
    <figure className="life-album-photo">
      <a href={`/media/life/${photo.file}.webp`} target="_blank" rel="noreferrer" aria-label={`放大查看：${photo.title}`}>
        <img key={photo.file} src={`/media/life/${photo.file}.webp`} srcSet={`/media/life/${photo.file}-small.webp ${Math.round(photo.width*720/1600)}w, /media/life/${photo.file}.webp ${photo.width}w`} sizes="(max-width: 640px) calc(100vw - 48px), (max-width: 1000px) 55vw, 600px" width={photo.width} height={photo.height} alt={`${photo.title} · 钟启轩生活照`} decoding="async"/>
      </a>
    </figure>
    <div className="life-album-copy">
      <p className="life-kicker">LIFE, IN A FEW FRAMES</p>
      <h3>工作之外的一面</h3>
      <p>音乐、球场、旅行和日常观察<br/>让想象一直有新的来处</p>
      <div className="life-photo-caption" aria-live="polite" aria-atomic="true"><span>{String(index+1).padStart(2,'0')} / {String(photos.length).padStart(2,'0')}</span><h4>{photo.title}</h4><p>{photo.caption}</p></div>
      <div className="life-album-controls"><button type="button" onClick={()=>change(-1)} aria-label="上一张生活照"><ArrowLeft size={20}/></button><button type="button" onClick={()=>change(1)} aria-label="下一张生活照"><ArrowRight size={20}/></button><span>手动翻阅 · 点击照片可放大</span></div>
    </div>
  </div>;
}

export function LifeSection() {
  const [expanded,setExpanded] = useState(false);
  const disclosure=useRef(null);
  const collapse=()=>{
    disclosure.current.open=false;
    disclosure.current.querySelector('summary').focus({preventScroll:true});
    document.getElementById('life').scrollIntoView({block:'start',behavior:'instant'});
  };
  return <section id="life" className="life-section wrap" aria-labelledby="life-title">
    <details className="life-disclosure" ref={disclosure} onToggle={event=>{setExpanded(event.currentTarget.open);requestAnimationFrame(()=>{ScrollTrigger.refresh();window.dispatchEvent(new Event('scroll'));});}}>
      <summary className="life-summary"><span className="life-summary-copy"><span className="life-kicker">06 / BEYOND WORK</span><h2 id="life-title">关于生活中的我</h2><span className="life-summary-note">兴趣、校园经历与合作方式 · {expanded?'点击收起':'点击展开'}</span></span><CaretDown className="life-disclosure-chevron" size={21} aria-hidden="true"/></summary>
      {expanded && <div className="life-content">
        <div className="life-intro"><h3>有好奇心，也在乎一起完成</h3><p>从音乐、足球到校园内容创作，我喜欢发现新东西，也享受和别人一起把事情做好，这些工作之外的积累，慢慢长成了今天的创作与协作习惯</p></div>
        <div className="life-interests" aria-label="我的兴趣"><p><strong>音乐与指弹</strong>吉他、尤克里里，也接触贝斯与卡林巴琴，在练习与合奏中感受节奏和表达</p><p><strong>足球与团队</strong>踢过中锋、边后卫，也一直关注国足，喜欢比赛里的判断、补位与默契</p><p><strong>影像与出行</strong>学生时代就做 PR 剪辑与后期，喜欢在城市和旅途中积累构图、空间与叙事灵感</p></div>

        <div className="life-campus life-block">
          <div className="life-block-heading"><span className="life-kicker">CAMPUS / 2019—2022</span><h3>在校园，把兴趣变成协作</h3><p>四川建筑职业技术学院 · 建筑设备工程技术</p></div>
          <div className="life-campus-roles"><article><h4>社团联合会 · 办公室副主任</h4><p>参与校级社团组建与运营，制定计划、整理数据，协调部门与跨校交流</p></article><article><h4>易班工作站 · 创产负责人</h4><p>负责视频剪辑与后期特效，策划轻量产品和应用，组织成员分工与实施</p></article><article><h4>尤克里里社团 · 副会长</h4><p>参与音乐制作与演奏，维护推广渠道，承担部分美术设计，让创作与运营相互配合</p></article></div>
          <div className="life-campus-activities"><h4>参加过的活动</h4><p>社团文化节、建筑文化节、校运会、英语写作比赛，以及成都国际美食节志愿服务、敬老爱老、艾滋病防治与食品安全主题活动</p><p className="life-campus-honors">曾获优秀团干部、社团文化节活动积极分子、校运会优秀实习干事等表彰</p></div>
        </div>

        <div className="life-personality life-block">
          <div className="life-block-heading"><span className="life-kicker">ENTP / HOW I THINK & WORK</span><h3>好奇、机敏，在交流中打开新思路</h3><p>我的性格是 ENTP，喜欢追问、联想和开放讨论，敢于尝试不同办法，再用逻辑筛选可行方向，也愿意用轻松的表达让协作更顺畅（同性格人物参考：狐尼克、五条悟、奥德修斯、孙悟空、达芬奇）</p></div>
          <div className="life-work-traits"><article><span>创意</span><h4>把不同领域连起来</h4><p>把音乐的节奏、工程的空间感与影像叙事联系起来，在 AIGC 中先打开多种可能，再用小样验证方向</p></article><article><span>执行</span><h4>把复杂问题拆清楚</h4><p>习惯追问原理、梳理限制，把创意拆成步骤、标准与反馈节点，减少反复沟通和无效尝试</p></article><article><span>带队</span><h4>让成员理解，也能参与</h4><p>先讲清目标和原因，再给尝试与提问的空间，用具体反馈和实际支持建立信任，让大家更容易主动配合</p></article></div>
          <details className="life-dimensions"><summary>荣格八维 · 自测摘要 <CaretDown size={15} aria-hidden="true"/></summary><dl>{dimensions.map(([code,label,value])=><div key={code}><dt><strong>{code}</strong> {label}</dt><dd>{value.toFixed(1)}</dd></div>)}</dl><p>2025 年 12 月的原始维度记录，用于自我观察，实际合作方式结合项目与团队经历来看</p></details>
        </div>
        <LifeAlbum/>
        <button type="button" className="life-collapse" onClick={collapse}>收起生活篇 <CaretUp size={17}/></button>
      </div>}
    </details>
  </section>;
}
