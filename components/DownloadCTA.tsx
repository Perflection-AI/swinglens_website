import React from 'react';
import { StoreLink } from './StoreLink';
import { getBasePath } from '../utils/paths';

const APP_STORE_URL = 'https://apps.apple.com/us/app/sneakyswing-golf-copilot/id6754829630';

const navigateTo = (path: string) => {
  const base = getBasePath();
  window.history.pushState({}, '', `${base}${path}`.replace(/\/+/g, '/'));
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0, behavior: 'auto' });
};

interface DownloadCTAProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  dark?: boolean;
  align?: 'start' | 'end';
}

/**
 * The real App Store download button (StoreLink, with the in-app-browser
 * escape handling), plus a small secondary link underneath for visitors who
 * aren't on iPhone — SneakySwing is iOS-only for now — to leave their email
 * for when Android support ships.
 */
export const DownloadCTA: React.FC<DownloadCTAProps> = ({
  className,
  style,
  children,
  dark = false,
  align = 'start',
}) => {
  return (
    <div className={`inline-flex flex-col flex-shrink-0 gap-2 ${align === 'end' ? 'items-end' : 'items-start'}`}>
      <StoreLink href={APP_STORE_URL} className={className} style={style}>
        {children}
      </StoreLink>
      <button
        onClick={() => navigateTo('contact')}
        className={`text-xs transition-colors duration-200 hover:underline underline-offset-2 ${
          dark ? 'text-white/35 hover:text-white/60' : 'text-subtle hover:text-ink'
        }`}
      >
        Not on iPhone? Notify me for Android
      </button>
    </div>
  );
};
