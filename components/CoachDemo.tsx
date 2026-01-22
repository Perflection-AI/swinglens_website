import React, { useState } from 'react';
import { Send, Loader2, Sparkles, User, Bot } from 'lucide-react';
import { getGolfAdvice } from '../services/geminiService';
import { CoachResponse, LoadingState } from '../types';

export const CoachDemo: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<CoachResponse | null>(null);
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setStatus(LoadingState.LOADING);
    setResponse(null);

    try {
      const result = await getGolfAdvice(query);
      setResponse(result);
      setStatus(LoadingState.SUCCESS);
    } catch (error) {
      console.error(error);
      setStatus(LoadingState.ERROR);
    }
  };

  return (
    <section id="demo" className="py-24 bg-golf-50 relative overflow-hidden border-t border-ink/5">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            {/* Light Badge - Removed Lit Shadow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-golf-100 border border-golf-200 shadow-sm text-golf-800 text-xs font-bold uppercase tracking-wider mb-6 font-mono">
              <Sparkles className="w-3 h-3 text-golf-500 fill-current" />
              <span>AI Coach Preview</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-6 text-ink">Ask your personal coach anything.</h2>
            <p className="text-subtle text-lg mb-8 leading-relaxed">
              Describe your struggle and get instant, professional advice. The model understands biomechanics, ball flight laws, and training methodology.
            </p>
            
            <div className="space-y-4">
              <p className="text-xs font-bold text-ink uppercase tracking-widest font-mono">Popular Questions</p>
              <div className="flex flex-wrap gap-2">
                {["Fix my slice", "Add 10 yards", "Stop 3-putting", "Better bunker shots"].map((q) => (
                  <button 
                    key={q}
                    onClick={() => setQuery(q)}
                    className="text-sm bg-white border border-ink/10 hover:border-golf-300 hover:bg-golf-50 hover:text-golf-700 text-subtle px-4 py-2 rounded-lg transition-all shadow-sm hover:shadow-card font-mono"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            {/* Chat Interface Container - Notebook Style */}
            <div className="bg-paper rounded-[1.5rem] shadow-soft-xl border border-ink/10 overflow-hidden flex flex-col h-[600px] relative">
              
              {/* Chat Header */}
              <div className="bg-white/90 backdrop-blur-sm border-b border-ink/10 p-4 flex items-center justify-between absolute top-0 left-0 right-0 z-20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-golf-100 flex items-center justify-center text-golf-600 shadow-sm border border-golf-200">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-ink text-lg">Perflection AI Coach</h4>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-golf-400 animate-pulse"></span>
                      <span className="text-xs text-subtle font-bold font-mono uppercase tracking-wide">Online</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Area with Ruled Lines */}
              <div className="flex-1 overflow-y-auto p-6 pt-24 space-y-6 custom-scrollbar bg-ruled-paper">
                
                {/* Intro Message */}
                <div className="flex gap-4 max-w-[90%]">
                  <div className="w-8 h-8 rounded-lg bg-golf-300 flex-shrink-0 flex items-center justify-center text-white text-xs border border-golf-400 font-mono">
                    AI
                  </div>
                  <div className="space-y-1">
                    <div className="bg-white border border-ink/10 p-5 rounded-xl rounded-tl-none shadow-card text-ink text-sm leading-relaxed">
                      Hi there! I've analyzed thousands of pro swings. What aspect of your game are you working on today?
                    </div>
                  </div>
                </div>

                {/* User Query */}
                {(status === LoadingState.LOADING || status === LoadingState.SUCCESS) && (
                   <div className="flex gap-4 max-w-[90%] ml-auto flex-row-reverse animate-in slide-in-from-bottom-2 fade-in duration-300">
                    <div className="w-8 h-8 rounded-lg bg-golf-600 flex-shrink-0 flex items-center justify-center text-white">
                      <User className="w-4 h-4" />
                    </div>
                    {/* Darker green for user bubble for contrast, but cleaner */}
                    <div className="bg-golf-600 text-white p-5 rounded-xl rounded-tr-none shadow-card text-sm leading-relaxed">
                      {query}
                    </div>
                  </div>
                )}

                {/* Loading State */}
                {status === LoadingState.LOADING && (
                   <div className="flex gap-4 max-w-[90%] animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="w-8 h-8 rounded-lg bg-golf-300 flex-shrink-0 flex items-center justify-center text-white text-xs border border-golf-400 font-mono">
                      AI
                    </div>
                    <div className="bg-white border border-ink/10 p-4 rounded-xl rounded-tl-none shadow-card flex items-center gap-3">
                       <Loader2 className="w-4 h-4 animate-spin text-golf-400" />
                       <span className="text-sm text-subtle font-mono">Analyzing swing mechanics...</span>
                    </div>
                  </div>
                )}

                {/* Response */}
                {status === LoadingState.SUCCESS && response && (
                  <div className="flex gap-4 max-w-[90%] animate-in slide-in-from-bottom-2 fade-in duration-500">
                    <div className="w-8 h-8 rounded-lg bg-golf-300 flex-shrink-0 flex items-center justify-center text-white text-xs border border-golf-400 font-mono">
                      AI
                    </div>
                    <div className="space-y-3 w-full">
                      <div className="bg-white border border-ink/10 p-6 rounded-xl rounded-tl-none shadow-card text-ink text-sm leading-relaxed relative">
                        {/* Note paper detail */}
                        <div className="absolute top-0 left-4 w-px h-full bg-red-500/10"></div>
                        <span className="block font-bold text-golf-600 mb-2 text-xs uppercase tracking-wide pl-2 font-mono">Analysis</span>
                        <div className="pl-2">{response.advice}</div>
                      </div>
                      
                      {/* Drill Box: Fresh Green Background - Removed Lit Shadow */}
                      <div className="bg-golf-100 border border-golf-200 p-5 rounded-xl shadow-sm text-ink text-sm leading-relaxed">
                        <span className="flex items-center gap-2 font-bold text-golf-700 mb-2 text-xs uppercase tracking-wide font-mono">
                          <Sparkles className="w-3 h-3 text-golf-500" /> Recommended Drill
                        </span>
                        {response.drill}
                      </div>
                    </div>
                  </div>
                )}

                {/* Scroll Anchor */}
                <div className="h-4"></div>
              </div>

              {/* Input Area */}
              <div className="p-4 bg-white border-t border-ink/10 relative z-20">
                <form onSubmit={handleAnalyze} className="relative">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Describe your swing fault..."
                    className="w-full bg-paper text-ink border border-ink/10 focus:border-golf-300 focus:ring-4 focus:ring-golf-100 rounded-xl py-3.5 pl-5 pr-12 text-sm font-medium transition-all outline-none placeholder:text-subtle/50 shadow-inner font-mono placeholder:font-sans"
                    disabled={status === LoadingState.LOADING}
                  />
                  <button 
                    type="submit"
                    disabled={status === LoadingState.LOADING || !query.trim()}
                    className={`
                      absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all duration-200
                      ${query.trim() ? 'bg-golf-500 text-white hover:bg-golf-600 shadow-sm transform hover:scale-105' : 'bg-golf-100 text-golf-300 cursor-not-allowed'}
                    `}
                  >
                    {status === LoadingState.LOADING ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4 ml-0.5" />}
                  </button>
                </form>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};