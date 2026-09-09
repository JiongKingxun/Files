import React, { useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, CaretDown, MagnifyingGlassPlus } from '@phosphor-icons/react';
import './social-experience.css';

const media = name => `/media/social/${name}.webp`;
const imageSizes = { 'huashi-portrait':[1086,1448], 'employment-proof':[1280,1785], 'site-team':[1263,1245], 'site-inspection':[1448,1086], 'document-controller':[1501,2123], 'installation-supervisor':[1501,2123], 'safety-c3':[1501,2227], 'unicef-start':[1299,980], 'unicef-year-2':[1810,1280], 'unicef-year-3':[1737,1280], 'unicef-year-4':[1737,1280], 'unicef-year-5':[1737,1280] };

export const socialExperienceProject = {
  id: '10',
  kind: 'social-experience',
  title: '社会及工作经验 · 国企与公益',
  category: '中国华西 / 工程管理 × 团队协作 × 长期公益',
  image: 'social/site-team.webp',
  name: '社会及工作经验 · 国企与公益',
  coverAlt: '钟启轩与团队在安装工程现场检查管线',
  summary: '中国华西总公司正式员工经历，承担亚中医疗项目安装统筹与 10 人以上团队管理，附工程证书、劳动关系证明和持续 5 年的公益月捐记录',
};

const responsibilities = [
  ['整体规划与安装实施', '统筹武侯区亚中医疗项目的设备安装计划，将给排水、暖通空调、建筑电气与消防系统的任务放在同一进度安排中，协调多个部门推进实施'],
  ['团队分工与进度管理', '管理 10 人以上安装团队，制定工作计划、分配任务并监督执行，将节点、责任人和完成标准讲清楚，让现场工作有顺序、进展可跟踪'],
  ['甲方对接与技术沟通', '对接甲方、相关部门和现场团队，及时处理安装问题，统一技术要求、实施节点与验收口径，减少沟通偏差对施工进度的影响'],
  ['标准执行、调试与验收', '围绕国家标准和项目要求检查安装质量，组织设备调试、性能测试和项目验收，把安装完成推进到系统可运行、结果可验收'],
  ['工程资料与管理汇报', '建立安装记录、验收报告等关键项目文件，记录实施与检查结果，定期向管理层汇报进度、问题及处理情况，让交付过程有据可查'],
  ['应急处理与流程优化', '处理现场突发情况并制定预案，结合问题反馈持续调整安装流程与资源安排，在保证质量和安全的前提下提高协作效率'],
];

const management = [
  ['先把目标拆清楚', '从整体安装计划拆到专业任务，明确节点、责任人和完成要求'],
  ['让团队按同一标准执行', '围绕图纸、技术要求和现场条件沟通，跟进任务进度与专业衔接'],
  ['把问题及时带回协作中', '对接甲方与相关部门处理现场问题，同步风险、调整安排并向管理层汇报'],
  ['以验收和记录完成交付', '组织调试与测试，形成安装记录和验收报告，再把问题沉淀为流程改进'],
];

const certificates = [
  { name: '资料员', file: 'document-controller', type: '施工现场专业人员职业培训合格证', details: ['2024 / 04 / 19 发证', '2025 年继续教育 32 学时', '培训机构：四川华西集团有限公司'] },
  { name: '设备安装施工员', file: 'installation-supervisor', type: '施工现场专业人员职业培训合格证', details: ['2023 / 09 / 22 发证', '2024 年继续教育 32 学时', '培训机构：四川华西集团有限公司'] },
  { name: '安管人员 C3', file: 'safety-c3', type: '综合类专职安全生产管理人员考核合格证', details: ['2024 / 07 / 08 初次领证', '证面有效期至 2027 / 07 / 07', '证载企业：中国华西企业股份有限公司'] },
];

const donations = [
  { label: '2021 起点', file: 'unicef-start', title: '从大学阶段开始月捐', description: '2021 年开始支持联合国儿童基金会的儿童人道主义援助，把关心落实为持续的月捐行动' },
  { label: '2 周年', file: 'unicef-year-2', title: '月捐为救灾 · 2 周年', description: '持续支持世界各地受灾儿童，保留月捐周年感谢记录' },
  { label: '3 周年', file: 'unicef-year-3', title: '携手为儿童 · 3 周年', description: '支持受人道主义危机影响的儿童，让公益从一次行动延续为长期习惯' },
  { label: '4 周年', file: 'unicef-year-4', title: '携手为儿童 · 4 周年', description: '从在校到工作，再到职业转换，持续保留这份对儿童的支持' },
  { label: '5 周年', file: 'unicef-year-5', title: '携手为儿童 · 5 周年', description: '月捐已积累至 5 周年记录，待业期间也未停止，将长期承诺落实在每个月的行动里' },
];

function EvidenceImage({ file, label, caption, className = '' }) {
  return <figure className={`social-photo ${className}`}>
    <a href={media(file)} target="_blank" rel="noreferrer" aria-label={`放大查看${label}`}>
      <img src={media(file)} alt={label} width={imageSizes[file][0]} height={imageSizes[file][1]} loading="lazy" decoding="async"/>
      <span className="social-photo-zoom"><MagnifyingGlassPlus size={17}/> 放大查看</span>
    </a>
    <figcaption><strong>{label}</strong>{caption && <span>{caption}</span>}</figcaption>
  </figure>;
}

export function SocialExperienceDetail() {
  const [donationIndex, setDonationIndex] = useState(4);
  const donation = donations[donationIndex];

  return <article className="social-case">
    <header className="social-head">
      <p className="eyebrow">WORK & COMMUNITY / 10</p>
      <h2>社会及工作经验<span>国企与公益</span></h2>
      <p className="social-lead">在中国华西承担项目安装统筹与团队管理，把计划、标准和沟通落实到工程交付；从 2021 年开始坚持公益月捐，在不同人生阶段持续支持受人道主义危机影响的儿童</p>
    </header>

    <section className="social-employment" aria-labelledby="social-employment-title">
      <EvidenceImage file="huashi-portrait" label="中国华西工作时期" caption="本人工作纪念照"/>
      <div className="social-employment-copy">
        <time>2022 / 05 — 2025 / 07</time>
        <h3 id="social-employment-title">中国华西<br/>总公司正式员工经历</h3>
        <p className="social-employer">中国华西企业股份有限公司</p>
        <p>与总公司直接建立劳动关系，非劳务派遣，所附劳动关系证明由中国华西企业股份有限公司出具，载明本人与该公司存在真实有效的劳动关系</p>
        <dl className="social-employment-facts">
          <div><dt>项目岗位</dt><dd>安装总工程师</dd></div>
          <div><dt>履历项目单位</dt><dd>四川省第四建筑有限公司</dd></div>
          <div><dt>项目名称</dt><dd>武侯区亚中医疗项目</dd></div>
        </dl>
        <a className="social-inline-link" href="#employment-evidence" onClick={event => { event.preventDefault(); const proof=document.getElementById('employment-evidence'); if(proof){proof.open=true;proof.scrollIntoView({block:'start',behavior:'instant'});} }}>查看劳动关系证明 <ArrowDown size={17}/></a>
      </div>
    </section>

    <details className="social-proof" id="employment-evidence">
      <summary><span><strong>总公司劳动关系证明</strong><small>中国华西企业股份有限公司出具</small></span><CaretDown size={19}/></summary>
      <div className="social-proof-content"><EvidenceImage file="employment-proof" label="关于解除钟启轩劳动关系的证明" caption="身份证及联系方式沿用提供材料中的遮挡"/><p>证明载明因项目工作结束，自 2025 年 7 月起解除劳动关系，并确认本人与公司存在真实有效的劳动关系</p></div>
    </details>

    <section className="social-section social-project" aria-labelledby="social-project-title">
      <div className="social-section-heading"><p className="eyebrow">THE PROJECT</p><h3 id="social-project-title">武侯区亚中医疗项目</h3><p>围绕设备安装与多专业系统协同，承担从计划实施、人员组织到调试验收、工程资料的管理职责</p></div>
      <div className="social-systems"><span>给排水</span><span>暖通空调</span><span>建筑电气</span><span>消防系统</span></div>
      <EvidenceImage file="site-team" label="安装工程现场协同" caption="管线与设备检查现场"/>
      <div className="social-responsibilities dialog-jump-target" id="social-responsibilities" tabIndex={-1} role="region" aria-label="工程职责与团队管理">{responsibilities.map(([title,body],index)=><article key={title}><span>0{index+1}</span><div><h4>{title}</h4><p>{body}</p></div></article>)}</div>
    </section>

    <section className="social-section" aria-labelledby="social-management-title">
      <div className="social-section-heading"><p className="eyebrow">TEAM & DELIVERY</p><h3 id="social-management-title">我是怎样带团队推进工程的</h3><p>管理 10 人以上安装团队，把任务、标准、责任人与验收结果对应起来，同时协调甲方、管理层和现场人员的工作节奏</p></div>
      <ol className="social-management">{management.map(([title,body],index)=><li key={title}><span>0{index+1}</span><h4>{title}</h4><p>{body}</p>{index<3&&<ArrowRight size={19} aria-hidden="true"/>}</li>)}</ol>
      <div className="social-results" aria-label="工程履历成果">
        <div><strong>10<span>+</span></strong><p>安装团队管理规模</p></div>
        <div><strong>≈15<span>%</span></strong><p>流程优化后平均安装周期缩短</p></div>
        <div><strong>40<span>h / 周</span></strong><p>保障双休并提前完成项目的工作节奏</p></div>
      </div>
      <p className="social-results-note">以上工程成果按本人职业履历整理</p>
      <EvidenceImage file="site-inspection" label="工程现场巡查" caption="检查安装系统与现场实施情况"/>
    </section>

    <section className="social-section" aria-labelledby="social-qualifications-title">
      <div className="social-section-heading"><p className="eyebrow">PROFESSIONAL QUALIFICATIONS</p><h3 id="social-qualifications-title">资料、施工与安全的专业基础</h3><p>三项证书对应工程记录、设备安装与安全管理，公开展示版遮挡身份证等隐私信息和核验二维码，保留证书名称、岗位、机构与日期</p></div>
      <div className="social-certificates">{certificates.map(cert=><article key={cert.file}><EvidenceImage file={cert.file} label={`${cert.name}证书`}/><h4>{cert.name}</h4><p>{cert.type}</p><ul>{cert.details.map(line=><li key={line}>{line}</li>)}</ul></article>)}</div>
      <a className="social-inline-link" href="/downloads/zhong-qixuan-engineering-certificates-public.pdf" target="_blank" rel="noreferrer">查看三项证书 · 隐私遮挡版 <ArrowUpRight size={17}/></a>
    </section>

    <section className="social-section social-welfare" aria-labelledby="social-welfare-title">
      <div className="social-welfare-heading"><span className="social-welfare-years">5<span>周年月捐记录</span></span><div><p className="eyebrow">A LONG-TERM COMMITMENT</p><h3 id="social-welfare-title">从 2021 年开始，持续支持儿童公益</h3><p>作为联合国儿童基金会月捐支持者，从大学阶段开始支持受灾与受人道主义危机影响的儿童，工作之后继续坚持，待业期间也未停止</p></div></div>
      <div className="social-donation-switch" role="group" aria-label="选择公益月捐记录">{donations.map((item,index)=><button key={item.file} aria-pressed={index===donationIndex} onClick={()=>setDonationIndex(index)}>{item.label}</button>)}</div>
      <div className="social-donation-panel" aria-live="polite"><EvidenceImage key={donation.file} file={donation.file} label={donation.title}/><p>{donation.description}</p></div>
    </section>

    <div className="social-closing"><p>工程经历让我学会对团队、标准和交付负责，长期公益让我把责任放进日常</p><span>这些积累，也继续影响着我今天的创作与带队方式</span></div>
  </article>;
}
