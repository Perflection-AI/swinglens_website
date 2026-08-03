import React, { useRef, useState } from 'react';
import { X, Copy, Check } from 'lucide-react';
import {
  isIOS,
  isAndroid,
  isInstagramInApp,
  isFacebookInApp,
  isInAppBrowser,
  getInAppBrowserName,
} from '../utils/inAppBrowser';

interface StoreLinkProps {
  href: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

/**
 * Drop-in replacement for <a href={APP_STORE_URL}>. In a normal browser it
 * behaves exactly like a plain link. Inside Instagram/Facebook/TikTok's
 * in-app browser — which blocks navigation to apps.apple.com — it attempts
 * a handful of best-effort escapes (none are guaranteed across app versions)
 * and falls back to an instructional modal if none of them fire.
 */
export const StoreLink: React.FC<StoreLinkProps> = ({ href, className, style, children, onClick }) => {
  const [showFallback, setShowFallback] = useState(false);
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  const attemptEscape = () => {
    if (isInstagramInApp() && isIOS()) {
      window.location.href = `instagram://extbrowser/?url=${encodeURIComponent(href)}`;
    } else if (isFacebookInApp() && isIOS()) {
      window.open(`x-safari-${href}`, '_blank');
    } else if (isAndroid()) {
      const bare = href.replace(/^https?:\/\//, '');
      window.location.href = `intent://${bare}#Intent;scheme=https;end;`;
    } else if (isIOS()) {
      window.open(`x-safari-${href}`, '_blank');
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);

    if (!isInAppBrowser()) return;

    e.preventDefault();
    attemptEscape();

    const onEscapeSignal = () => {
      if (document.visibilityState && document.visibilityState !== 'hidden') return;
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      cleanupRef.current?.();
    };
    const cleanup = () => {
      document.removeEventListener('visibilitychange', onEscapeSignal);
      window.removeEventListener('pagehide', onEscapeSignal);
      window.removeEventListener('blur', onEscapeSignal);
    };
    cleanupRef.current = cleanup;

    document.addEventListener('visibilitychange', onEscapeSignal);
    window.addEventListener('pagehide', onEscapeSignal);
    window.addEventListener('blur', onEscapeSignal);

    timeoutRef.current = window.setTimeout(() => {
      cleanup();
      setShowFallback(true);
    }, 1500);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — the link is still visible in the modal to copy manually.
    }
  };

  return (
    <>
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} style={style} onClick={handleClick}>
        {children}
      </a>

      {showFallback && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setShowFallback(false)}
        >
          <div
            className="bg-paper rounded-2xl shadow-soft-xl border border-ink/10 max-w-sm w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowFallback(false)}
              className="absolute top-4 right-4 text-subtle hover:text-ink transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-display font-bold text-ink text-lg mb-2 pr-6">
              Can't open the App Store here
            </h3>
            <p className="text-subtle text-sm leading-relaxed mb-5">
              {getInAppBrowserName()} blocks App Store links inside its built-in browser. Tap the{' '}
              <strong className="text-ink">⋯</strong> menu at the top of the screen and choose{' '}
              <strong className="text-ink">"Open in Safari"</strong> (or "Open in Browser") to continue.
            </p>

            <div className="flex flex-col gap-2.5">
              <button
                onClick={attemptEscape}
                className="w-full py-2.5 px-4 rounded-lg bg-green text-white text-sm font-semibold hover:brightness-110 transition-all duration-200"
              >
                Try again
              </button>
              <button
                onClick={handleCopy}
                className="w-full py-2.5 px-4 rounded-lg border border-ink/15 text-ink text-sm font-semibold hover:bg-white transition-colors inline-flex items-center justify-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" /> Copy link
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
