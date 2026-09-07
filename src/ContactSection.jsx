import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, DownloadSimple, Copy, Check } from '@phosphor-icons/react';

const contacts = [
  { id:'email', label:'邮箱', en:'EMAIL', value:'Axuanxxx@foxmail.com', display:'Axuanxxx@foxmail.com' },
  { id:'phone', label:'电话', en:'PHONE', value:'17348060633', display:'173 4806 0633' },
  { id:'wechat', label:'微信号', en:'WECHAT', value:'JiongKingxun', display:'JiongKingxun' },
];

export function ContactSection({ onHome }) {
  const [copied, setCopied] = useState(null);
  const [message, setMessage] = useState('');
  const timer = useRef(null);
  const request = useRef(0);
  const section = useRef(null);
  useEffect(() => () => { clearTimeout(timer.current); request.current++; }, []);

  useEffect(() => {
    const root = section.current;
    const upperLine = root.querySelector('.section-label');
    const lowerLine = root.querySelector('.contact-details');
    let active = true;
    const measure = () => {
      if (!active) return;
      const top = root.getBoundingClientRect().top;
      root.style.setProperty('--portrait-start', `${upperLine.getBoundingClientRect().bottom - top}px`);
      root.style.setProperty('--portrait-end', `${lowerLine.getBoundingClientRect().top - top}px`);
    };
    const observer = new ResizeObserver(measure);
    [root, upperLine, lowerLine].forEach(element => observer.observe(element));
    document.fonts.ready.then(measure);
    measure();
    return () => { active = false; observer.disconnect(); };
  }, []);

  const copy = async contact => {
    const current = ++request.current;
    try {
      await navigator.clipboard.writeText(contact.value);
    } catch {
      // Support browsers that do not expose the modern clipboard API
      const field = document.createElement('textarea');
      field.value = contact.value;
      field.readOnly = true;
      Object.assign(field.style, { position:'fixed', opacity:'0', left:'-9999px' });
      document.body.append(field);
      field.select();
      let success = false;
      try { success = document.execCommand('copy'); } catch { /* Manual copy below */ }
      field.remove();
      if (!success) {
        if (current !== request.current) return;
        setMessage(`请选择并复制${contact.label}`);
        window.prompt(`复制${contact.label}`, contact.value);
        return;
      }
    }
    if (current !== request.current) return;
    setCopied(contact.id);
    setMessage(`${contact.label}已复制到剪贴板`);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => { setCopied(null); setMessage(''); }, 2400);
  };

  return <section className="contact contact-portrait" id="contact" ref={section}>
    <div className="contact-art" aria-hidden="true">
      <img className="contact-art-sharp" src="/media/axuan-contact-purple.webp" alt="" loading="lazy" decoding="async"/>
      <img className="contact-art-soft" src="/media/axuan-contact-purple.webp" alt="" loading="lazy" decoding="async"/>
      <img className="contact-art-diffuse" src="/media/axuan-contact-purple.webp" alt="" loading="lazy" decoding="async"/>
    </div>
    <div className="wrap contact-inner">
      <div className="section-label"><span>04 / LET’S CONNECT</span><span><span className="status-dot"/> 开放工作与项目合作</span></div>
      <div className="contact-main reveal">
        <p className="eyebrow">THE NEXT IDEA STARTS WITH A CONVERSATION</p>
        <h2>下一个好作品，<br/><span className="dim">从一次对话开始</span></h2>
        <a className="contact-cta" href="/downloads/zhong-qixuan-resume.pdf" download="钟启轩职业履历_领导查阅版_常规手机.pdf">点击下载个人简历 <DownloadSimple size={30}/></a>
      </div>
      <div className="contact-details">
        {contacts.map(contact => <button key={contact.id} type="button" className={copied === contact.id ? 'is-copied' : ''} onClick={() => copy(contact)} aria-label={`复制${contact.label}`}>
          <span>{contact.en} · {copied === contact.id ? '已复制' : '点击复制'}</span>
          <strong>{contact.display}</strong>
          {copied === contact.id ? <Check size={22} aria-hidden="true"/> : <Copy size={22} aria-hidden="true"/>}
        </button>)}
      </div>
      <div aria-live="polite" role="status" className="sr-only">{message}</div>
      <footer><a className="logo" href="#home" onClick={onHome}>AXUAN<span className="logo-mark" aria-hidden="true"/></a><span>© {new Date().getFullYear()} 钟启轩 · 用创意表达，以方法落地</span><a href="#home">回到顶部 <ArrowUpRight size={17}/></a></footer>
    </div>
  </section>;
}
