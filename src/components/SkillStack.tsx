import { motion } from 'framer-motion';

const skills = [
  {
    category: '3D Creation',
    description: '넙스/폴리곤 혼합 숙련도 중심의 하이엔드 3D 워크플로우',
    tools: ['Blender', 'ZBrush', 'Plasticity', 'Substance Painter', 'Rhino 3D', 'Fusion 360'],
    skillItems: ['모델링', '텍스처링', '리깅', 'VFX', '3D 모션그래픽', '키 애니메이션', '쉐이딩', '컴포지팅', '지오메트리 노드'],
    icon: '✦',
    color: 'border-zinc-700'
  },
  {
    category: 'Design & Visual',
    description: '브랜딩부터 영상까지, Adobe 생태계를 기반으로 한 통합 비주얼 역량',
    tools: ['Adobe Ps', 'Ai', 'Ae', 'Pr', 'Id', 'XD'],
    skillItems: [],
    icon: '⌘',
    color: 'border-zinc-700'
  },
  {
    category: 'AI & Build',
    description: '단순 도구 활용을 넘어, AI로 실제 작동하는 시스템을 설계하고 구현',
    tools: ['Claude Code', 'Antigravity'],
    skillItems: ['프롬프트 엔지니어링', '서비스 기획', 'DB 설계', '정책 로직 설계'],
    icon: '⚡',
    color: 'border-zinc-700'
  }
];

export const SkillStack = () => {
  return (
    <section className="w-full h-full flex flex-col justify-center px-12 md:px-24 overflow-y-auto" id="section-toolbox">
      <div className="max-w-6xl">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <h2 className="type-section mb-4">
            The <span className="text-[#CCFF00]">Toolbox</span>
          </h2>
          <p className="text-zinc-500 max-w-xl">
            도구의 경계가 무너지는 지점에서 새로운 가치를 창출합니다. 3D 설계부터 프론트엔드 시스템까지의 통합 숙련도입니다.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {skills.map((group, idx) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.4, ease: [0.25, 0, 0, 1] }}
              className="p-6 border border-[#222] group hover:bg-[#111] transition-all duration-300"
            >
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform origin-left">{group.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-white uppercase tracking-tight group-hover:text-[#CCFF00] transition-colors duration-200">{group.category}</h3>
              <p className="text-xs text-zinc-500 mb-5 leading-relaxed">{group.description}</p>

              {/* Tools */}
              <div className="mb-4">
                <div className="type-mono text-[#666666] mb-2">Tools</div>
                <div className="flex flex-wrap gap-2">
                  {group.tools.map(tool => (
                    <span key={tool} className="px-2 py-0.5 border border-[#222] text-[10px] font-bold text-white" style={{ letterSpacing: '0.1em', fontFamily: "'DM Sans', sans-serif" }}>
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Skills */}
              {group.skillItems.length > 0 && (
                <div>
                  <div className="type-mono text-[#666666] mb-2">Skills</div>
                  <div className="flex flex-wrap gap-2">
                    {group.skillItems.map(skill => (
                      <span key={skill} className="px-2 py-0.5 border border-[#CCFF00]/30 text-[10px] font-bold text-[#CCFF00]" style={{ letterSpacing: '0.1em', fontFamily: "'DM Sans', sans-serif" }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
