import { motion } from 'framer-motion';

const logicSteps = [
  { id: 'context', label: 'Contextual Framing', color: 'from-blue-400 to-indigo-500' },
  { id: 'cot',     label: 'Chain of Thought',   color: 'from-indigo-400 to-purple-500' },
  { id: 'optim',   label: 'Prompt Optimization', color: 'from-purple-400 to-pink-500' },
  { id: 'system',  label: 'Web/Admin System',    color: 'from-pink-400 to-cyan-500' },
];

export const AIx3D = () => {
  return (
    <section
      className="w-full h-full flex flex-col justify-start py-20 px-12 md:px-24 overflow-y-auto overflow-x-hidden"
      id="section-aix3d"
    >

      <div className="max-w-6xl mx-auto w-full space-y-16 relative z-10">

        {/* ─── PART 1: AI × 3D ─────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">

          {/* Left: Content */}
          <div className="lg:col-span-7 space-y-8">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0, 0, 1] }}
              viewport={{ once: true }}
            >
              <div className="inline-block px-4 py-1 border border-[#CCFF00] text-[#CCFF00] type-mono mb-6">
                Hybrid Capability
              </div>
              <div className="flex gap-4 items-end">
                <h2 className="type-section">
                  AI <span className="text-[#CCFF00]">×</span> 3D
                </h2>
                <div className="h-[1px] flex-grow bg-zinc-900 mb-2" />
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-white leading-loose text-sm border-l-2 border-[#CCFF00] pl-6 py-2"
            >
              AI 툴을 쓰는 사람은 많습니다. 저는 다릅니다.<br />
              프롬프트 엔지니어링으로 서비스 기획과 DB 구조, 정책 로직까지 직접 설계하고 —<br />
              실제로 운영되며 수익에 기여하는 웹서비스를 혼자 만들어냈습니다.<br />
              3D 작업에서도 컨셉 구조화, 파이프라인 설계, 클라이언트 커뮤니케이션 전반에<br />
              AI가 녹아있습니다.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              <span className="text-[#CCFF00] text-sm font-normal">
                "The 3D artist who engineers the prompt."
              </span>
            </motion.div>

          </div>

          {/* Right: Image Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0, 0, 1], delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <div className="aspect-[4/5] border border-[#222] relative overflow-hidden">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5">
                <div className="text-zinc-700 font-mono text-xs uppercase tracking-widest">
                  [IMAGE PLACEHOLDER]
                </div>
                <div className="text-zinc-800 font-mono text-[10px]">
                  /public/images/ai3d.jpg
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* ─── DIVIDER ──────────────────────────────────────────────────── */}
        <div className="h-[1px] bg-zinc-800/50 w-full" />

        {/* ─── PART 2: DESIGN LOGIC ─────────────────────────────────────── */}
        <div>

          <div className="flex flex-col md:flex-row items-center justify-between mb-16">
            <h2 className="type-section mb-4 md:mb-0">
              DESIGN <span className="text-[#CCFF00]">LOGIC</span>
            </h2>
            <p className="text-zinc-500 max-w-md text-right">
              단순한 장식을 넘어, 시스템의 정책과 로직이 시각화되는 과정을 설계합니다.
            </p>
          </div>

          <div className="relative flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4 py-8">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-zinc-800 hidden md:block z-0" />

            {logicSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4, ease: [0.25, 0, 0, 1] }}
                viewport={{ once: true }}
                className="z-10 w-full md:w-56"
              >
                <div className="border border-[#222] p-6 relative group overflow-hidden">
                  <div className="mb-4 type-mono text-[#666666]">
                    Phase 0{index + 1}
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-[#CCFF00] transition-colors">
                    {step.label}
                  </h3>
                  <div className="h-1 w-8 bg-zinc-800 group-hover:w-full transition-all duration-500" />
                </div>

                {index < logicSteps.length - 1 && (
                  <div className="md:hidden flex justify-center py-4">
                    <div className="h-8 w-[1px] bg-zinc-800" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="mt-12 p-8 border border-[#222] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-zinc-700 leading-none select-none">
              {`FOR (SYSTEM IN STACK) {\n  IF (DESIGN == LOGIC) EXECUTE();\n}`}
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h4 className="text-xl font-semibold mb-4">"Prompting is the New Logic Architecture."</h4>
                <p className="type-body">
                  프롬프트의 맥락(Context)을 설계하고, 모델의 사고 과정(CoT)을 최적화하며,
                  이를 실제 작동하는 웹/어드민 시스템과 결합합니다. 단순히 도구로서의 AI를 넘어,
                  시스템 전체의 효율을 극대화하는 'AI &amp; Web Architect'로서의 역량을 시각화합니다.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border border-[#222]">
                  <div className="text-2xl font-semibold text-white mb-1">99%</div>
                  <div className="type-mono text-[#666666]">Logic Precision</div>
                </div>
                <div className="p-4 border border-[#222]">
                  <div className="text-2xl font-semibold text-white mb-1">∞</div>
                  <div className="type-mono text-[#666666]">Hybrid Vision</div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
