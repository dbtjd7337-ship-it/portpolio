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
      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
    />

    {/* 어두운 오버레이 */}
    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />

    {/* 하단 정보 */}
    <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
      <div className="type-mono text-[#CCFF00] mb-1">
        {project.categoryLabel}
      </div>
      <h3 className="text-xl font-semibold text-white tracking-tight group-hover:text-[#CCFF00] transition-colors duration-200">
        {project.name}
      </h3>
      <div className="flex gap-1.5 flex-wrap mt-2">
        {project.tags.map(tag => (
          <span key={tag} className="text-[9px] px-2 py-0.5 bg-black border border-zinc-700 text-white uppercase" style={{ letterSpacing: '0.1em', fontFamily: "'DM Sans', sans-serif" }}>
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
          <h2 className="type-section mb-4">
            FEATURED <span className="text-[#CCFF00]">WORKS</span>
          </h2>
          <p className="text-zinc-500">
            실질적인 논리와 감각적인 표현이 만나는 지점을 탐구합니다.
          </p>
        </div>

        {/* 카테고리별 프로젝트 그리드 */}
        <div className="space-y-16">
          {grouped.map(group => (
            <div key={group.category}>
              <div className="flex items-center gap-4 mb-6">
                <span className="type-category">{group.label}</span>
                <div className="h-[1px] flex-grow bg-zinc-900" />
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
