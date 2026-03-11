import { motion } from 'framer-motion';

const skills = [
  {
    num: '01',
    category: '3D Creation',
    description: '넙스/폴리곤 혼합 숙련도 중심의 하이엔드 3D 워크플로우',
    tools: ['Blender', 'ZBrush', 'Plasticity', 'Substance Painter', 'Rhino 3D', 'Fusion 360'],
    skillItems: ['모델링', '텍스처링', '리깅', 'VFX', '3D 모션그래픽', '키 애니메이션', '쉐이딩', '컴포지팅', '지오메트리 노드', '하드서피스 모델링', '캐릭터 애니메이션', '절차적 모델링'],
  },
  {
    num: '02',
    category: 'Design & Visual',
    description: '브랜딩부터 영상까지, Adobe 생태계를 기반으로 한 통합 비주얼 역량',
    tools: ['Adobe Ps', 'Ai', 'Ae', 'Pr', 'Figma'],
    skillItems: ['UX/UI 디자인', '브랜딩', '캐릭터 디자인', '모션그래픽', '영상 편집', '컴포넌트 시스템'],
  },
  {
    num: '03',
    category: 'AI & Build',
    description: '단순 도구 활용을 넘어, AI로 실제 작동하는 시스템을 설계하고 구현',
    tools: ['Claude Code', 'Antigravity'],
    skillItems: ['프롬프트 엔지니어링', '서비스 기획', 'DB 설계', '정책 로직 설계', '웹 개발', '파이프라인 구축', 'AI 워크플로우'],
  },
];

const tagStyle: React.CSSProperties = {
  fontSize: '0.65rem',
  letterSpacing: '0.08em',
  fontFamily: "'DM Sans', sans-serif",
};

export const SkillStack = () => {
  return (
    <section className="w-full h-full flex flex-col justify-start md:justify-center py-16 px-12 md:px-24 overflow-y-auto bg-black" id="section-toolbox">
      <div className="max-w-6xl mx-auto w-full">

        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0, 0, 1] }}
          className="flex flex-col mb-10"
        >
          <h2
            className="text-white font-bold uppercase leading-none mb-4"
            style={{ fontSize: '2.5rem', fontFamily: "'DM Sans', sans-serif", letterSpacing: '-0.01em' }}
          >
            The Toolbox
          </h2>
          <p
            style={{ fontSize: '0.75rem', color: '#666', fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6 }}
          >
            도구의 경계가 무너지는 지점에서 새로운 가치를 창출합니다.<br />
            3D 설계부터 프론트엔드 시스템까지의 통합 숙련도입니다.
          </p>
        </motion.div>

        {/* 카드 3개 */}
        <div className="grid md:grid-cols-3 gap-4">
          {skills.map((group, idx) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.4, ease: [0.25, 0, 0, 1] }}
              className="p-6 bg-black border border-[#222]"
            >
              {/* 번호 */}
              <p
                className="uppercase mb-4"
                style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: '#666', fontFamily: "'DM Sans', sans-serif" }}
              >
                {group.num}
              </p>

              {/* 제목 */}
              <h3
                className="text-white font-bold uppercase mb-2"
                style={{ fontSize: '1.1rem', fontFamily: "'DM Sans', sans-serif", letterSpacing: '-0.01em' }}
              >
                {group.category}
              </h3>

              {/* 설명 */}
              <p
                className="mb-5 leading-relaxed"
                style={{ fontSize: '0.72rem', color: '#888', fontFamily: "'DM Sans', sans-serif" }}
              >
                {group.description}
              </p>

              {/* Tools */}
              <div className="mb-4">
                <p
                  className="uppercase mb-2"
                  style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: '#555', fontFamily: "'DM Sans', sans-serif" }}
                >
                  Tools
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {group.tools.map(tool => (
                    <span
                      key={tool}
                      className="px-2 py-0.5 text-white"
                      style={{ ...tagStyle, border: '1px solid #333' }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Skills */}
              {group.skillItems.length > 0 && (
                <div>
                  <p
                    className="uppercase mb-2"
                    style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: '#555', fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Skills
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {group.skillItems.map(skill => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 text-white"
                        style={{ ...tagStyle, border: '1px solid rgba(255,255,255,0.5)' }}
                      >
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
