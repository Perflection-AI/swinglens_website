import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts';
import { Upload, Loader2, ArrowRight, RotateCcw, XCircle, Lock } from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';
import { runFullAnalysis } from '../services/golfTiService';
import { AnalysisResult, GolfTIState } from '../types';
import { APP_STORE_URL, MAX_FILE_SIZE, ACCEPTED_TYPES, GOLFTI_TAGLINES, GOLFTI_TYPE_CODES, LOADING_MESSAGES, ANALYZING_SUBTITLES } from '../constants/golfTiData';
import { getPath } from '../utils/paths';

// Map type code → SVG filename (TUFT is the actual filename for TURF)
const TYPE_TO_FILENAME: Record<string, string> = {
  VOID: 'VOID', GOON: 'GOON', TURF: 'TUFT', BOZO: 'BOZO',
  BRUH: 'BRUH', COOM: 'COOM', PSSS: 'PSSS', DUMB: 'DUMB',
  RIZZ: 'RIZZ', CRYK: 'CRYK', SIMP: 'SIMP', COPE: 'COPE',
  FERL: 'FERL', DEAD: 'DEAD', FLAIR: 'FLAIR', TRSH: 'TRSH',
};

function typeImg(type: string): string {
  return getPath(`assets/golfti/${TYPE_TO_FILENAME[type] || type}.svg`);
}

// Generate waterfall background items with varying depth/blur/speed
interface WaterfallItem {
  type: string;
  left: string;
  size: number;
  layer: number;
  duration: number;
  delay: number;
}

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

  // Phase 1: assign layers and sizes
  const rawItems = duplicated.map(type => {
    const rawSize = 0.6 + Math.random() * 1.8;
    const layer = rawSize < 0.9 ? 0 : rawSize < 1.2 ? 1 : rawSize < 1.6 ? 2 : 3;
    return { type, layer, size: (0.5 + layer * 0.4) * sizeMultiplier };
  });

  // Phase 2: place items with minimum horizontal distance per layer
  const placedByLayer: Array<Array<{ left: number; w: number }>> = [[], [], [], []];

  function pickColumn(): number {
    let r = Math.random() * totalWeight;
    for (let c = 0; c < columns; c++) {
      r -= colWeights[c];
      if (r <= 0) return c;
    }
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

      const tooClose = placedByLayer[layer].some(p => {
        const neighborW = 80 * p.w;
        const minDist = (itemW + neighborW) * 2 / w * 100;
        return Math.abs(candidate - p.left) < minDist;
      });
      if (!tooClose) {
        placedByLayer[layer].push({ left: candidate, w: size });
        return candidate;
      }
    }

    // Fallback: place in the largest gap
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

  return rawItems.map(({ type, layer, size }) => {
    const left = findPosition(layer, size);
    return {
      type,
      left: `${left}%`,
      size,
      layer,
      duration: 30 + 10 * (3 - layer) + Math.random() * 5,
      delay: -(Math.random() * 30),
    };
  });
}

export const GolfTIPage: React.FC = () => {
  const [state, setState] = useState<GolfTIState>(GolfTIState.IDLE);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(async (file: File) => {
    if (!ACCEPTED_TYPES.includes(file.type) && !file.name.match(/\.(mp4|mov|webm)$/i)) {
      setError('Please upload a video file (MP4, MOV, or WebM).');
      setState(GolfTIState.ERROR);
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError('File too large. Max 18 MB.');
      setState(GolfTIState.ERROR);
      return;
    }

    setFileName(file.name);
    setState(GolfTIState.PREPARING);
    setError('');
    setResult(null);

    try {
      const analysisResult = await runFullAnalysis(file, (phase) => {
        setState(GolfTIState[phase.toUpperCase() as keyof typeof GolfTIState]);
      });
      setResult(analysisResult);
      setState(GolfTIState.SUCCESS);
    } catch (err) {
      console.error('GolfTI analysis error:', err);
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setState(GolfTIState.ERROR);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleReset = useCallback(() => {
    setState(GolfTIState.IDLE);
    setResult(null);
    setError('');
    setFileName('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, []);

  const isLoading = state === GolfTIState.PREPARING || state === GolfTIState.UPLOADING || state === GolfTIState.ANALYZING;
  const loadingMsg = LOADING_MESSAGES[state] || LOADING_MESSAGES.PREPARING;

  const [rotatingSubtitles, setRotatingSubtitles] = useState<string[]>([]);
  const [subtitleIdx, setSubtitleIdx] = useState(0);

  useEffect(() => {
    if (!isLoading) { setRotatingSubtitles([]); return; }
    const shuffled = [...ANALYZING_SUBTITLES].sort(() => Math.random() - 0.5);
    setRotatingSubtitles(shuffled);
    setSubtitleIdx(0);
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading || rotatingSubtitles.length === 0) return;
    const id = setInterval(() => {
      setSubtitleIdx(prev => (prev + 1) % rotatingSubtitles.length);
    }, 2500);
    return () => clearInterval(id);
  }, [isLoading, rotatingSubtitles.length]);

  const displaySubtitle = isLoading && rotatingSubtitles.length > 0
    ? rotatingSubtitles[subtitleIdx]
    : loadingMsg.subtitle;

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) { setProgress(0); return; }
    setProgress(0);
    const startTime = Date.now();
    const duration = 15000;
    const id = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const t = Math.min(elapsed / duration, 0.92);
      const eased = 1 - Math.pow(1 - t, 2.5);
      setProgress(Math.min(eased, 0.92));
    }, 200);
    return () => clearInterval(id);
  }, [isLoading]);

  useEffect(() => {
    if (state === GolfTIState.SUCCESS) setProgress(100);
  }, [state]);

  const shuffledMatches = useMemo(() => {
    if (!result?.matches) return [];
    const arr = [...result.matches];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [result]);

  // Background: 16 types before result, matched 3 types after
  const bgTypes = useMemo(() => {
    if (result?.matches?.length) {
      return result.matches.map(m => m.type);
    }
    return [...GOLFTI_TYPE_CODES];
  }, [result]);

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

  return (
    <div className="min-h-screen bg-paper relative">
      {/* Waterfall Background Layer */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {itemsByLayer.map((items, layerIdx) => (
          <div
            key={layerIdx}
            className="absolute inset-0"
            style={{
              zIndex: layerStyles[layerIdx].zIndex,
              filter: `blur(${typeof window !== 'undefined' && window.innerWidth < 640 ? layerStyles[layerIdx].blur * 0.4 : layerStyles[layerIdx].blur}px)`,
              opacity: typeof window !== 'undefined' && window.innerWidth < 640 ? layerStyles[layerIdx].opacity * 1.3 : layerStyles[layerIdx].opacity,
            }}
          >
            {items.map((item, i) => (
              <div
                key={`${item.type}-${i}`}
                className="golfti-bg-item"
                style={{
                  left: item.left,
                  width: `${80 * item.size}px`,
                  height: `${80 * item.size}px`,
                  ['--dur' as string]: `${item.duration}s`,
                  ['--delay' as string]: `${item.delay}s`,
                }}
              >
                <img
                  src={typeImg(item.type)}
                  alt=""
                  className="w-full h-full object-contain"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Semi-transparent overlay */}
      <div className="fixed inset-0 z-[1]" style={{ backgroundColor: 'rgba(255, 255, 255, 0.59)' }} />

      {/* Content */}
      <div className="relative z-[2] min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 pt-24">
          <section className="py-16 md:py-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Header */}
              <div className="text-center mb-10 md:mb-14">
                <h1 className="text-3xl md:text-5xl font-display font-bold text-ink mb-4">
                  What's your <span className="text-gradient">GolfTI</span>?
                </h1>
                <p className="text-subtle text-lg leading-relaxed max-w-2xl mx-auto">
                  Upload a swing video and our AI will reveal your true golf personality. It's like MBTI, but for the fairway.
                </p>
              </div>

              {/* IDLE — Upload Zone */}
              {state === GolfTIState.IDLE && (
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="relative group cursor-pointer border-2 border-dashed border-ink/20 hover:border-golf-300 bg-white/60 hover:bg-white/80 rounded-2xl p-10 md:p-16 text-center transition-all duration-300"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/mp4,video/quicktime,video/webm"
                    onChange={handleInputChange}
                    className="hidden"
                  />
                  <div className="w-16 h-16 bg-golf-100 border border-golf-200 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-golf-500 group-hover:border-golf-500 transition-colors duration-300 text-golf-600 group-hover:text-white">
                    <Upload className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-ink mb-2">Upload your swing video</h3>
                  <p className="text-subtle text-sm">MP4, MOV, up to 18 MB</p>
                  <p className="text-subtle/50 text-xs mt-3">Your video is analyzed and discarded. Nothing is stored.</p>
                </div>
              )}

              {/* LOADING */}
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

              {/* SUCCESS — Results */}
              {state === GolfTIState.SUCCESS && result && (
                <div className="space-y-8 animate-fade-slide-up">
                  {/* Top 3 Matches — Cards with images */}
                  <div className="bg-white rounded-2xl border border-golf-200 shadow-soft-lg p-6 md:p-8">
                    <p className="text-subtle text-sm font-medium mb-6 text-center">You might be one of these...</p>
                    <div className="grid grid-cols-1 gap-3 divide-y divide-golf-200/60">
                      {shuffledMatches.map((match) => (
                        <div key={match.type} className="flex items-center gap-4 p-3 rounded-xl">
                          <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-xl overflow-hidden bg-golf-50 flex items-center justify-center p-2">
                            <img src={typeImg(match.type)} alt={match.type} className="w-full h-full object-contain" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-2xl md:text-3xl font-display font-extrabold text-ink tracking-tight mb-0.5">
                              {match.type}
                            </div>
                            <p className="font-display font-semibold text-golf-600 text-sm mb-1">{match.label}</p>
                            <p className="text-subtle text-xs leading-relaxed italic">
                              &ldquo;{GOLFTI_TAGLINES[match.type] || match.label}&rdquo;
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Radar Chart */}
                  <div className="bg-white rounded-2xl border border-golf-200 shadow-soft-lg p-6 md:p-8">
                    <p className="text-subtle text-sm font-medium mb-4 text-center">Your swing dimensions</p>
                    <div className="w-full max-w-sm mx-auto" style={{ height: 260 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="65%" data={result.radar}>
                          <PolarGrid stroke="rgba(74, 155, 127, 0.3)" strokeWidth={1.5} />
                          <PolarAngleAxis dataKey="name" tick={{ fill: '#5C6B55', fontSize: 10, fontFamily: 'Space Grotesk' }} />
                          <PolarRadiusAxis angle={90} domain={[0, 10]} tick={false} axisLine={false} />
                          <Radar name="GolfTI" dataKey="value" stroke="#4A9B7F" fill="#75D8BA" fillOpacity={0.3} strokeWidth={2} dot={{ r: 4, fill: '#4A9B7F', stroke: '#fff', strokeWidth: 2 }} />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Analysis Preview — Auto-scroll strip with frosted overlay */}
                  <div className="relative rounded-2xl overflow-hidden border border-golf-200/60">
                    <div className="bg-golf-50/30">
                      <div className="overflow-hidden py-4 md:py-6">
                        <div className="scroll-strip flex gap-4 w-max">
                          {[0, 1].map(set => (
                            <React.Fragment key={set}>
                              <div className="w-44 h-64 md:w-60 md:h-80 shrink-0 rounded-xl overflow-hidden bg-white shadow-soft-md border border-golf-100 p-5 flex items-center justify-center">
                                <ResponsiveContainer width="100%" height="100%">
                                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={result.radar}>
                                    <PolarGrid stroke="rgba(74, 155, 127, 0.25)" strokeDasharray="3 3" />
                                    <PolarAngleAxis dataKey="name" tick={{ fill: '#5C6B55', fontSize: 10, fontFamily: 'Space Grotesk' }} />
                                    <PolarRadiusAxis angle={90} domain={[0, 10]} tickCount={3} tick={{ fill: '#5C6B55', fontSize: 8 }} axisLine={false} />
                                    <Radar name="GolfTI" dataKey="value" stroke="#4A9B7F" fill="#75D8BA" fillOpacity={0.3} strokeWidth={2} />
                                  </RadarChart>
                                </ResponsiveContainer>
                              </div>
                              {['nutshell', 'fixes', 'drills', 'dynamics', 'home'].map(name => (
                                <div key={`${set}-${name}`} className="w-44 h-64 md:w-60 md:h-80 shrink-0 rounded-xl overflow-hidden bg-white shadow-soft-md border border-golf-100 p-3 flex items-center justify-center">
                                  <img
                                    src={getPath(`assets/${name}.jpg`)}
                                    alt={name}
                                    className="w-full h-full object-cover rounded-lg"
                                    draggable={false}
                                  />
                                </div>
                              ))}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* Frosted glass overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-paper/30 md:bg-paper/35 md:backdrop-blur-[4px] backdrop-blur-[2px]">
                      <div className="text-center px-4 md:px-6 py-4 bg-white/70 rounded-xl border border-ink/10 shadow-soft-md mx-6 md:mx-auto">
                        <Lock className="w-6 h-6 text-golf-500 mx-auto mb-3" />
                        <p className="text-ink text-base font-semibold mb-1">Unlock full analysis</p>
                        <p className="text-subtle text-xs mb-5 max-w-xs mx-auto">Get your complete 5-dimension radar, 16-type deep dive, and personalized swing insights</p>
                        <a
                          href={APP_STORE_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-golf-600 rounded-xl shadow-card hover:bg-golf-500 hover:shadow-soft-lg hover:-translate-y-0.5 transition-all duration-200 border border-golf-500"
                        >
                          Download SneakySwing
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Reset */}
                  <div className="text-center">
                    <button
                      onClick={handleReset}
                      className="inline-flex items-center gap-2 text-sm font-medium text-subtle hover:text-golf-600 transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Try another swing
                    </button>
                  </div>
                </div>
              )}

              {/* ERROR */}
              {state === GolfTIState.ERROR && (
                <div className="bg-white rounded-2xl border border-ink/10 shadow-soft-xl p-10 md:p-16 text-center">
                  <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <XCircle className="w-8 h-8 text-red-500" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-ink mb-2">Oops!</h3>
                  <p className="text-subtle text-sm mb-6">{error}</p>
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-golf-600 text-white rounded-xl font-semibold shadow-card hover:bg-golf-500 hover:shadow-soft-lg transition-all duration-200"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Try Again
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
