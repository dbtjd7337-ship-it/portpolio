import { RefObject } from 'react';
import { motion } from 'framer-motion';
import { useActiveSection } from '../hooks/useActiveSection';

const SECTIONS = [
  { id: 'section-intro',    label: 'Intro',          num: '01' },
  { id: 'section-about',    label: 'About Me',       num: '02' },
  { id: 'section-toolbox',  label: 'The Toolbox',    num: '03' },
  { id: 'section-works',    label: 'Featured Works', num: '04' },
  { id: 'section-aix3d',    label: 'AI × 3D',        num: '05' },
] as const;

const SECTION_IDS = SECTIONS.map(s => s.id) as string[];

interface SectionNavProps {
  containerRef: RefObject<HTMLElement>;
}

export const SectionNav = ({ containerRef }: SectionNavProps) => {
  const activeSection = useActiveSection(containerRef, SECTION_IDS);
  const activeIndex = SECTIONS.findIndex(s => s.id === activeSection);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (!el || !containerRef.current) return;
    containerRef.current.scrollTo({ left: el.offsetLeft, behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
      className="fixed top-16 left-3 z-50 bg-black border border-[#222] px-3 py-3 min-w-[140px] sm:top-20 sm:left-6 sm:px-4 sm:py-4 sm:min-w-[190px]"
    >
      <ul className="flex flex-col">
        {SECTIONS.map((section, idx) => {
          const isPast    = idx < activeIndex;
          const isCurrent = idx === activeIndex;

          return (
            <li key={section.id}>
              <motion.button
                onClick={() => handleClick(section.id)}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-2 sm:gap-3 w-full text-left py-1 sm:py-2 cursor-pointer"
              >
                {/* 상태 표시 아이콘 */}
                <div className="w-4 h-4 flex items-center justify-center shrink-0">
                  {isPast ? (
                    // 지나온 섹션: 체크 아이콘
                    <motion.svg
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.25 }}
                      width="11" height="11" viewBox="0 0 11 11" fill="none"
                    >
                      <path
                        d="M1.5 5.5l3 3 5-5"
                        stroke="#52525b"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </motion.svg>
                  ) : isCurrent ? (
                    // 현재 섹션: 펄스 닷
                    <motion.div
                      layoutId="nav-active-dot"
                      className="w-1.5 h-1.5 rounded-full bg-[#CCFF00]"
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                    />
                  ) : (
                    // 아직 안 온 섹션: 빈 닷
                    <div className="w-1 h-1 rounded-full bg-zinc-700" />
                  )}
                </div>

                {/* 번호 */}
                <span className="hidden sm:inline text-[9px] text-[#444444] shrink-0 w-4 leading-none" style={{ letterSpacing: '0.15em' }}>
                  {section.num}
                </span>

                {/* 섹션 레이블 */}
                <motion.span
                  animate={{
                    color:   isCurrent ? '#CCFF00' : isPast ? '#444444' : '#666666',
                    opacity: isPast ? 0.55 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className="text-[8px] sm:text-[10px] uppercase leading-none"
                  style={{ letterSpacing: '0.15em', fontFamily: "'DM Sans', sans-serif", fontWeight: isCurrent ? 700 : 500 }}
                >
                  {section.label}
                </motion.span>
              </motion.button>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
};
