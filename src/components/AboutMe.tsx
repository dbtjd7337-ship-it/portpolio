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
        '메테리얼 제작 및 에셋화',
      ],
    },
    {
      company: '주식회사 엘엘엔피',
      period: '2024.10 ~ 2026.02',
      role: 'Devdesign Studio',
      achievements: [
        'Titan Contents 2gatur app UX/UI 총괄 / 매니징 / 라이브 / NFT 디자인 기획, 제작, 발행',
        'Ridy 서비스 웹페이지 기획, 개발, 디자인, 운영, 마케팅',
      ],
    },
  ];

  const awards = [
    { year: '2020', title: 'IF concept design 제품디자인 부문 Winner (질병 예방 프로젝트)' },
    { year: '2023', title: 'IF design 브랜딩 외 3종 프로젝트 참여 Winner' },
    { year: '2024', title: 'IF design 브랜딩 외 1종 프로젝트 참여 Winner' },
  ];

  return (
    <section
      className="w-full h-full flex flex-col justify-start py-16 px-12 md:px-24 bg-black overflow-y-auto"
      id="section-about"
    >
      <div className="max-w-6xl mx-auto w-full space-y-6">

        {/* ─── 최상단 헤더 바 ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0, 0, 1] }}
          className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 border-b border-[#222] pb-4"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {/* 좌측: 이름 */}
          <div>
            <p className="text-white uppercase font-semibold" style={{ fontSize: '0.75rem', letterSpacing: '0.15em' }}>
              Kim You Seong
            </p>
            <p className="text-[#666]" style={{ fontSize: '0.7rem', letterSpacing: '0.1em' }}>
              김유성
            </p>
          </div>

          {/* 우측: 4열 정보 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-10 gap-y-4 md:text-right">
            {[
              { label: 'Born',    value: '1996.02.24' },
              { label: 'Degree',  value: 'Industrial Design' },
              { label: 'Contact', value: '+82 10 8756 1458' },
              { label: 'Email',   value: 'dbtjd7337@gmail.com' },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-[#666] uppercase" style={{ fontSize: '0.65rem', letterSpacing: '0.15em' }}>{label}</p>
                <p className="text-white font-semibold mt-0.5" style={{ fontSize: '0.72rem', letterSpacing: '0.04em' }}>{value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ─── 사진 + 자기소개 2단 ──────────────────────────────── */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">

          {/* 좌측: 인물 사진 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0, 0, 1], delay: 0.1 }}
            className="lg:col-span-4"
          >
            <div className="relative overflow-hidden" style={{ height: '200px' }}>
              <img
                src="/images/profile.webp"
                alt="Profile"
                className="w-full h-full object-cover grayscale"
                style={{
                  transform: 'scale(1.3)',
                  transformOrigin: '60% 22%',
                  objectPosition: '60% 22%',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <p className="text-white font-semibold uppercase" style={{ fontSize: '0.7rem', letterSpacing: '0.18em' }}>
                  Kim You Seong
                </p>
                <p className="text-[#666]" style={{ fontSize: '0.65rem', letterSpacing: '0.1em' }}>
                  Visual Logic Architect
                </p>
              </div>
            </div>
          </motion.div>

          {/* 우측: 자기소개 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0, 0, 1], delay: 0.15 }}
            className="lg:col-span-8 flex items-start"
          >
            <div className="border-l border-white pl-6 py-1">
              <p className="type-body leading-loose">
                <span className="text-white font-bold">NURBS 기반 제품 설계</span>와 <span className="text-white font-bold">블렌더 3D 시각화</span>로
                4년간 밀도 있는 결과물을 만들어왔습니다. 동시에 다양한 <span className="text-white font-bold">AI 툴과 에이전트</span>를
                깊이 파고들었고, 이제 그 둘을 합칠 단계에 와 있습니다.
                블렌더 애드온을 AI로 직접 제작해 반복 작업을 자동화하고,
                에이전트가 각 공정을 처리하는 동안 저는 전체 방향만 잡는
                <span className="text-white font-bold"> 파이프라인을 설계</span>하고 있습니다.
              </p>
            </div>
          </motion.div>
        </div>

        {/* ─── Education ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: [0.25, 0, 0, 1] }}
        >
          <p className="uppercase text-[#666] mb-3" style={{ fontSize: '0.65rem', letterSpacing: '0.25em', fontFamily: "'DM Sans', sans-serif" }}>
            Education
          </p>
          <div className="flex justify-between items-baseline py-3 border-b border-[#222]">
            <div>
              <span className="text-white font-bold text-sm">상명대학교</span>
              <span className="text-[#888] text-xs ml-3">산업디자인학과</span>
            </div>
            <span className="text-[#666] text-xs text-right" style={{ fontFamily: "'DM Sans', sans-serif" }}>2014.03 ~ 2022.02</span>
          </div>
        </motion.div>

        {/* ─── Experience & Awards ──────────────────────────────── */}
        <div className="grid md:grid-cols-2 gap-10">

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: [0.25, 0, 0, 1] }}
          >
            <p className="uppercase text-[#666] mb-3" style={{ fontSize: '0.65rem', letterSpacing: '0.25em', fontFamily: "'DM Sans', sans-serif" }}>
              Experience
            </p>
            {experiences.map((exp, i) => (
              <div key={i} className="border-b border-[#222] py-4">
                <div className="flex justify-between items-baseline gap-4 mb-1">
                  <span className="text-white font-bold text-sm">{exp.company}</span>
                  <span className="text-[#666] text-xs shrink-0" style={{ fontFamily: "'DM Sans', sans-serif" }}>{exp.period}</span>
                </div>
                <p className="text-[#888] mb-3" style={{ fontSize: '0.72rem' }}>{exp.role}</p>
                <div className="space-y-1.5">
                  {exp.achievements.map((item, j) => (
                    <p key={j} className="text-[#888] border-b border-[#222] pb-1.5" style={{ fontSize: '0.72rem', lineHeight: 1.5 }}>
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: [0.25, 0, 0, 1] }}
          >
            <p className="uppercase text-[#666] mb-3" style={{ fontSize: '0.65rem', letterSpacing: '0.25em', fontFamily: "'DM Sans', sans-serif" }}>
              Awards
            </p>
            {awards.map((award, i) => (
              <div key={i} className="flex justify-between items-baseline gap-6 py-3 border-b border-[#222]">
                <span className="text-white font-bold text-sm shrink-0">{award.year}</span>
                <span className="text-[#888] text-right" style={{ fontSize: '0.72rem', lineHeight: 1.5 }}>{award.title}</span>
              </div>
            ))}
          </motion.div>

        </div>

      </div>
    </section>
  );
};
