import React, { ReactNode } from 'react';
import { getBasePath } from '../utils/paths';

interface LegalDocumentLayoutProps {
  eyebrow: string;
  title: string;
  lastUpdated: string;
  summary: string;
  backLink?: {
    href: string;
    label: string;
  };
  children: ReactNode;
}

export const LegalDocumentLayout: React.FC<LegalDocumentLayoutProps> = ({
  eyebrow,
  title,
  lastUpdated,
  summary,
  backLink,
  children,
}) => {
  const resolveHref = (href: string) => {
    if (href === '/') {
      return getBasePath();
    }
    return href;
  };

  return (
    <div className="min-h-screen bg-paper text-ink">
      <main className="py-10 sm:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-soft-xl">
            {/* Green accent strip */}
            <div className="h-1 bg-green" />

            <div className="border-b border-ink/8 bg-paper/40 px-8 py-10 md:px-12">
              {backLink ? (
                <a
                  href={resolveHref(backLink.href)}
                  className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-green hover:text-green/80 transition-colors"
                >
                  ← {backLink.label}
                </a>
              ) : null}
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-green">
                {eyebrow}
              </p>
              <h1 className="mb-4 text-4xl font-display font-bold text-ink md:text-5xl">
                {title}
              </h1>
              <p className="mb-4 text-xs font-semibold text-subtle/70 uppercase tracking-widest">
                Last updated {lastUpdated}
              </p>
              <p className="max-w-3xl text-base leading-7 text-subtle md:text-lg">
                {summary}
              </p>
            </div>

            <div className="prose prose-lg max-w-none px-8 py-10 text-ink md:px-12">
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
