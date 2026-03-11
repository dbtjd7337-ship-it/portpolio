import { motion } from 'framer-motion';

const pillars = [
  {
    num: '01',
    title: 'MAKE',
    desc: '하이엔드 3D 에셋을 처음부터 끝까지. 모델링·텍스처링·리깅·렌더링·컴포지팅 전 과정을 단독으로 완성한다.',
  },
  {
    num: '02',
    title: 'THINK',
    desc: 'AI를 도구가 아닌 설계 언어로 사용한다. 서비스 구조, 정책 로직, DB 설계를 프롬프트 기반으로 아키텍처화한다.',
  },
  {
    num: '03',
    title: 'BUILD',
    desc: '기획한 시스템을 실제로 운영되는 서비스로 구현한다. 3D 파이프라인도, 웹서비스도 직접 배포까지 완수한다.',
  },
];

const phases = [
  {
    phase: '01',
    label: 'AI Prompt Design',
    desc: '맥락을 설계해 AI가 올바른 방향으로 작동하게 한다.',
  },
  {
    phase: '02',
    label: '3D Asset Creation',
    desc: '컨셉에서 하이엔드 에셋까지 전 과정을 직접 완성한다.',
  },
  {
    phase: '03',
    label: 'Logic Architecture',
    desc: '서비스 정책과 DB 구조를 프롬프트 기반으로 설계한다.',
  },
  {
    phase: '04',
    label: 'Build & Deploy',
    desc: '실제 작동하고 수익에 기여하는 시스템으로 구현한다.',
  },
];

export const AIx3D = () => {
  return (
    <section
      className="w-full h-full flex flex-col justify-start md:justify-center py-16 px-12 md:px-24 overflow-y-auto"
      id="section-aix3d"
    >
      <div className="max-w-6xl mx-auto w-full">

        {/* ─── 상단: 섹션 레이블 + 헤드라인 ──────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0, 0, 1] }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div
            className="uppercase mb-4"
            style={{ fontSize: '0.65rem', letterSpacing: '0.25em', color: '#555', fontFamily: "'DM Sans', sans-serif" }}
          >
            Hybrid Capability
          </div>
          <h2
            className="text-white font-bold uppercase leading-none"
            style={{ fontSize: '2.5rem', fontFamily: "'DM Sans', sans-serif", letterSpacing: '-0.01em' }}
          >
            AI × 3D × BUILD
          </h2>
        </motion.div>

        {/* ─── 중단: 01 MAKE / 02 THINK / 03 BUILD ────────────────── */}
        <div className="mb-12">
          {pillars.map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4, ease: [0.25, 0, 0, 1] }}
              viewport={{ once: true }}
              className="flex items-baseline gap-8 py-5 border-b border-[#222]"
            >
              <span
                className="shrink-0 w-6"
                style={{ fontSize: '0.65rem', color: '#555', fontFamily: "'DM Sans', sans-serif" }}
              >{p.num}</span>
              <span
                className="font-bold uppercase text-white shrink-0 w-24"
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', letterSpacing: '0.04em' }}
              >
                {p.title}
              </span>
              <span className="type-body leading-relaxed" style={{ color: '#888' }}>{p.desc}</span>
            </motion.div>
          ))}
        </div>

        {/* ─── 하단: PHASE 01~04 카드 ──────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          {phases.map((ph, i) => (
            <motion.div
              key={ph.phase}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4, ease: [0.25, 0, 0, 1] }}
              viewport={{ once: true }}
              className="p-5 bg-black transition-colors duration-200"
              style={{ border: '1px solid #222' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#fff'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#222'; }}
            >
              <p
                className="uppercase mb-3"
                style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: '#555', fontFamily: "'DM Sans', sans-serif" }}
              >PHASE {ph.phase}</p>
              <h4
                className="text-white font-bold mb-2 leading-tight"
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem' }}
              >
                {ph.label}
              </h4>
              <p className="leading-relaxed" style={{ fontSize: '0.72rem', color: '#888', fontFamily: "'DM Sans', sans-serif" }}>
                {ph.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ─── 최하단: 마무리 문구 ──────────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center text-white uppercase"
          style={{ fontSize: '0.75rem', letterSpacing: '0.2em', fontFamily: "'DM Sans', sans-serif" }}
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          The 3D artist who engineers the prompt — and ships the product.
        </motion.p>

      </div>
    </section>
  );
};
