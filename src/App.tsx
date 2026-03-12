import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ProjectsSection } from './components/ProjectShowcase';
import { SkillStack } from './components/SkillStack';
import { AboutMe } from './components/AboutMe';
import { AIx3D } from './components/AIx3D';

// ─── 공통 애니메이션 variants ─────────────────────────────────
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0, 0, 1] } },
};

// 섹션 fade: exit 0.4s → enter 0.4s (mode="wait"으로 순차 실행)
const sectionFade: Variants = {
  enter:   { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } },
  exit:    { opacity: 0, transition: { duration: 0.4, ease: 'easeIn'  } },
};

// ─── 섹션 메타 ────────────────────────────────────────────────
const SECTIONS = [
  { num: '01', label: 'Intro',          hash: 'intro'   },
  { num: '02', label: 'About Me',       hash: 'about'   },
  { num: '03', label: 'The Toolbox',    hash: 'toolbox' },
  { num: '04', label: 'Featured Works', hash: 'works'   },
  { num: '05', label: 'AI × 3D',        hash: 'aix3d'  },
];
const TOTAL = String(SECTIONS.length).padStart(2, '0');

// ─── 인트로 전용 데이터 ──────────────────────────────────────
const CATEGORIES = [
  '3D CREATION',
  'ANIMATION',
  'UX/UI DESIGN',
  'WEB & SYSTEM',
  'NFT & DIGITAL ASSET',
];

const introStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};
const introFadeUp: Variants = {
  hidden:   { opacity: 0, y: 15 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0, 0, 1] } },
};

// ─── 인트로 섹션 ─────────────────────────────────────────────
function IntroSection() {
  return (
    <section className="w-full h-full relative" id="section-intro">

      {/* 좌측 상단 */}
      <p
        className="absolute top-16 left-12 md:left-24 text-white uppercase"
        style={{ fontSize: '0.75rem', letterSpacing: '0.1em', fontFamily: "'DM Sans', sans-serif" }}
      >
        Portfolio
      </p>

      {/* 우측 상단 */}
      <p
        className="absolute top-16 right-12 md:right-24 text-white uppercase"
        style={{ fontSize: '0.75rem', letterSpacing: '0.1em', fontFamily: "'DM Sans', sans-serif" }}
      >
        2022–2026
      </p>

      {/* 중앙: 카테고리 목록 */}
      <div className="absolute inset-0 flex items-center px-12 md:px-24">
        <motion.div
          variants={introStagger}
          initial="hidden"
          animate="visible"
          className="flex flex-col"
        >
          {CATEGORIES.map((label) => (
            <motion.p
              key={label}
              variants={introFadeUp}
              className="uppercase transition-colors duration-200"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 'clamp(2.5rem, 3.5vw, 3.5rem)',
                fontWeight: 700,
                lineHeight: 1.3,
                letterSpacing: '-0.01em',
                color: '#ffffff',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#555555'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#ffffff'; }}
            >
              {label}
            </motion.p>
          ))}
        </motion.div>
      </div>

      {/* 좌측 하단 */}
      <div
        className="absolute bottom-16 left-12 md:left-24"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <p className="uppercase" style={{ fontSize: '0.7rem', letterSpacing: '0.1em', color: '#555555' }}>
          Kim You Seong
        </p>
        <p className="uppercase" style={{ fontSize: '0.7rem', letterSpacing: '0.1em', color: '#555555' }}>
          © 2026
        </p>
      </div>

    </section>
  );
}

// ─── 메인 App ─────────────────────────────────────────────────
function App() {
  const [current, setCurrent] = useState(() => {
    // 초기 섹션: URL hash로 복원
    const hash = window.location.hash.slice(1);
    const idx  = SECTIONS.findIndex(s => s.hash === hash);
    return idx >= 0 ? idx : 0;
  });

  const currentRef      = useRef(current);  // wheel 핸들러 stale closure 방지
  const isTransitioning = useRef(false);    // 전환 중 입력 차단

  const goTo = useCallback((idx: number) => {
    if (isTransitioning.current) return;
    if (idx < 0 || idx >= SECTIONS.length) return;

    isTransitioning.current = true;
    currentRef.current = idx;
    setCurrent(idx);

    // URL hash 업데이트 (history에 남기지 않으려면 replaceState)
    history.replaceState(null, '', `#${SECTIONS[idx].hash}`);

    // fade out(0.4s) + fade in(0.4s) = 0.8s, 여유 50ms
    setTimeout(() => { isTransitioning.current = false; }, 850);
  }, []);

  // 브라우저 뒤로/앞으로 (hashchange)
  useEffect(() => {
    const onHash = () => {
      const hash = window.location.hash.slice(1);
      const idx  = SECTIONS.findIndex(s => s.hash === hash);
      if (idx >= 0 && idx !== currentRef.current) goTo(idx);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [goTo]);

  // wheel 이벤트 — 내부 overflow 스크롤 통과
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      // 모달이 열려 있으면 섹션 이동 차단
      if (document.body.style.overflow === 'hidden') return;
      let el: Element | null = e.target as Element;
      while (el && el !== document.documentElement) {
        const { overflowY } = getComputedStyle(el);
        if ((overflowY === 'auto' || overflowY === 'scroll') && el.scrollHeight > el.clientHeight) {
          const { scrollTop, scrollHeight, clientHeight } = el as HTMLElement;
          const atBottom = scrollTop + clientHeight >= scrollHeight - 2;
          const atTop    = scrollTop <= 0;
          if ((e.deltaY > 0 && !atBottom) || (e.deltaY < 0 && !atTop)) return;
          break;
        }
        el = el.parentElement;
      }
      e.preventDefault();
      if      (e.deltaY >  20) goTo(currentRef.current + 1);
      else if (e.deltaY < -20) goTo(currentRef.current - 1);
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [goTo]);

  // 키보드 지원
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (document.body.style.overflow === 'hidden') return;
      if (['ArrowDown', 'PageDown'].includes(e.key)) goTo(currentRef.current + 1);
      if (['ArrowUp',   'PageUp'  ].includes(e.key)) goTo(currentRef.current - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goTo]);

  // 터치 스와이프 지원 (모바일)
  useEffect(() => {
    let startY = 0;
    let lockedEl: Element | null = null;

    const onTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
      lockedEl = null;

      // 터치 시작 위치에서 내부 스크롤 가능 요소 탐색
      let el: Element | null = e.target as Element;
      while (el && el !== document.documentElement) {
        const { overflowY } = getComputedStyle(el);
        if ((overflowY === 'auto' || overflowY === 'scroll') && el.scrollHeight > el.clientHeight) {
          lockedEl = el;
          break;
        }
        el = el.parentElement;
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (document.body.style.overflow === 'hidden') return;

      const deltaY = startY - e.changedTouches[0].clientY;
      if (Math.abs(deltaY) < 50) return; // 최소 스와이프 거리

      if (lockedEl) {
        const { scrollTop, scrollHeight, clientHeight } = lockedEl as HTMLElement;
        const atBottom = scrollTop + clientHeight >= scrollHeight - 2;
        const atTop    = scrollTop <= 0;
        // 내부 스크롤이 경계에 도달하지 않았으면 섹션 이동 차단
        if ((deltaY > 0 && !atBottom) || (deltaY < 0 && !atTop)) return;
      }

      if      (deltaY >  0) goTo(currentRef.current + 1);
      else if (deltaY <  0) goTo(currentRef.current - 1);
    };

    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend',   onTouchEnd,   { passive: true });
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend',   onTouchEnd);
    };
  }, [goTo]);

  const sectionComponents = [
    <IntroSection />,
    <AboutMe />,
    <SkillStack />,
    <ProjectsSection />,
    <AIx3D />,
  ];

  return (
    <div className="bg-black text-white h-screen overflow-hidden">

      {/* 섹션 전환 — fade out 완료 후 fade in (mode="wait") */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          variants={sectionFade}
          initial="enter"
          animate="visible"
          exit="exit"
          className="fixed inset-0 section-safe"
          data-index={current}
        >
          {sectionComponents[current]}
        </motion.div>
      </AnimatePresence>

      {/* 하단 중앙 — 섹션 레이블 + 진행 바 */}
      <div className="fixed left-1/2 -translate-x-1/2 z-50 pointer-events-none" style={{ bottom: 'calc(var(--safe-bottom) + 2rem)' }}>
        <div className="flex items-center gap-4 px-5 py-2 bg-black border border-[#222]">
          <motion.span
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="type-mono text-[#666666]"
          >
            {SECTIONS[current].label}
          </motion.span>
          {/* 섹션 진행 바 */}
          <div className="flex gap-1 items-center">
            {SECTIONS.map((_, i) => (
              <div key={i}
                   className="h-[1px] transition-all duration-400"
                   style={{ width: i === current ? '20px' : '6px',
                            background: i === current ? '#ffffff' : '#333' }} />
            ))}
          </div>
        </div>
      </div>

      {/* 우측 하단 — 섹션 번호 01 / 05 */}
      <div className="fixed right-12 z-50 pointer-events-none" style={{ bottom: 'calc(var(--safe-bottom) + 2rem)' }}>
        <motion.p
          key={current}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="type-mono"
          style={{ color: '#444' }}
        >
          <span className="text-white">{SECTIONS[current].num}</span>
          {' / '}
          {TOTAL}
        </motion.p>
      </div>

    </div>
  );
}

export default App;
