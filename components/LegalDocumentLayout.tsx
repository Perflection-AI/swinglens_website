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
            <div className="border-b border-ink/10 bg-gradient-to-br from-golf-50 via-white to-paper px-8 py-10 md:px-12">
              {backLink ? (
                <a
                  href={resolveHref(backLink.href)}
                  className="mb-5 inline-flex items-center text-sm font-semibold text-golf-700 transition-colors hover:text-golf-800"
                >
                  ← {backLink.label}
                </a>
              ) : null}
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-golf-700">
                {eyebrow}
              </p>
              <h1 className="mb-4 text-4xl font-display font-bold text-ink md:text-5xl">
                {title}
              </h1>
              <p className="mb-4 text-sm font-semibold text-subtle">
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
