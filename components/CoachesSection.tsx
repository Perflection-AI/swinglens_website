import React from 'react';
import { ClipboardList, GraduationCap, CheckCircle2, ArrowRight } from 'lucide-react';

interface CoachesSectionProps {
  onOpenModal: (title?: string) => void;
}

export const CoachesSection: React.FC<CoachesSectionProps> = ({ onOpenModal }) => {
  return (
    <section id="solutions" className="py-24 bg-golf-50 relative overflow-hidden border-t border-ink/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-ink mb-4">
            Built for <span className="text-gold">Coaches</span> & <span className="text-gradient">Students</span>
          </h2>
          <p className="text-lg text-subtle">
            Streamlining the technical workflow for pros while accelerating improvement for players.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* COACHES CARD */}
          <div className="bg-white rounded-[2rem] p-8 border border-ink/10 shadow-soft hover:shadow-soft-lg transition-all duration-300 relative overflow-hidden group flex flex-col">
            {/* Top Accent - Changed from Black to Gold */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gold"></div>
            
            <div className="flex justify-between items-start mb-6">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-bold uppercase tracking-wide font-mono border border-gold/20">
                    For Coaches
                </div>
                <ClipboardList className="w-6 h-6 text-subtle" />
            </div>

            <h3 className="text-2xl font-display font-bold text-ink mb-3">Automated Screening & Triage</h3>
            <p className="text-subtle text-base mb-8">
               Eliminate manual video review time. Our AI handles the first pass so you can focus on high-value coaching.
            </p>

            <ul className="space-y-4 mb-8 flex-grow">
               <li className="flex items-start gap-3">
                 <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                 <span className="text-ink text-sm font-medium">Auto-detection of swing faults (Sway, Early Extension)</span>
               </li>
               <li className="flex items-start gap-3">
                 <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                 <span className="text-ink text-sm font-medium">Instant skeletal & angular biomechanics data</span>
               </li>
               <li className="flex items-start gap-3">
                 <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                 <span className="text-ink text-sm font-medium">AI-drafted lesson notes & drill recommendations</span>
               </li>
            </ul>

            <div className="pt-6 border-t border-ink/5">
               <button 
                 onClick={() => onOpenModal('Join Waitlist')}
                 className="flex items-center gap-2 text-gold font-bold text-sm hover:text-gold-600 transition-colors group"
               >
                  View Dashboard <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
               </button>
            </div>
          </div>

          {/* STUDENTS CARD */}
          <div className="bg-white rounded-[2rem] p-8 border border-ink/10 shadow-soft hover:shadow-soft-lg transition-all duration-300 relative overflow-hidden group flex flex-col">
             <div className="absolute top-0 left-0 w-full h-1.5 bg-golf-500"></div>

             <div className="flex justify-between items-start mb-6">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-golf-100 text-golf-800 text-xs font-bold uppercase tracking-wide font-mono border border-golf-200">
                    For Students
                </div>
                <GraduationCap className="w-6 h-6 text-subtle" />
            </div>

            <h3 className="text-2xl font-display font-bold text-ink mb-3">24/7 Feedback Loop</h3>
            <p className="text-subtle text-base mb-8">
               Bridge the gap between lessons. Get instant feedback on your practice sessions based on your coach's plan.
            </p>

            <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-start gap-3">
                 <CheckCircle2 className="w-5 h-5 text-golf-500 flex-shrink-0 mt-0.5" />
                 <span className="text-ink text-sm font-medium">Real-time practice analysis & rep counting</span>
               </li>
               <li className="flex items-start gap-3">
                 <CheckCircle2 className="w-5 h-5 text-golf-500 flex-shrink-0 mt-0.5" />
                 <span className="text-ink text-sm font-medium">Visual trend tracking over weeks and months</span>
               </li>
               <li className="flex items-start gap-3">
                 <CheckCircle2 className="w-5 h-5 text-golf-500 flex-shrink-0 mt-0.5" />
                 <span className="text-ink text-sm font-medium">Gamified drills to reinforce technique</span>
               </li>
            </ul>

            <div className="pt-6 border-t border-ink/5">
               <button 
                 onClick={() => onOpenModal('Join Waitlist')}
                 className="flex items-center gap-2 text-golf-600 font-bold text-sm hover:text-golf-700 transition-colors group"
               >
                  Start Training <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
               </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};