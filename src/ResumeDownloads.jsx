import React, { useEffect, useId, useRef, useState } from 'react';
import { CaretDown, DownloadSimple } from '@phosphor-icons/react';
import './resume-downloads.css';

const editions = [
  { id: 'full', label: '完整履历', filename: '完整履历' },
  { id: 'aigc', label: 'AIGC 行业版', filename: 'AIGC行业版' },
  { id: 'business', label: '商务版', filename: '商务版' },
];
const formats = [
  { id: 'mobile', label: '常规手机版' },
  { id: 'desktop', label: '电脑版' },
  { id: 'fold', label: '折叠屏展开版' },
];

export function ResumeDownloads() {
  const [open, setOpen] = useState(false);
  const container = useRef(null);
  const trigger = useRef(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const closeOutside = event => {
      if (!container.current?.contains(event.target)) setOpen(false);
    };
    const closeOnEscape = event => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      trigger.current?.focus({ preventScroll: true });
    };
    document.addEventListener('pointerdown', closeOutside);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOutside);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [open]);

  return <div className="resume-downloads" ref={container} onBlur={event => {
    if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
  }}>
    <button type="button" ref={trigger} className="contact-cta resume-download-trigger"
      aria-expanded={open} aria-controls={panelId} onClick={() => setOpen(value => !value)}>
      点击下载个人简历
      {open ? <CaretDown size={30} className="resume-chevron" aria-hidden="true"/> : <DownloadSimple size={30} aria-hidden="true"/>}
    </button>
    <div id={panelId} className="resume-download-panel" hidden={!open} role="region" aria-label="个人简历下载版本">
      <div className="resume-download-heading"><span>选择适合你的简历</span><span>9 个版本 · PDF</span></div>
      {editions.map((edition, index) => <section className="resume-download-group" key={edition.id} aria-labelledby={`${panelId}-${edition.id}`}>
        <h3 id={`${panelId}-${edition.id}`}><span aria-hidden="true">0{index + 1}</span>{edition.label}</h3>
        <ul>
          {formats.map(format => <li key={format.id}>
            <a href={`/downloads/resumes/zhong-qixuan-${edition.id}-${format.id}.pdf`}
              download={`钟启轩_${edition.filename}_${format.label}.pdf`}
              aria-label={`下载${edition.label} · ${format.label} PDF`}>{format.label}</a>
          </li>)}
        </ul>
      </section>)}
    </div>
  </div>;
}
