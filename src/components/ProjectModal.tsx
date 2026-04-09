import { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project, ProjectMedia } from '../data/projects';

const MediaRenderer = ({ item, className }: { item: ProjectMedia; className?: string }) => {
  if (item.type === 'video') {
    return (
      <video autoPlay muted loop playsInline preload="metadata" className={className}>
        <source src={item.src} type="video/mp4" />
      </video>
    );
  }
  return <img src={item.src} alt="" loading="lazy" className={className} />;
};

const Lightbox = ({
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  items: ProjectMedia[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) => {
  const item = items[index];
  return createPortal(
    <motion.div
      key="lightbox"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className="fixed inset-0 z-[200] bg-black/98 flex items-center justify-center"
    >
      {/* 미디어 */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={e => e.stopPropagation()}
        className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center"
      >
        {item.type === 'video' ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            controls
            className="max-w-[90vw] max-h-[90vh] object-contain"
          >
            <source src={item.src} type="video/mp4" />
          </video>
        ) : (
          <img
            src={item.src}
            alt=""
            className="max-w-[90vw] max-h-[90vh] object-contain"
          />
        )}
      </motion.div>

      {/* 닫기 버튼 */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 w-9 h-9 bg-black/60 border border-[#444] flex items-center justify-center hover:bg-[#111] transition-colors cursor-pointer"
      >
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
          <path d="M1 1l11 11M12 1L1 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {/* 이전 버튼 */}
      {items.length > 1 && (
        <button
          onClick={e => { e.stopPropagation(); onPrev(); }}
          className="absolute left-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 border border-[#444] flex items-center justify-center hover:bg-[#111] transition-colors cursor-pointer"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7l5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {/* 다음 버튼 */}
      {items.length > 1 && (
        <button
          onClick={e => { e.stopPropagation(); onNext(); }}
          className="absolute right-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 border border-[#444] flex items-center justify-center hover:bg-[#111] transition-colors cursor-pointer"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5 2l5 5-5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {/* 인덱스 표시 */}
      {items.length > 1 && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[#888] text-xs" style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.1em' }}>
          {index + 1} / {items.length}
        </div>
      )}
    </motion.div>,
    document.body
  );
};

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const allMedia = project ? [project.thumbnail, ...project.media] : [];

  const openLightbox = useCallback((idx: number) => setLightboxIdx(idx), []);
  const closeLightbox = useCallback(() => setLightboxIdx(null), []);
  const prevItem = useCallback(() => setLightboxIdx(i => i !== null ? (i - 1 + allMedia.length) % allMedia.length : null), [allMedia.length]);
  const nextItem = useCallback(() => setLightboxIdx(i => i !== null ? (i + 1) % allMedia.length : null), [allMedia.length]);

  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxIdx !== null) closeLightbox();
        else onClose();
      }
      if (lightboxIdx !== null) {
        if (e.key === 'ArrowLeft') prevItem();
        if (e.key === 'ArrowRight') nextItem();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [project, onClose, lightboxIdx, closeLightbox, prevItem, nextItem]);

  // lightboxIdx가 바뀔 때마다 키 이벤트 갱신을 위해 별도 처리
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxIdx !== null) closeLightbox();
        else onClose();
      }
      if (lightboxIdx !== null) {
        if (e.key === 'ArrowLeft') prevItem();
        if (e.key === 'ArrowRight') nextItem();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIdx, project, onClose, closeLightbox, prevItem, nextItem]);

  return (
    <>
      {createPortal(
        <AnimatePresence>
          {project && (
            <motion.div
              key="modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={onClose}
              className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-6"
            >
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
                    <div className="type-category mb-2 text-[#ffffff]">{project.categoryLabel}</div>
                    <h2 className="type-section mb-5">{project.name}</h2>
                    <div className="flex gap-2 flex-wrap">
                      {project.tags.map(tag => (
                        <span
                          key={tag}
                          className="text-[11px] px-2 py-0.5 text-white uppercase hover:bg-white hover:text-black transition-colors duration-150"
                          style={{ letterSpacing: '0.1em', border: '1px solid #555' }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 메인 미디어 (히어로) — index 0 = thumbnail */}
                  <div
                    className="w-full overflow-hidden mb-3 bg-black border border-[#222] cursor-zoom-in"
                    onClick={() => openLightbox(0)}
                  >
                    <MediaRenderer item={project.thumbnail} className="w-full object-cover" />
                  </div>

                  {/* 설명 */}
                  {project.description && (
                    <p className="type-body border-l border-white pl-6 py-2 my-8 whitespace-pre-line">
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
                              <path d="M3 17L17 3M17 3H7M17 3V13" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="text-[#ffffff] text-xs uppercase tracking-[0.2em]">{link.hoverLabel ?? 'View on Behance'}</span>
                          </div>
                          <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                            <span className="text-white text-xs">{link.label}</span>
                          </div>
                        </a>
                      ))}
                    </div>
                  )}

                  {/* 상세 갤러리 */}
                  {project.media.length > 0 && (
                    <div className="space-y-3">
                      {(project.mediaLayout ?? project.media.map((_, i) => i)).map((slot, rowIdx) => {
                        // media[idx] → allMedia index는 idx + 1 (thumbnail이 0번)
                        const renderItem = (idx: number, extraClass = '') => {
                          const url = project.mediaLinks?.[idx];
                          const lightboxIndex = idx + 1;
                          const inner = <MediaRenderer item={project.media[idx]} className="w-full h-auto block" />;
                          return url ? (
                            <a key={idx} href={url} target="_blank" rel="noopener noreferrer" className={`overflow-hidden bg-black border border-[#222] block group relative ${extraClass}`}>
                              {inner}
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
                                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#ffffff] text-xs uppercase tracking-[0.2em] flex items-center gap-2">
                                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 13L13 3M13 3H5M13 3V11" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                  View NFT
                                </span>
                              </div>
                            </a>
                          ) : (
                            <div
                              key={idx}
                              className={`overflow-hidden bg-black border border-[#222] cursor-zoom-in ${extraClass}`}
                              onClick={() => openLightbox(lightboxIndex)}
                            >
                              {inner}
                            </div>
                          );
                        };

                        const renderRow = (innerSlot: number | number[] | { indices: number[]; cols: string }, innerIdx: number) => {
                          if (typeof innerSlot === 'object' && !Array.isArray(innerSlot)) {
                            return (
                              <div key={innerIdx} className="grid gap-3" style={{ gridTemplateColumns: innerSlot.cols }}>
                                {innerSlot.indices.map(idx => renderItem(idx))}
                              </div>
                            );
                          } else if (Array.isArray(innerSlot)) {
                            return (
                              <div key={innerIdx} className="flex gap-3">
                                {innerSlot.map(idx => renderItem(idx, 'flex-1 min-w-0'))}
                              </div>
                            );
                          } else {
                            const idx = innerSlot as number;
                            const url = project.mediaLinks?.[idx];
                            const lightboxIndex = idx + 1;
                            const mediaItem = project.media[idx];
                            const inner = <MediaRenderer item={mediaItem} className="w-full object-cover" />;
                            const caption = mediaItem.caption;
                            const media = url ? (
                              <a key={innerIdx} href={url} target="_blank" rel="noopener noreferrer" className="w-full overflow-hidden bg-black border border-[#222] block group relative">
                                {inner}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
                                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#ffffff] text-xs uppercase tracking-[0.2em] flex items-center gap-2">
                                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 13L13 3M13 3H5M13 3V11" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    View NFT
                                  </span>
                                </div>
                              </a>
                            ) : (
                              <div
                                key={innerIdx}
                                className="w-full overflow-hidden bg-black border border-[#222] cursor-zoom-in"
                                onClick={() => openLightbox(lightboxIndex)}
                              >
                                {inner}
                              </div>
                            );
                            return caption ? (
                              <div key={innerIdx}>
                                {media}
                                <p className="type-body text-zinc-400 mt-2 whitespace-pre-line">{caption}</p>
                              </div>
                            ) : media;
                          }
                        };

                        if (typeof slot === 'object' && !Array.isArray(slot) && 'group' in slot) {
                          return (
                            <div key={rowIdx} className="pt-8">
                              {(slot.label || slot.description) && (
                                <div className="mb-3">
                                  {slot.label && (
                                    <h4 className="text-white text-sm font-semibold uppercase tracking-[0.12em] mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                                      {slot.label}
                                    </h4>
                                  )}
                                  {slot.description && (
                                    <p className="type-body">{slot.description}</p>
                                  )}
                                </div>
                              )}
                              <div className="border border-[#333] p-3 space-y-3 mt-3">
                                {slot.group.map((innerSlot, innerIdx) => renderRow(innerSlot, innerIdx))}
                              </div>
                            </div>
                          );
                        }

                        return renderRow(slot as number | number[] | { indices: number[]; cols: string }, rowIdx);
                      })}
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      <AnimatePresence>
        {lightboxIdx !== null && project && (
          <Lightbox
            items={allMedia}
            index={lightboxIdx}
            onClose={closeLightbox}
            onPrev={prevItem}
            onNext={nextItem}
          />
        )}
      </AnimatePresence>
    </>
  );
};
