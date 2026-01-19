import React, { useState } from 'react';
import { PlayCircle, ArrowRight, Zap } from 'lucide-react';

interface HeroProps {
  onOpenModal: (title?: string) => void;
}

// Configuration for which overlays to show for each image
interface SwingScoreData {
  score: number;
  percentage: string;
  progressBarWidth: number; // 0-100
  message: string;
}

interface OverlayConfig {
  recordingButton: boolean;
  swingScore: boolean | SwingScoreData;
  carryDistance: boolean;
  analysisLines: boolean;
}

const imageOverlayConfig: Record<string, OverlayConfig> = {
  '/assets/IMG_8680.jpg': {
    recordingButton: false,
    swingScore: false,
    carryDistance: false,
    analysisLines: false,
  },
  '/assets/IMG_8683.jpg': {
    recordingButton: true,
    swingScore: {
      score: 82,
      percentage: '+4.2%',
      progressBarWidth: 60,
      message: 'Excellent tempo control'
    },
    carryDistance: true,
    analysisLines: false,
  },
  '/assets/IMG_8686.jpg': {
    recordingButton: false,
    swingScore: false,
    carryDistance: false,
    analysisLines: false,
  },
  '/assets/IMG_8687.jpg': {
    recordingButton: true,
    swingScore: {
      score: 67,
      percentage: '+1.2%',
      progressBarWidth: 60,
      message: 'Powerful guy, keep grinding!'
    },
    carryDistance: true,
    analysisLines: false,
  },
};

export const Hero: React.FC<HeroProps> = ({ onOpenModal }) => {
  // Array of all images
  const images = [
    '/assets/IMG_8680.jpg',
    '/assets/IMG_8683.jpg',
    '/assets/IMG_8686.jpg',
    '/assets/IMG_8687.jpg'
  ];
  
  // Randomly select one image index on component mount
  const [currentImageIndex, setCurrentImageIndex] = useState(() => {
    return Math.floor(Math.random() * images.length);
  });
  
  // Get the current selected image
  const currentImage = images[currentImageIndex];
  
  // Get overlay configuration for current image
  const overlayConfig: OverlayConfig = imageOverlayConfig[currentImage] || {
    recordingButton: false,
    swingScore: false,
    carryDistance: false,
    analysisLines: false,
  };
  
  // Handle image click to cycle to next image
  const handleImageClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  return (
    <section className="relative pt-24 pb-12 lg:pt-36 lg:pb-20 overflow-hidden bg-paper bg-grid-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <div className="max-w-2xl relative z-10">
            {/* Removed Lit Shadow */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-golf-100 border border-golf-200 shadow-sm text-golf-700 text-xs font-bold uppercase tracking-wide mb-8 animate-fade-in-up font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-golf-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-golf-500"></span>
              </span>
              Powered by AI
            </div>
            
            <h1 className="text-5xl lg:text-7xl tracking-tight text-ink leading-[1.1] mb-6 font-display font-extrabold">
              Your Personal <br />
              <span className="text-gradient">AI Golf Coach</span>
            </h1>
            
            <p className="text-lg text-subtle mb-10 leading-relaxed max-w-lg font-normal">
              Master your swing with professional-grade biomechanics analysis. Real-time feedback in your pocket, powered by computer vision.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Removed Lit Shadow */}
              <button 
                onClick={() => onOpenModal('Start Free Trial')}
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-golf-600 rounded-xl shadow-card hover:bg-golf-500 hover:shadow-soft-lg hover:-translate-y-0.5 transition-all duration-200 border border-golf-500"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              
              <a 
                href="https://youtu.be/SZ-Vyme7HMM" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-ink bg-white border border-ink/10 rounded-xl shadow-card hover:bg-golf-50 transition-all duration-200"
              >
                <PlayCircle className="mr-2 w-5 h-5 text-golf-400" />
                Watch Demo
              </a>
            </div>

            <div className="mt-12 flex items-center gap-4 text-sm font-medium text-subtle">
               <div className="flex -space-x-3">
                 {[1,2,3,4].map(i => (
                   <img key={i} className="w-10 h-10 rounded-full border-2 border-paper shadow-sm" src={`https://picsum.photos/100/100?random=${i}`} alt="User" />
                 ))}
               </div>
               <div>
                 <div className="flex text-gold text-xs mb-0.5">★★★★★</div>
               </div>
            </div>
          </div>

          <div className="relative lg:h-[650px] flex items-center justify-center perspective-1000">
             {/* Decorative Background - Lighter Fresher Greens */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-golf-200/60 rounded-full -z-10"></div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] border border-golf-300/40 rounded-full -z-10"></div>

             {/* Phone Mockup - Changed bg-ink (2c2c2c) from bg-slate-900 */}
             <div className="relative w-[300px] h-[600px] bg-ink rounded-[2.5rem] shadow-soft-xl border-[8px] border-ink overflow-hidden transform rotate-[-3deg] hover:rotate-0 transition-all duration-700 ease-out z-10 ring-1 ring-white/20">
                
                {/* Screen Content */}
                <div className="absolute inset-0 bg-ink cursor-pointer" onClick={handleImageClick}>
                  <img 
                    src={currentImage} 
                    alt="App Interface" 
                    className="w-full h-full object-cover opacity-80 transition-opacity duration-300 hover:opacity-90 pointer-events-none"
                  />
                  
                  {/* Analysis Lines - Fresher Green */}
                  {overlayConfig.analysisLines && (
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                       <defs>
                          <filter id="glow">
                             <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                             <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                             </feMerge>
                          </filter>
                       </defs>
                      <path d="M 30 80 L 50 20 L 70 80" stroke="#B8D085" strokeWidth="2" fill="none" strokeDasharray="4,4" filter="url(#glow)" opacity="0.9" />
                      <circle cx="50" cy="20" r="3" fill="#E8F3D8" filter="url(#glow)" />
                      <circle cx="30" cy="80" r="3" fill="#E8F3D8" filter="url(#glow)" />
                    </svg>
                  )}

                  {/* Floating UI Cards - Recording Button */}
                  {overlayConfig.recordingButton && (
                    <div className="absolute top-12 left-6 right-6 flex justify-between pointer-events-none">
                       <div className="bg-ink/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg text-white/90 font-medium text-xs flex items-center gap-2 font-mono">
                          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                          REC
                       </div>
                    </div>
                  )}

                  {/* Swing Score Card */}
                  {overlayConfig.swingScore && typeof overlayConfig.swingScore === 'object' && (
                    <div className="absolute bottom-8 left-6 right-6 pointer-events-none">
                      <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-5 rounded-2xl shadow-lg">
                        <div className="flex justify-between items-end mb-3">
                           <div>
                              <span className="block text-white/60 text-xs font-medium uppercase tracking-wider mb-1 font-mono">Swing Score</span>
                              <span className="text-3xl font-bold text-white font-mono">{overlayConfig.swingScore.score}</span>
                           </div>
                           <div className="text-right">
                             <div className="bg-golf-500/20 text-golf-300 px-2 py-1 rounded text-xs font-bold mb-1 font-mono">{overlayConfig.swingScore.percentage}</div>
                           </div>
                        </div>
                        
                        <div className="space-y-2">
                           <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                             <div className="bg-gradient-to-r from-golf-300 to-golf-500 h-full rounded-full shadow-[0_0_10px_rgba(184,208,133,0.5)]" style={{ width: `${overlayConfig.swingScore.progressBarWidth}%` }}></div>
                           </div>
                           <p className="text-white/80 text-xs font-medium flex items-center gap-2">
                             <Zap className="w-3 h-3 text-gold fill-current" />
                             {overlayConfig.swingScore.message}
                           </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
             </div>
             
             {/* Floating Badge - Carry Distance */}
             {overlayConfig.carryDistance && (
               <div className="absolute top-1/3 -right-4 bg-white p-4 rounded-xl shadow-card border border-ink/10 transform rotate-3 animate-float z-20">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-golf-50 flex items-center justify-center text-golf-600 border border-golf-100">
                       <ArrowRight className="w-5 h-5 -rotate-45" />
                    </div>
                    <div>
                       <div className="text-xs text-subtle font-medium font-mono uppercase">Carry Distance</div>
                       <div className="text-lg font-bold text-ink font-mono">274 yds</div>
                    </div>
                 </div>
               </div>
             )}
          </div>

        </div>
      </div>
    </section>
  );
};