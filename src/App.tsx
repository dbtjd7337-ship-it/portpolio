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
const ROLES = ['FULL-STACK CREATOR', '3D ARTIST', 'AI STRATEGIST'];
const BANNER_IMAGES = [
  '/images/projectA/dog/dog_main.png',
  '/images/projectC/hideout/hideout_main.png',
  '/images/projectB/ridy/ridy_main.png',
  '/images/projectA/mobi/mobi_main.png',
  '/images/projectC/oille-room/oille-room_main.png',
  '/images/projectB/2gatur/2gatur_main.png',
  '/images/projectA/freedom-gundam/freedom-gundam_1.jpg',
  '/images/projectA/rolex/rolex_1.png',
  '/images/projectA/rx78/rx78_1.png',
  '/images/projectA/tiger/tiger_2.png',
];

// ─── 인트로 섹션 ─────────────────────────────────────────────
function IntroSection() {
  return (
    <section className="w-full h-full flex flex-col overflow-hidden" id="section-intro">
      <div className="flex-1 flex flex-col justify-center px-12 md:px-24">
        <motion.div variants={stagger} initial="hidden" animate="visible" className="flex flex-col">

          {/* 이름 + 태그라인 */}
          <motion.div variants={fadeUp} className="flex items-baseline justify-between mb-10">
            <p className="text-[#666666] uppercase font-bold"
               style={{ fontSize: '0.75rem', letterSpacing: '0.3em', fontFamily: "'DM Sans', sans-serif" }}>
              KIM YOU SEONG
            </p>
            <p className="text-[#444444]"
               style={{ fontSize: '0.7rem', letterSpacing: '0.15em', fontFamily: "'DM Sans', sans-serif" }}>
              Where 3D craft meets AI strategy.
            </p>
          </motion.div>

          {/* 역할 3줄 */}
          {ROLES.map((role, i) => (
            <motion.div key={role} variants={fadeUp} className="border-t border-[#222] py-5">
              {i === 0 ? (
                <span className="inline-block font-bold uppercase leading-none px-4 py-1"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif",
                               fontSize: 'clamp(2rem, 5.5vw, 6vw)',
                               letterSpacing: '-0.01em',
                               color: '#CCFF00',
                               border: '2px solid #CCFF00' }}>
                  {role}
                </span>
              ) : (
                <span className="text-white font-bold uppercase leading-none block hover:text-[#CCFF00] transition-colors duration-200"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif",
                               fontSize: 'clamp(2rem, 5.5vw, 6vw)',
                               letterSpacing: '-0.01em' }}>
                  {role}
                </span>
              )}
            </motion.div>
          ))}
          <div className="border-t border-[#222]" />
        </motion.div>
      </div>

      {/* 롤링 배너 */}
      <div className="border-t border-[#222] overflow-hidden shrink-0" style={{ height: '200px' }}>
        <div className="marquee-track flex h-full" style={{ width: 'max-content' }}>
          {[...BANNER_IMAGES, ...BANNER_IMAGES].map((src, i) => (
            <div key={i}
                 className="h-full shrink-0 border-r border-[#222]"
                 style={{ width: '300px' }}>
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          ))}
        </div>
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
      if (['ArrowDown', 'PageDown'].includes(e.key)) goTo(currentRef.current + 1);
      if (['ArrowUp',   'PageUp'  ].includes(e.key)) goTo(currentRef.current - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
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
          className="fixed inset-0"
          data-index={current}
        >
          {sectionComponents[current]}
        </motion.div>
      </AnimatePresence>

      {/* 하단 중앙 — 섹션 레이블 + 진행 바 */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
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
                            background: i === current ? '#CCFF00' : '#333' }} />
            ))}
          </div>
        </div>
      </div>

      {/* 우측 하단 — 섹션 번호 01 / 05 */}
      <div className="fixed bottom-8 right-12 z-50 pointer-events-none">
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
