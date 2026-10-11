import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { isIOS, isWeChat } from '../utils/inAppBrowser';

/**
 * Full-screen cover shown only inside WeChat. Coaches share links over WeChat, and its built-in
 * browser swallows both swinglens:// and Universal Links — the student taps "Open in SneakySwing",
 * nothing happens, and reports the link as broken. Nothing on the page can open the app from
 * there, so point at WeChat's own ··· menu and send them to the system browser, where the page
 * works as designed. Bilingual because the page is English and the students reading it in WeChat
 * mostly read Chinese.
 */
export const WeChatOpenInBrowser: React.FC = () => {
  const [open, setOpen] = useState(isWeChat);
  if (!open) return null;
  const browser = isIOS() ? 'Safari' : '浏览器';
  const browserEn = isIOS() ? 'Safari' : 'Browser';

  // Portaled to <body> and above PromoBanner (z-[1500]), which otherwise sits over the arrow.
  return createPortal(
    <div className="fixed inset-0 z-[2000] bg-black/80 text-white" onClick={() => setOpen(false)}>
      {/* Arrow toward WeChat's ··· button, top-right of its navigation bar. */}
      <svg className="absolute top-2 right-5 w-20 h-24" viewBox="0 0 80 96" fill="none" aria-hidden="true">
        <path d="M14 90 C 18 50, 40 24, 66 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
        <path d="M50 8 L 68 9 L 62 26" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      <div className="absolute top-32 inset-x-6 text-right">
        <p className="text-xl font-bold leading-relaxed">
          点击右上角 <span className="inline-block px-2 rounded bg-white/20">···</span>
        </p>
        <p className="text-xl font-bold leading-relaxed mb-4">选择「在{browser}中打开」</p>
        <p className="text-sm text-white/70 leading-relaxed">
          微信内无法打开 SneakySwing App，请在{browser}中继续。
        </p>
        <p className="text-sm text-white/70 leading-relaxed mt-3">
          Tap ··· at the top right and choose "Open in {browserEn}" — WeChat can't open the app from here.
        </p>
      </div>

      <p className="absolute bottom-10 inset-x-0 text-center text-xs text-white/50">点击任意处关闭 · Tap anywhere to close</p>
    </div>,
    document.body
  );
};
