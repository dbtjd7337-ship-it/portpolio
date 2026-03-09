import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project, ProjectMedia } from '../data/projects';

const MediaRenderer = ({ item, className }: { item: ProjectMedia; className?: string }) => {
  if (item.type === 'video') {
    return (
      <video autoPlay muted loop playsInline className={className}>
        <source src={item.src} type="video/mp4" />
      </video>
    );
  }
  return <img src={item.src} alt="" className={className} />;
};


interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [project, onClose]);


  return createPortal(
    <AnimatePresence>
      {project && (
        /* 배경 오버레이 — 클릭 시 닫기 */
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-6"
        >
          {/* 모달 카드 — 클릭 이벤트 버블링 차단 */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={e => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-black border border-[#222]"
          >
            {/* 닫기 버튼 */}
            <button
              onClick={onClose}
              className="sticky top-4 left-full z-10 float-right mr-4 w-9 h-9 bg-black border border-[#222] flex items-center justify-center hover:bg-[#111] transition-colors cursor-pointer"
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M1 1l11 11M12 1L1 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            <div className="px-8 pt-8 pb-12">
              {/* 프로젝트 헤더 */}
              <div className="mb-8">
                <div className="type-category mb-2 text-[#CCFF00]">{project.categoryLabel}</div>
                <h2 className="type-section mb-5">{project.name}</h2>
                <div className="flex gap-2 flex-wrap">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-[11px] px-2 py-0.5 border border-[#222] text-white uppercase" style={{ letterSpacing: '0.1em' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* 메인 미디어 (히어로) */}
              <div className="w-full overflow-hidden mb-3 bg-black border border-[#222]">
                <MediaRenderer item={project.thumbnail} className="w-full object-cover" />
              </div>

              {/* 설명 */}
              {project.description && (
                <p className="type-body border-l-2 border-[#CCFF00] pl-6 py-2 my-8 whitespace-pre-line">
                  {project.description}
                </p>
              )}

              {/* 외부 링크 */}
              {project.links && project.links.length > 0 && (
                <div className="flex gap-6 -mt-4 mb-8">
                  {project.links.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="type-body text-zinc-400 hover:text-white hover:underline transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}

              {/* Behance 링크 */}
              {project.behanceLinks && project.behanceLinks.length > 0 && (
                <div className="grid grid-cols-2 gap-3 my-8">
                  {project.behanceLinks.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative aspect-video overflow-hidden border border-[#222] block"
                    >
                      <img src={link.thumbnail} alt={link.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/70 transition-colors duration-300" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 gap-2">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M3 17L17 3M17 3H7M17 3V13" stroke="#CCFF00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-[#CCFF00] text-xs uppercase tracking-[0.2em]">{link.hoverLabel ?? 'View on Behance'}</span>
                      </div>
                      <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                        <span className="text-white text-xs">{link.label}</span>
                      </div>
                    </a>
                  ))}
                </div>
              )}

              {/* 상세 갤러리 — 레이아웃은 프로젝트별로 수동 지정 */}
              {project.media.length > 0 && (
                <div className="space-y-3">
                  {(project.mediaLayout ?? project.media.map((_, i) => i)).map((slot, rowIdx) => {
                    const renderItem = (idx: number, extraClass = '') => {
                      const url = project.mediaLinks?.[idx];
                      const inner = <MediaRenderer item={project.media[idx]} className="w-full h-auto block" />;
                      return url ? (
                        <a key={idx} href={url} target="_blank" rel="noopener noreferrer" className={`overflow-hidden bg-black border border-[#222] block group relative ${extraClass}`}>
                          {inner}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#CCFF00] text-xs uppercase tracking-[0.2em] flex items-center gap-2">
                              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 13L13 3M13 3H5M13 3V11" stroke="#CCFF00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                              View NFT
                            </span>
                          </div>
                        </a>
                      ) : (
                        <div key={idx} className={`overflow-hidden bg-black border border-[#222] ${extraClass}`}>
                          {inner}
                        </div>
                      );
                    };

                    return typeof slot === 'object' && !Array.isArray(slot) ? (
                      <div key={rowIdx} className="grid gap-3" style={{ gridTemplateColumns: slot.cols }}>
                        {slot.indices.map(idx => renderItem(idx))}
                      </div>
                    ) : Array.isArray(slot) ? (
                      <div key={rowIdx} className="flex gap-3">
                        {slot.map(idx => renderItem(idx, 'flex-1 min-w-0'))}
                      </div>
                    ) : (() => {
                      const idx = slot as number;
                      const url = project.mediaLinks?.[idx];
                      const mediaItem = project.media[idx];
                      const inner = <MediaRenderer item={mediaItem} className="w-full object-cover" />;
                      const caption = mediaItem.caption;
                      const media = url ? (
                        <a key={rowIdx} href={url} target="_blank" rel="noopener noreferrer" className="w-full overflow-hidden bg-black border border-[#222] block group relative">
                          {inner}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#CCFF00] text-xs uppercase tracking-[0.2em] flex items-center gap-2">
                              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 13L13 3M13 3H5M13 3V11" stroke="#CCFF00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                              View NFT
                            </span>
                          </div>
                        </a>
                      ) : (
                        <div key={rowIdx} className="w-full overflow-hidden bg-black border border-[#222]">{inner}</div>
                      );
                      return caption ? (
                        <div key={rowIdx}>
                          {media}
                          <p className="type-body text-zinc-400 mt-2 whitespace-pre-line">{caption}</p>
                        </div>
                      ) : media;
                    })();
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};
