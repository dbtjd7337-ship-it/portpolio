import { motion } from 'framer-motion';

export const ProjectADetail = () => {
  return (
    <section className="w-screen h-screen flex flex-col justify-center py-32 px-12 md:px-24 bg-[#050505] shrink-0" id="project-a">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="grid lg:grid-cols-2 gap-20 items-start"
        >
          <div>
            <div className="inline-block px-4 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold mb-6 tracking-widest uppercase">
              Case Study: Project A
            </div>
            <h2 className="text-5xl font-semibold mb-8 leading-tight uppercase">
              Modeling <br/>
              <span className="text-zinc-700">Digital Craftsmanship</span>
            </h2>
            <p className="text-xl text-zinc-400 mb-10 leading-relaxed">
               NURBS와 Polygon을 넘나드는 정교한 설계와 표현을 탐구합니다. 
               제품 디자인의 논리적 구조를 바탕으로 하드 서페이스부터 유기적인 생명체, 3D PFP 생성까지 다양한 영역의 모델링을 마스터했습니다.
            </p>

            <div className="space-y-6">
              {[
                { label: 'Surface Type', value: 'NURBS (Plasticity) & Polygon (Blender)' },
                { label: 'Specialty', value: 'Hard Surface, Product, Quadrupedalism' },
                { label: 'Output', value: 'High-Res Assets & 3D PFP Gen' }
              ].map(item => (
                <div key={item.label} className="flex justify-between items-center py-4 border-b border-zinc-900">
                  <span className="text-xs font-semibold text-zinc-500 uppercase tracking-[0.3em]">{item.label}</span>
                  <span className="text-lg font-medium text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="neomorphism rounded-[2.5rem] p-4 aspect-square flex flex-col items-center justify-center overflow-hidden border border-white/5">
              <div className="w-full h-full bg-[#0a0a0a] rounded-[2rem] p-8 font-mono text-xs overflow-hidden relative">
                <div className="text-cyan-500 mb-4 opacity-50">// System Logic Visualization</div>
                <div className="space-y-2">
                  <div className="flex gap-4 items-center">
                    <div className="w-4 h-4 bg-[#CCFF00]" />
                    <div className="h-2 w-32 bg-zinc-800 rounded" />
                  </div>
                  <div className="pl-8 border-l border-zinc-800 space-y-4 py-4">
                    <motion.div 
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    className="h-2 w-48 bg-zinc-800/50 rounded" />
                    <div className="h-2 w-32 bg-zinc-800/50 rounded" />
                    <div className="flex gap-2">
                      <div className="h-8 w-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40" />
                      <div className="h-8 w-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40" />
                    </div>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div className="w-4 h-4 rounded-full bg-cyan-500" />
                    <div className="h-2 w-24 bg-zinc-800 rounded" />
                  </div>
                </div>

                {/* Floating Labels */}
                <div className="absolute top-20 right-10 p-3 glass-morphism rounded-xl text-[10px] font-bold text-cyan-400">
                  DATA_SYNC: ACTIVE
                </div>
                <div className="absolute bottom-20 left-10 p-3 glass-morphism rounded-xl text-[10px] font-bold text-white">
                  POLICY_MATCH: 100%
                </div>
              </div>
            </div>

            {/* PROJECT A SUB-MEDIA PLACEHOLDER */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="aspect-video glass-morphism rounded-2xl overflow-hidden">
                <video autoPlay muted loop className="w-full h-full object-cover opacity-50">
                  <source src="/videos/project_a_demo.mp4" type="video/mp4" />
                </video>
                {/* 프로젝트 A 데모 영상(/public/videos/project_a_demo.mp4)을 업로드하세요. */}
              </div>
              <div className="aspect-video glass-morphism rounded-2xl overflow-hidden bg-white/5 flex items-center justify-center font-mono text-[10px] text-zinc-600">
                [ADD_IMAGE_HERE]
              </div>
            </div>
            
            {/* Background geometric shapes */}
            <div className="absolute -z-10 -top-10 -right-10 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
