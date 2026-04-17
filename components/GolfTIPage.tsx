import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { Upload, Loader2, ArrowRight, RotateCcw, XCircle, Lock, ChevronLeft, ChevronRight } from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';
import { runFullAnalysis } from '../services/golfTiService';
import { AnalysisResult, GolfTIState, RadarItem, GolfTIMatch } from '../types';
import { APP_STORE_URL, MAX_FILE_SIZE, ACCEPTED_TYPES, GOLFTI_TAGLINES, GOLFTI_TYPE_CODES, LOADING_MESSAGES, ANALYZING_SUBTITLES, CARD_SUBTITLES } from '../constants/golfTiData';
import { getPath } from '../utils/paths';

const TYPE_TO_FILENAME: Record<string, string> = {
  VOID: 'VOID', GOON: 'GOON', TURF: 'TUFT', BOZO: 'BOZO',
  BRUH: 'BRUH', COOM: 'COOM', PSSS: 'PSSS', DUMB: 'DUMB',
  RIZZ: 'RIZZ', CRYK: 'CRYK', SIMP: 'SIMP', COPE: 'COPE',
  FERL: 'FERL', DEAD: 'DEAD', FLAIR: 'FLAIR', TRSH: 'TRSH',
};

function typeImg(type: string): string {
  return getPath(`assets/golfti/${TYPE_TO_FILENAME[type] || type}.svg`);
}

// ─── Custom SVG Radar Chart ────────────────────────────────────────────

const RadarChartSVG: React.FC<{ data: RadarItem[]; animatePoints: boolean }> = ({ data, animatePoints }) => {
  const size = 250, cx = 125, cy = 125, maxRadius = 85, levels = 4;
  const n = data.length;
  const angleStep = (2 * Math.PI) / n;
  const startAngle = -Math.PI / 2;

  const getPoint = (idx: number, value: number) => {
    const angle = startAngle + idx * angleStep;
    const r = (value / 10) * maxRadius;
    return { x: animatePoints ? cx + r * Math.cos(angle) : cx, y: animatePoints ? cy + r * Math.sin(angle) : cy };
  };

  const gridLevels = Array.from({ length: levels }, (_, i) => {
    const r = maxRadius * ((i + 1) / levels);
    return data.map((_, idx) => { const a = startAngle + idx * angleStep; return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`; }).join(' ');
  });

  const axisLines = data.map((_, idx) => {
    const a = startAngle + idx * angleStep;
    return { x2: cx + maxRadius * Math.cos(a), y2: cy + maxRadius * Math.sin(a) };
  });

  const dataPoints = data.map((d, i) => getPoint(i, d.value));
  const dataPolygonStr = dataPoints.map(p => `${p.x},${p.y}`).join(' ');

  const labelPoints = data.map((_, idx) => {
    const a = startAngle + idx * angleStep;
    const r = maxRadius + 18;
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a), label: data[idx].name };
  });

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full">
      {gridLevels.map((pts, i) => (
        <polygon key={`g-${i}`} points={pts} fill="none" stroke="rgba(74,155,127,0.2)" strokeWidth={1} />
      ))}
      {axisLines.map((l, i) => (
        <line key={`a-${i}`} x1={cx} y1={cy} x2={l.x2} y2={l.y2} stroke="rgba(74,155,127,0.15)" strokeWidth={1} />
      ))}
      <polygon
        points={dataPolygonStr}
        fill={animatePoints ? 'rgba(117,216,186,0.3)' : 'rgba(117,216,186,0)'}
        stroke="#4A9B7F" strokeWidth={2} strokeLinejoin="round"
        style={{ transition: 'fill 0.5s ease-out 0.3s' }}
      />
      {dataPoints.map((p, i) => (
        <circle key={`d-${i}`} cx={p.x} cy={p.y} r={animatePoints ? 4 : 0} fill="#4A9B7F" stroke="#fff" strokeWidth={2}
          style={{ transition: `r 0.25s ease-out ${0.5 + i * 0.06}s, cx 1.2s cubic-bezier(0.16,1,0.3,1) ${i * 0.04}s, cy 1.2s cubic-bezier(0.16,1,0.3,1) ${i * 0.04}s` }}
        />
      ))}
      {labelPoints.map((lp, i) => {
        const words = lp.label.split(' ');
        const isTop = lp.y < cy;
        const firstDy = isTop ? -8 : 0;
        return (
          <text key={`l-${i}`} x={lp.x} y={lp.y} textAnchor="middle"
            dominantBaseline={isTop ? 'auto' : lp.y > cy ? 'hanging' : 'central'}
            fill="#5C6B55" fontSize={9} fontFamily="Space Grotesk"
            style={{ transition: 'opacity 0.3s ease-out 0.7s', opacity: animatePoints ? 1 : 0.3 }}>
            {words.map((word, wi) => (
              <tspan key={wi} x={lp.x} dy={wi === 0 ? firstDy : 11}>{word}</tspan>
            ))}
          </text>
        );
      })}
    </svg>
  );
};

// ─── Swipeable Card Stack ──────────────────────────────────────────────

const TOTAL_CARDS = 5;

const SwipeableCardStack: React.FC<{
  matches: GolfTIMatch[];
  radar: RadarItem[];
  quote: string;
  onIndexChange: (index: number) => void;
}> = ({ matches, radar, quote, onIndexChange }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showNudge, setShowNudge] = useState(false);
  const [radarAnimated, setRadarAnimated] = useState(false);
  const startXRef = useRef(0);
  const prevIndexRef = useRef(0);

  useEffect(() => {
    const t = setTimeout(() => setRadarAnimated(true), 500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      if (!hasInteracted && activeIndex === 0) setShowNudge(true);
    }, 3000);
    return () => clearTimeout(t);
  }, [hasInteracted, activeIndex]);

  useEffect(() => { if (hasInteracted) setShowNudge(false); }, [hasInteracted]);

  // Report index changes to parent for dynamic subtitles
  useEffect(() => {
    if (activeIndex !== prevIndexRef.current) {
      prevIndexRef.current = activeIndex;
      onIndexChange(activeIndex);
    }
  }, [activeIndex, onIndexChange]);

  const handleDragStart = (clientX: number) => {
    setIsDragging(true); setDragOffset(0); startXRef.current = clientX; setHasInteracted(true);
  };
  const handleDragMove = (clientX: number) => { if (isDragging) setDragOffset(clientX - startXRef.current); };
  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset < -50 && activeIndex < TOTAL_CARDS - 1) setActiveIndex(p => p + 1);
    else if (dragOffset > 50 && activeIndex > 0) setActiveIndex(p => p - 1);
    setDragOffset(0);
  };

  const onTouchStart = (e: React.TouchEvent) => handleDragStart(e.touches[0].clientX);
  const onTouchMove = (e: React.TouchEvent) => handleDragMove(e.touches[0].clientX);
  const onTouchEnd = handleDragEnd;
  const onMouseDown = (e: React.MouseEvent) => { e.preventDefault(); handleDragStart(e.clientX); };

  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e: MouseEvent) => handleDragMove(e.clientX);
    const onUp = () => handleDragEnd();
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
  });

  const getCardStyle = (index: number): React.CSSProperties => {
    const offset = index - activeIndex;
    const abs = Math.abs(offset);
    if (abs > 2) return { opacity: 0, pointerEvents: 'none' as const };
    const drag = isDragging ? dragOffset * 0.3 : 0;
    return {
      transform: `translateX(${offset * 28 + drag}px) scale(${1 - abs * 0.07}) rotate(${offset * 2.5}deg)`,
      opacity: abs === 0 ? 1 : abs === 1 ? 0.55 : 0.2,
      zIndex: 10 - abs,
      pointerEvents: abs === 0 ? ('auto' as const) : ('none' as const),
    };
  };

  const CARD_LABELS: Record<number, string> = {
    1: "Your GolfTI could be...",
    2: "Or it could also be...",
    3: "And it might just be...",
  };

  const goPrev = () => setActiveIndex(p => Math.max(0, p - 1));
  const goNext = () => setActiveIndex(p => Math.min(TOTAL_CARDS - 1, p + 1));

  return (
    <div className="relative flex flex-col items-center">
      {/* Left arrow */}
      {activeIndex > 0 && (
        <button onClick={goPrev}
          className="absolute -left-6 sm:-left-14 md:-left-20 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-soft-lg border border-golf-100 flex items-center justify-center text-golf-500 hover:bg-golf-50 hover:shadow-soft-xl transition-all">
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      {/* Card stack */}
      <div
        className={`relative w-[280px] h-[400px] sm:w-[320px] sm:h-[440px] md:w-[340px] md:h-[460px] ${
          showNudge ? 'animate-nudge-left' : 'animate-card-stack-reveal'
        }`}
        onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        style={{ cursor: isDragging ? 'grabbing' : 'grab', perspective: '1000px' }}
      >
        {/* Card 0: Radar */}
        <div className="card-stack-item absolute inset-0 bg-white rounded-2xl shadow-soft-xl border border-golf-100 overflow-hidden" style={getCardStyle(0)}>
          <div className="h-2 bg-gradient-to-r from-golf-300 to-golf-500" />
          <div className="flex flex-col items-center px-6 pt-5 pb-4 h-full">
            <p className="text-subtle text-xs text-center mb-3">Based on your radar — swipe to reveal your possible GolfTI</p>
            <div className="w-full max-w-[250px] flex-1 flex items-center justify-center">
              <RadarChartSVG data={radar} animatePoints={radarAnimated} />
            </div>
            <p className="text-subtle/70 text-xs text-center italic mt-auto pt-3 pb-2 px-2">{quote || "Your swing dimensions"}</p>
          </div>
        </div>

        {/* Cards 1-3: Personality */}
        {matches.map((match, i) => (
          <div key={match.type} className="card-stack-item absolute inset-0 bg-white rounded-2xl shadow-soft-xl border border-golf-100 overflow-hidden" style={getCardStyle(i + 1)}>
            <div className="h-2 bg-gradient-to-r from-golf-400 to-golf-300" />
            <div className="flex flex-col items-center justify-center h-full px-6 py-6">
              <p className="text-subtle text-xs text-center mb-3">{CARD_LABELS[i + 1]}</p>
              <div className="w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center mb-3">
                <img src={typeImg(match.type)} alt={match.type} className="w-full h-full object-contain" draggable={false} />
              </div>
              <div className="text-4xl sm:text-5xl font-display font-extrabold text-ink tracking-tight mb-1">{match.type}</div>
              <p className="font-display font-semibold text-golf-600 text-sm mb-2">{match.label}</p>
              <p className="text-subtle text-xs leading-relaxed text-center italic max-w-[240px]">
                &ldquo;{GOLFTI_TAGLINES[match.type] || match.label}&rdquo;
              </p>
            </div>
          </div>
        ))}

        {/* Card 4: Nutshell — flowing cards fill the frame */}
        <div className="card-stack-item absolute inset-0 bg-white rounded-2xl shadow-soft-xl border border-golf-100 overflow-hidden" style={getCardStyle(4)}>
          <div className="h-full w-full relative">
            <div className="absolute inset-0 overflow-hidden rounded-2xl">
              <div className="bg-golf-50/40 h-full">
                <div className="overflow-hidden h-full flex items-stretch">
                  <div className="scroll-strip flex items-stretch gap-3 w-max h-full py-0">
                    {[0, 1, 2].map(set => (
                      <React.Fragment key={set}>
                        <div className="w-[200px] sm:w-[240px] md:w-[260px] shrink-0 rounded-xl overflow-hidden bg-white shadow-soft-md border border-golf-100 p-4 flex items-center justify-center my-3">
                          <RadarChartSVG data={radar} animatePoints={true} />
                        </div>
                        {['nutshell', 'fixes', 'drills', 'dynamics', 'home'].map(name => (
                          <div key={`${set}-${name}`} className="w-[200px] sm:w-[240px] md:w-[260px] shrink-0 rounded-xl overflow-hidden bg-white shadow-soft-md border border-golf-100 p-2 my-3">
                            <img src={getPath(`assets/${name}.jpg`)} alt={name} className="w-full h-full object-cover rounded-lg" draggable={false} />
                          </div>
                        ))}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Frosted overlay + CTA */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-paper/40 backdrop-blur-[3px] rounded-2xl px-6">
              <Lock className="w-7 h-7 text-golf-500 mb-3" />
              <p className="text-ink text-lg font-bold mb-1 text-center">Wanna know your type?</p>
              <p className="text-subtle text-[13px] mb-5 text-center max-w-[220px] leading-relaxed">
                Unlock your 16-type deep dive, more insightful swing analysis, and advanced AI feedback
              </p>
              <a
                href={APP_STORE_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-golf-600 rounded-xl shadow-card hover:bg-golf-500 hover:shadow-soft-lg hover:-translate-y-0.5 transition-all duration-200 border border-golf-500"
                onClick={(e) => e.stopPropagation()}
              >
                Download SneakySwing
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Right arrow */}
      {activeIndex < TOTAL_CARDS - 1 && (
        <button onClick={goNext}
          className="absolute -right-6 sm:-right-14 md:-right-20 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-soft-lg border border-golf-100 flex items-center justify-center text-golf-500 hover:bg-golf-50 hover:shadow-soft-xl transition-all">
          <ChevronRight className="w-5 h-5" />
        </button>
      )}

      {/* Dot indicators */}
      <div className="flex items-center gap-2 mt-6">
        {Array.from({ length: TOTAL_CARDS }, (_, i) => (
          <div key={i} className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeIndex ? 'bg-golf-500 w-5' : i < activeIndex ? 'bg-golf-300' : 'bg-golf-200'}`} />
        ))}
      </div>
    </div>
  );
};

// ─── Waterfall Background ──────────────────────────────────────────────

interface WaterfallItem { type: string; left: string; size: number; layer: number; duration: number; delay: number; }

function generateWaterfallItems(types: string[]): WaterfallItem[] {
  const w = typeof window !== 'undefined' ? window.innerWidth : 1024;
  const copies = w < 640 ? 2 : 3;
  const duplicated = Array(copies).fill(types).flat();
  const columns = w < 640 ? 4 : 8;
  const sizeMultiplier = w >= 640 ? 1.5 : 0.8;
  const colWeights = Array.from({ length: columns }, (_, i) => {
    const mid = (columns - 1) / 2;
    const x = mid === 0 ? 0 : (i - mid) / mid;
    return Math.exp(-x * x * 1.5);
  });
  const totalWeight = colWeights.reduce((a, b) => a + b, 0);
  const rawItems = duplicated.map(type => {
    const rawSize = 0.6 + Math.random() * 1.8;
    const layer = rawSize < 0.9 ? 0 : rawSize < 1.2 ? 1 : rawSize < 1.6 ? 2 : 3;
    return { type, layer, size: (0.5 + layer * 0.4) * sizeMultiplier };
  });
  const placedByLayer: Array<Array<{ left: number; w: number }>> = [[], [], [], []];
  function pickColumn(): number {
    let r = Math.random() * totalWeight;
    for (let c = 0; c < columns; c++) { r -= colWeights[c]; if (r <= 0) return c; }
    return 0;
  }
  function findPosition(layer: number, size: number): number {
    const itemW = 80 * size;
    const jitterRange = 100 / columns * 0.4;
    for (let attempt = 0; attempt < 60; attempt++) {
      const col = pickColumn();
      const colCenter = (col + 0.5) / columns * 100;
      const jitter = (Math.random() - 0.5) * jitterRange;
      const candidate = Math.max(3, Math.min(97, colCenter + jitter));
      const tooClose = placedByLayer[layer].some(p => Math.abs(candidate - p.left) < (itemW + 80 * p.w) * 2 / w * 100);
      if (!tooClose) { placedByLayer[layer].push({ left: candidate, w: size }); return candidate; }
    }
    const sorted = [...placedByLayer[layer]].sort((a, b) => a.left - b.left);
    const edges = [0, ...sorted.map(p => p.left), 100];
    let bestLeft = 50, bestGap = 0;
    for (let i = 0; i < edges.length - 1; i++) {
      const gap = edges[i + 1] - edges[i];
      if (gap > bestGap) { bestGap = gap; bestLeft = (edges[i] + edges[i + 1]) / 2; }
    }
    placedByLayer[layer].push({ left: bestLeft, w: size });
    return bestLeft;
  }
  return rawItems.map(({ type, layer, size }) => ({
    type, left: `${findPosition(layer, size)}%`, size, layer,
    duration: 30 + 10 * (3 - layer) + Math.random() * 5,
    delay: -(Math.random() * 30),
  }));
}

// ─── Main Page ─────────────────────────────────────────────────────────

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export const GolfTIPage: React.FC = () => {
  const [state, setState] = useState<GolfTIState>(GolfTIState.IDLE);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleIndexChange = useCallback((_index: number) => {}, []);

  const handleFile = useCallback(async (file: File) => {
    if (!ACCEPTED_TYPES.includes(file.type) && !file.name.match(/\.(mp4|mov|webm)$/i)) {
      setError('Please upload a video file (MP4, MOV, or WebM).');
      setState(GolfTIState.ERROR); return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError('File too large. Max 18 MB.');
      setState(GolfTIState.ERROR); return;
    }
    setFileName(file.name);
    setState(GolfTIState.PREPARING);
    setError(''); setResult(null);
    try {
      const analysisResult = await runFullAnalysis(file, (phase) => {
        setState(GolfTIState[phase.toUpperCase() as keyof typeof GolfTIState]);
      });
      setResult(analysisResult);
      setState(GolfTIState.SUCCESS);
    } catch (err) {
      console.error('GolfTI analysis error:', err);
      setError(err instanceof Error ? err.message : 'Something went wrong.');
      setState(GolfTIState.ERROR);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }, [handleFile]);
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => { const f = e.target.files?.[0]; if (f) handleFile(f); }, [handleFile]);

  const handleReset = useCallback(() => {
    setState(GolfTIState.IDLE); setResult(null); setError(''); setFileName('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, []);

  const isLoading = state === GolfTIState.PREPARING || state === GolfTIState.UPLOADING || state === GolfTIState.ANALYZING;
  const loadingMsg = LOADING_MESSAGES[state] || LOADING_MESSAGES.PREPARING;

  const [rotatingSubtitles, setRotatingSubtitles] = useState<string[]>([]);
  const [subtitleIdx, setSubtitleIdx] = useState(0);
  useEffect(() => {
    if (!isLoading) { setRotatingSubtitles([]); return; }
    setRotatingSubtitles([...ANALYZING_SUBTITLES].sort(() => Math.random() - 0.5));
    setSubtitleIdx(0);
  }, [isLoading]);
  useEffect(() => {
    if (!isLoading || rotatingSubtitles.length === 0) return;
    const id = setInterval(() => setSubtitleIdx(p => (p + 1) % rotatingSubtitles.length), 2500);
    return () => clearInterval(id);
  }, [isLoading, rotatingSubtitles.length]);
  const displaySubtitle = isLoading && rotatingSubtitles.length > 0 ? rotatingSubtitles[subtitleIdx] : loadingMsg.subtitle;

  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (!isLoading) { setProgress(0); return; }
    setProgress(0);
    const start = Date.now();
    const id = setInterval(() => {
      const t = Math.min((Date.now() - start) / 20000, 0.92);
      setProgress(Math.min(1 - Math.pow(1 - t, 2.5), 0.92));
    }, 200);
    return () => clearInterval(id);
  }, [isLoading]);
  useEffect(() => { if (state === GolfTIState.SUCCESS) setProgress(100); }, [state]);

  const shuffledMatches = useMemo(() => {
    if (!result?.matches) return [];
    const arr = [...result.matches];
    for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [arr[i], arr[j]] = [arr[j], arr[i]]; }
    return arr;
  }, [result]);

  const bgTypes = useMemo(() => result?.matches?.length ? result.matches.map(m => m.type) : [...GOLFTI_TYPE_CODES], [result]);
  const waterfallItems = useMemo(() => generateWaterfallItems(bgTypes), [bgTypes]);
  const itemsByLayer = useMemo(() => {
    const layers: WaterfallItem[][] = [[], [], [], []];
    waterfallItems.forEach(item => layers[item.layer].push(item));
    return layers;
  }, [waterfallItems]);

  const layerStyles = [
    { zIndex: 0, blur: 8, opacity: 0.05 },
    { zIndex: 1, blur: 4, opacity: 0.1 },
    { zIndex: 2, blur: 2, opacity: 0.2 },
    { zIndex: 3, blur: 0.5, opacity: 0.35 },
  ];

  const isSuccess = state === GolfTIState.SUCCESS;

  return (
    <div className="min-h-screen bg-paper relative">
      {/* Waterfall */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {itemsByLayer.map((items, layerIdx) => (
          <div key={layerIdx} className="absolute inset-0" style={{
            zIndex: layerStyles[layerIdx].zIndex,
            filter: `blur(${typeof window !== 'undefined' && window.innerWidth < 640 ? layerStyles[layerIdx].blur * 0.4 : layerStyles[layerIdx].blur}px)`,
            opacity: typeof window !== 'undefined' && window.innerWidth < 640 ? layerStyles[layerIdx].opacity * 1.3 : layerStyles[layerIdx].opacity,
          }}>
            {items.map((item, i) => (
              <div key={`${item.type}-${i}`} className="golfti-bg-item" style={{
                left: item.left, width: `${80 * item.size}px`, height: `${80 * item.size}px`,
                ['--dur' as string]: `${item.duration}s`, ['--delay' as string]: `${item.delay}s`,
              }}>
                <img src={typeImg(item.type)} alt="" className="w-full h-full object-contain" draggable={false} />
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="fixed inset-0 z-[1]" style={{ backgroundColor: 'rgba(255, 255, 255, 0.59)' }} />

      {/* Content */}
      <div className="relative z-[2] min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-24">
          <section className="py-16 md:py-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Header — dynamic based on state */}
              <div className="text-center mb-10 md:mb-14">
                {isSuccess ? (
                  <>
                    <h1 className="text-3xl md:text-5xl font-display font-bold text-ink mb-4">
                      Here's your <span className="text-gradient">analysis</span>.
                    </h1>
                    <p className="text-subtle text-lg leading-relaxed max-w-2xl mx-auto">
                      Swipe through the cards to explore your results.
                    </p>
                  </>
                ) : (
                  <>
                    <h1 className="text-3xl md:text-5xl font-display font-bold text-ink mb-4">
                      What's your <span className="text-gradient">GolfTI</span>?
                    </h1>
                    <p className="text-subtle text-lg leading-relaxed max-w-2xl mx-auto">
                      Upload a swing video and our AI will reveal your true golf personality. It's like MBTI, but for the fairway.
                    </p>
                  </>
                )}
              </div>

              {state === GolfTIState.IDLE && (
                <div
                  onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="relative group cursor-pointer border-2 border-dashed border-ink/20 hover:border-golf-300 bg-white/60 hover:bg-white/80 rounded-2xl p-10 md:p-16 text-center transition-all duration-300"
                >
                  <input ref={fileInputRef} type="file" accept="video/mp4,video/quicktime,video/webm" onChange={handleInputChange} className="hidden" />
                  <div className="w-16 h-16 bg-golf-100 border border-golf-200 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-golf-500 group-hover:border-golf-500 transition-colors duration-300 text-golf-600 group-hover:text-white">
                    <Upload className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-ink mb-2">Upload your swing video</h3>
                  <p className="text-subtle text-sm">MP4, MOV, up to 18 MB</p>
                  <p className="text-subtle/50 text-xs mt-3">Your video is analyzed and discarded. Nothing is stored.</p>
                </div>
              )}

              {isLoading && (
                <div className="bg-white rounded-2xl border border-ink/10 shadow-soft-xl p-10 md:p-16 text-center">
                  <div className="w-16 h-16 bg-golf-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <Loader2 className="w-8 h-8 text-golf-500 animate-spin" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-ink mb-2">{loadingMsg.title}</h3>
                  <p className="text-subtle text-sm">{displaySubtitle}</p>
                  <div className="mt-6 max-w-xs mx-auto">
                    <div className="h-1 bg-golf-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-golf-300 to-golf-500 rounded-full transition-all duration-300 ease-out" style={{ width: `${progress * 100}%` }} />
                    </div>
                  </div>
                </div>
              )}

              {isSuccess && result && (
                <div className="flex flex-col items-center">
                  <SwipeableCardStack matches={shuffledMatches} radar={result.radar} quote={result.quote || ""} onIndexChange={handleIndexChange} />
                  <div className="text-center mt-10">
                    <button onClick={handleReset} className="inline-flex items-center gap-2 text-sm font-medium text-subtle hover:text-golf-600 transition-colors">
                      <RotateCcw className="w-4 h-4" /> Try another swing
                    </button>
                  </div>
                </div>
              )}

              {state === GolfTIState.ERROR && (
                <div className="bg-white rounded-2xl border border-ink/10 shadow-soft-xl p-10 md:p-16 text-center">
                  <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <XCircle className="w-8 h-8 text-red-500" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-ink mb-2">Oops!</h3>
                  <p className="text-subtle text-sm mb-6">{error}</p>
                  <button onClick={handleReset} className="inline-flex items-center gap-2 px-6 py-3 bg-golf-600 text-white rounded-xl font-semibold shadow-card hover:bg-golf-500 hover:shadow-soft-lg transition-all duration-200">
                    <RotateCcw className="w-4 h-4" /> Try Again
                  </button>
                </div>
              )}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
};
