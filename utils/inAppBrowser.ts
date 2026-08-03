/**
 * Detects when the site is being viewed inside a social app's embedded
 * in-app browser (Instagram, Facebook/Messenger, TikTok). These browsers
 * commonly block navigation to apps.apple.com, so download CTAs need an
 * escape path instead of a plain link. See components/StoreLink.tsx.
 */

export const isIOS = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
};

export const isAndroid = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  return /Android/i.test(navigator.userAgent);
};

export const isInstagramInApp = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  return /Instagram/i.test(navigator.userAgent);
};

export const isFacebookInApp = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  return /FBAN|FBAV|FB_IAB|FBIOS|FB4A/i.test(navigator.userAgent);
};

export const isTikTokInApp = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  return /BytedanceWebview|musical_ly/i.test(navigator.userAgent);
};

export const isInAppBrowser = (): boolean => {
  return isInstagramInApp() || isFacebookInApp() || isTikTokInApp();
};

export const getInAppBrowserName = (): string => {
  if (isInstagramInApp()) return 'Instagram';
  if (isFacebookInApp()) return 'Facebook';
  if (isTikTokInApp()) return 'TikTok';
  return 'This app';
};
