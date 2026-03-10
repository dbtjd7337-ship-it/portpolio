import { useState } from 'react';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import type { Project, ProjectMedia } from '../data/projects';
import { ProjectModal } from './ProjectModal';

const ThumbnailMedia = ({ item, className }: { item: ProjectMedia; className?: string }) => {
  if (item.type === 'video') {
    return (
      <video autoPlay muted loop playsInline className={className}>
        <source src={item.src} type="video/mp4" />
      </video>
    );
  }
  return <img src={item.src} alt="" className={className} />;
};

const ProjectCard = ({ project, delay, onClick }: { project: Project; delay: number; onClick: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4, ease: [0.25, 0, 0, 1] }}
    viewport={{ once: true }}
    onClick={onClick}
    className="group relative aspect-video overflow-hidden cursor-pointer border border-[#222]"
  >
    {/* 썸네일 미디어 */}
    <ThumbnailMedia
      item={project.thumbnail}
      className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
    />

    {/* 오버레이 */}
    <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.4)' }} />

    {/* 하단 정보 */}
    <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
      <div
        className="uppercase mb-1"
        style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: '#fff', fontFamily: "'DM Sans', sans-serif" }}
      >
        {project.categoryLabel}
      </div>
      <h3 className="text-base font-bold text-white tracking-tight">
        {project.name}
      </h3>
      <div className="flex gap-1.5 flex-wrap mt-2">
        {project.tags.map(tag => (
          <span
            key={tag}
            className="text-[9px] px-2 py-0.5 text-white uppercase hover:bg-white hover:text-black transition-colors duration-150"
            style={{ border: '1px solid #555', letterSpacing: '0.1em', fontFamily: "'DM Sans', sans-serif" }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>

    {/* 우상단 화살표 */}
    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-2 group-hover:translate-x-0">
      <div className="w-8 h-8 bg-black border border-white flex items-center justify-center">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  </motion.div>
);

const CATEGORY_LABELS: Record<string, string> = {
  projectA: '3D Modeling',
  projectB: 'Web & Service',
  projectC: 'Visual',
};

export const ProjectsSection = () => {
  const [selected, setSelected] = useState<Project | null>(null);

  // 카테고리별 그루핑
  const grouped = (['projectA', 'projectB', 'projectC'] as const)
    .map(cat => ({
      category: cat,
      label: CATEGORY_LABELS[cat],
      items: projects.filter(p => p.category === cat),
    }))
    .filter(g => g.items.length > 0);

  let cardIndex = 0;

  return (
    <section
      className="w-full h-full overflow-y-auto flex flex-col justify-start py-20 px-12 md:px-24 bg-black works-scroll"
      id="section-works"
    >
      <div className="max-w-6xl mx-auto w-full">

        {/* 섹션 헤더 */}
        <div className="mb-16">
          <h2
            className="text-white font-bold uppercase leading-none mb-4"
            style={{ fontSize: '2.5rem', fontFamily: "'DM Sans', sans-serif", letterSpacing: '-0.01em' }}
          >
            Featured Works
          </h2>
          <p style={{ color: '#666', fontSize: '0.75rem', fontFamily: "'DM Sans', sans-serif" }}>
            실질적인 논리와 감각적인 표현이 만나는 지점을 탐구합니다.
          </p>
        </div>

        {/* 카테고리별 프로젝트 그리드 */}
        <div className="space-y-16">
          {grouped.map(group => (
            <div key={group.category}>
              <div className="flex items-center gap-4 mb-6">
                <span
                  className="uppercase shrink-0"
                  style={{ fontSize: '0.65rem', letterSpacing: '0.25em', color: '#555', fontFamily: "'DM Sans', sans-serif" }}
                >
                  {group.label}
                </span>
                <div className="h-[1px] flex-grow bg-[#222]" />
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {group.items.map(project => {
                  const delay = (cardIndex++ % 3) * 0.1;
                  return (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      delay={delay}
                      onClick={() => setSelected(project)}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>

      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
};
