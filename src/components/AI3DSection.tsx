import { motion } from 'framer-motion';

const pipeline = [
  {
    id: 'prompt',
    phase: '01',
    label: 'AI Prompt Design',
    color: 'from-cyan-400 to-blue-500',
  },
  {
    id: 'concept',
    phase: '02',
    label: 'Concept Generation',
    color: 'from-blue-400 to-indigo-500',
  },
  {
    id: 'model',
    phase: '03',
    label: '3D Asset Creation',
    color: 'from-indigo-400 to-purple-500',
  },
  {
    id: 'output',
    phase: '04',
    label: 'AI Post-Process',
    color: 'from-purple-400 to-cyan-500',
  },
];

export const AI3DSection = () => {
  return (
    <section
      className="w-screen h-screen flex flex-col justify-center py-24 px-12 md:px-24 shrink-0 relative"
      id="ai3d"
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-16">
          <h2 className="text-5xl font-semibold tracking-tighter mb-4 md:mb-0 uppercase">
            AI <span className="text-cyan-400">×</span> 3D
          </h2>
          <p className="text-zinc-500 max-w-md text-right">
            AI의 생성 능력과 3D 설계의 정밀함을 결합한 하이브리드 크리에이티브 파이프라인.
          </p>
        </div>

        {/* Pipeline Steps */}
        <div className="relative flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4 py-8">
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-zinc-800 hidden md:block z-0" />

          {pipeline.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              viewport={{ once: true }}
              className="z-10 w-full md:w-56"
            >
              <div className="glass-morphism rounded-2xl p-6 relative group overflow-hidden">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />
                <div className="mb-4 text-xs font-semibold text-cyan-500/50 uppercase tracking-[0.3em] font-mono">
                  Phase {step.phase}
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                  {step.label}
                </h3>
                <div className="h-1 w-8 bg-zinc-800 group-hover:w-full transition-all duration-500" />
              </div>

              {index < pipeline.length - 1 && (
                <div className="md:hidden flex justify-center py-4">
                  <div className="h-8 w-[1px] bg-zinc-800" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom Panel */}
        <div className="mt-16 p-8 neomorphism rounded-3xl border border-white/5 relative overflow-hidden">
          {/* Decorative mono code */}
          <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-zinc-700 leading-relaxed select-none">
            {`AI.generate(concept) → mesh;\nmesh.sculpt(precision) → asset;\nasset.texture(AI) → render;`}
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* Left: Text + Stats */}
            <div>
              <h4 className="text-2xl font-bold mb-4">
                "AI is the new modeling reference."
              </h4>
              <p className="text-zinc-400 leading-relaxed text-sm mb-6">
                Midjourney · ComfyUI로 컨셉을 시각화하고, Blender · ZBrush · Plasticity로
                정밀하게 구현합니다. 생성 AI와 3D 설계의 경계를 허물어, 아이디어에서
                하이엔드 에셋까지의 전체 파이프라인을 단독으로 내재화했습니다.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-3xl font-semibold text-white mb-1 font-mono">×10</div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-semibold font-mono">
                    Concept Speed
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-3xl font-semibold text-white mb-1 font-mono">Full</div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-semibold font-mono">
                    Pipeline Owner
                  </div>
                </div>
              </div>
            </div>

            {/* Right: 3D×AI Viewport Mock */}
            <div className="relative aspect-[4/3] bg-[#050505] rounded-3xl border border-white/5 overflow-hidden">
              {/* Cyan grid overlay */}
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage:
                    'linear-gradient(#06b6d4 1px, transparent 1px), linear-gradient(90deg, #06b6d4 1px, transparent 1px)',
                  backgroundSize: '28px 28px',
                }}
              />

              {/* Wireframe rings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
                  className="w-32 h-32 border border-cyan-500/20 rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
                  className="absolute w-20 h-20 border border-cyan-400/30 rounded-full"
                />
                <div className="absolute w-4 h-4 rounded-full bg-cyan-500/40 blur-md" />
                <div className="absolute w-2 h-2 rounded-full bg-cyan-400" />
              </div>

              {/* AI Terminal */}
              <div className="absolute bottom-0 left-0 right-0 px-5 py-4 bg-gradient-to-t from-black/90 to-transparent">
                <div className="font-mono text-[10px] text-cyan-500/40 mb-1">
                  // AI_3D_PIPELINE: ACTIVE
                </div>
                <motion.div
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ repeat: Infinity, duration: 1.8 }}
                  className="font-mono text-xs text-cyan-400"
                >
                  &gt; generate("mech_v3.blend") ▋
                </motion.div>
              </div>

              {/* Status tags */}
              <div className="absolute top-4 left-4 glass-morphism rounded-xl px-3 py-1.5 text-[10px] font-semibold text-cyan-400 font-mono">
                MESH: READY
              </div>
              <div className="absolute top-4 right-4 flex items-center gap-1.5 glass-morphism rounded-xl px-3 py-1.5 text-[10px] font-semibold text-white font-mono">
                <motion.div
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                />
                AI: RUN
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
