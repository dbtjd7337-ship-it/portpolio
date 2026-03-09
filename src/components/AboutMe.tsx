import { motion } from 'framer-motion';

export const AboutMe = () => {
  const experiences = [
    {
      company: 'Lambda256',
      period: '2022.05. ~ 2024.09',
      role: '사업부 크리에이티브',
      achievements: [
        '3D 디지털 콘텐츠 디자인 리드 및 제작',
        '3D 영상 콘티 및 영상 제작',
        '캐릭터 디자인 및 제작',
        '리깅 및 애니메이팅',
        'VFX 및 지오메트리 노드 제작 및 에셋화',
        '메테리얼 제작 및 에셋화'
      ]
    },
    {
      company: '주식회사 엘엘엔피',
      period: '2024.10 ~ 2026.02',
      role: 'Devdesign Studio',
      achievements: [
        'Titan Contents 2gatur app UX/UI 총괄 / 매니징 / 라이브 / NFT 디자인 기획, 제작, 발행',
        'Ridy 서비스 웹페이지 기획, 개발, 디자인, 운영, 마케팅'
      ]
    }
  ];

  const awards = [
    { year: '2020', title: 'IF concept design 제품디자인 부문 Winner (질병 예방 프로젝트)' },
    { year: '2023', title: 'IF design 브랜딩 외 3종 프로젝트 참여 Winner' },
    { year: '2024', title: 'IF design 브랜딩 외 1종 프로젝트 참여 Winner' }
  ];

  return (
    <section className="w-full h-full flex flex-col justify-center px-12 md:px-24 bg-black overflow-y-auto" id="section-about">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">

        {/* Left: Large Profile Image */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.4, ease: [0.25, 0, 0, 1] }}
           viewport={{ once: true }}
           className="lg:col-span-4"
        >
          <div className="relative aspect-[3/4] overflow-hidden border border-[#222] group">
            <img
              src="/images/profile.jpg"
              alt="Profile"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-6 left-6">
              <div className="text-[#CCFF00] font-semibold text-lg tracking-widest uppercase">KIM YOU SEONG</div>
              <div className="type-mono text-[#666666] mt-1">Visual Logic Architect</div>
            </div>
          </div>
        </motion.div>

        {/* Center/Right: Info & Details */}
        <div className="lg:col-span-8 space-y-8">

          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.4, ease: [0.25, 0, 0, 1], delay: 0.1 }}
             viewport={{ once: true }}
          >
            <div className="flex gap-4 items-end mb-6">
              <h2 className="type-section">ABOUT <span className="text-[#CCFF00]">ME</span></h2>
              <div className="h-[1px] flex-grow bg-zinc-900 mb-2" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div>
                <div className="type-mono text-[#666666] mb-1">Born</div>
                <div className="text-white text-sm font-semibold">1996.02.24</div>
              </div>
              <div>
                <div className="type-mono text-[#666666] mb-1">Degree</div>
                <div className="text-white text-sm font-semibold">Industrial Design</div>
              </div>
              <div>
                <div className="type-mono text-[#666666] mb-1">Contact</div>
                <div className="text-white text-sm font-semibold">+82 10 8756 1458</div>
              </div>
              <div>
                <div className="type-mono text-[#666666] mb-1">Email</div>
                <div className="text-white text-sm font-semibold">dbtjd7337@gmail.com</div>
              </div>
            </div>

            <p className="type-body max-w-3xl border-l-2 border-[#CCFF00] pl-6 py-2">
              대학 시절 전공한 <span className="text-white font-bold underline decoration-cyan-500/50">제품 디자인(NURBS)</span>의 정교한 설계 감각을 익혔고, 이를 <span className="text-white font-bold underline decoration-cyan-500/50">3D 시각화(Polygon)</span>와 결합해 밀도 높은 결과물을 만들어냅니다. 단순히 심미적인 디자인을 넘어 프로젝트의 정책과 로직을 직접 설계하며 AI와 코드를 활용해 실제 작동하는 시스템까지 구현하는 '문제 해결형 디자이너'입니다.
            </p>
          </motion.div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="type-category mb-3">Education</h3>
            <div className="p-4 border border-[#222] flex justify-between items-center">
              <div>
                <div className="text-base font-bold text-white">상명대학교</div>
                <div className="text-xs text-[#CCFF00] font-bold mt-1">산업디자인학과</div>
              </div>
              <span className="type-mono text-[#666666]">2014.03 ~ 2022.02</span>
            </div>
          </motion.div>

          {/* Experience & Awards Row */}
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-3"
            >
              <h3 className="type-category">Experience</h3>
              <div className="space-y-3">
                {experiences.map((exp, i) => (
                  <div key={i} className="p-4 border border-[#222]">
                    <div className="flex justify-between items-start mb-1.5 gap-2">
                      <h4 className="font-bold text-base text-white leading-tight hover:text-[#CCFF00] cursor-default">{exp.company}</h4>
                      <span className="text-xs font-mono text-[#666666] shrink-0">{exp.period}</span>
                    </div>
                    <div className="text-xs text-[#CCFF00] font-bold mb-2.5">{exp.role}</div>
                    <ul className="space-y-1">
                      {exp.achievements.map((item, j) => (
                        <li key={j} className="text-xs text-[#666666] flex items-start gap-2">
                          <span className="text-[#CCFF00] mt-0.5 shrink-0">·</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-3"
            >
              <h3 className="type-category">Awards</h3>
              <div className="space-y-2.5">
                {awards.map((award, i) => (
                  <div key={i} className="flex gap-4 items-start p-4 border border-[#222]">
                    <span className="font-semibold text-[#CCFF00] text-base leading-tight shrink-0">{award.year}</span>
                    <span className="text-white text-sm leading-snug">{award.title}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
