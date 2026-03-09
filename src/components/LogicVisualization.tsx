import { motion } from 'framer-motion';

const logicSteps = [
  { id: 'context', label: 'Contextual Framing', color: 'from-blue-400 to-indigo-500' },
  { id: 'cot', label: 'Chain of Thought', color: 'from-indigo-400 to-purple-500' },
  { id: 'optim', label: 'Prompt Optimization', color: 'from-purple-400 to-pink-500' },
  { id: 'system', label: 'Web/Admin System', color: 'from-pink-400 to-cyan-500' },
];

export const LogicVisualization = () => {
  return (
    <section className="w-screen h-screen flex flex-col justify-center py-24 px-12 md:px-24 shrink-0 relative" id="section-designlogic">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16">
          <h2 className="text-5xl font-semibold tracking-tighter mb-4 md:mb-0 uppercase">
            DESIGN <span className="text-cyan-400">LOGIC</span>
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
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="z-10 w-full md:w-56"
            >
              <div className="glass-morphism rounded-2xl p-6 relative group overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                <div className="mb-4 text-xs font-semibold text-cyan-500/50 uppercase tracking-[0.3em] font-mono">
                  Phase 0{index + 1}
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
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

        <div className="mt-20 p-8 neomorphism rounded-3xl border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-zinc-700 leading-none select-none">
            {`FOR (SYSTEM IN STACK) {\n  IF (DESIGN == LOGIC) EXECUTE();\n}`}
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h4 className="text-2xl font-bold mb-4">"Prompting is the New Logic Architecture."</h4>
              <p className="text-zinc-400 leading-relaxed text-sm">
                프롬프트의 맥락(Context)을 설계하고, 모델의 사고 과정(CoT)을 최적화하며, 
                이를 실제 작동하는 웹/어드민 시스템과 결합합니다. 단순히 도구로서의 AI를 넘어, 
                시스템 전체의 효율을 극대화하는 'AI & Web Architect'로서의 역량을 시각화합니다.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="text-3xl font-semibold text-white mb-1 font-mono">99%</div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-semibold font-mono">Logic Precision</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="text-3xl font-semibold text-white mb-1 font-mono">∞</div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-semibold font-mono">Hybrid Vision</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
