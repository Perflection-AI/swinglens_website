import React from 'react';
import { Instagram, Linkedin } from 'lucide-react';
import { getPath } from '../utils/paths';

// TikTok Icon Component
const TikTokIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

// Rednote Icon Component
const RednoteIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    className={className} 
    viewBox="0 0 377.97 376.53" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: '20px', height: '20px' }}
  >
    <path d="M43.86,1.11C21.81,5.7,3.59,22.91,1.34,46.07c-2.33,23.92,0,49.25,0,73.3v149.53c0,27.5-6.94,64.79,10.75,87.96,19.11,25.02,53.98,19.06,81.6,19.06h214.03c8.48,0,18.08,1.24,26.39-.49,22.05-4.59,40.26-21.8,42.51-44.96,2.33-23.92,0-49.25,0-73.3V107.64c0-27.5,6.94-64.79-10.75-87.96C346.76-5.34,311.89.62,284.27.62H70.24c-8.48,0-18.08-1.24-26.39.49M177.26,134.02l-10.26,27.85h17.59l-14.66,35.18,13.19,1.47c-1.45,3.93-3.4,11.34-6.35,14.42-2.17,2.26-5.48,1.71-8.31,1.71-6.39,0-19.3,2.65-22.72-4.4-1.57-3.23.68-7.31,1.95-10.26,2.66-6.17,6.19-12.48,7.57-19.06-3.19,0-7.22.63-10.26-.49-11.4-4.19,1.28-22.52,3.91-28.83,1.85-4.43,4.04-14.05,8.06-16.86,5.65-3.94,14.24-1.21,20.28-.73M61.45,226.38c4.03,0,10.02,1.2,12.46-2.93,2.59-4.39.73-14.06.73-19.06v-48.38c0-4.53-2.29-18.38,1.71-21.26,3.29-2.37,17.1-1.87,18.57,2.2,2.4,6.66.24,17.83.24,24.92v46.91c0,8.04,1.39,17.39-1.95,24.92-3.19,7.18-18.04,13.59-25.41,8.06-3.24-2.43-5.55-11.6-6.35-15.39M284.27,134.02v7.33c5.47,0,12.33-1.12,17.59.49,17.56,5.36,16.13,22.61,16.13,37.63,2.93,0,5.93-.23,8.8.49,16.85,4.21,14.66,21.06,14.66,34.69,0,7.27,1.36,15.86-3.42,21.99-5.27,6.75-13.9,5.86-21.5,5.86-2.36,0-6.25.75-8.31-.73-3.85-2.77-5.54-11-6.35-15.39,4.82,0,13.51,1.65,17.35-1.95,4.52-4.25,2.67-20.86-2.69-23.7-2.84-1.5-7.16-.73-10.26-.73h-21.99v42.51h-20.52v-42.51h-20.52v-20.52h20.52v-17.59h-13.19v-20.52h13.19v-7.33h20.52M237.36,141.35v20.52h-11.73v61.57h19.06v19.06h-67.43l7.82-18.32,18.57-.73v-61.57h-11.73v-20.52h45.44M320.92,161.88c0-4.17-.76-9.17.49-13.19,4.9-15.82,28.76-3.07,16.86,10.02-1.35,1.49-3.73,2.22-5.62,2.69-3.75.94-7.89.49-11.73.49M61.45,161.88l-6.11,54.24-10.02,17.59-8.8-23.46,4.4-48.38h20.52M128.88,161.88l4.4,48.38-8.8,21.99h-2.93c-7.87-12.46-8.87-25.31-10.26-39.58-.99-10.14-2.93-20.58-2.93-30.78h20.52M284.27,161.88v17.59h13.19v-17.59h-13.19M174.32,223.45l-7.33,19.06h-32.25l7.82-19.79,11.24.24,20.52.49Z"/>
  </svg>
);

// Discord Icon Component
const DiscordIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

export const Footer: React.FC = () => {
  // Same logo data URI as Header
  const cleanLogoUrl = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none'%3E%3Crect width='24' height='24' rx='6' fill='url(%23g)'/%3E%3Cpath fill='%23FBF8EE' d='M19 12.8A7.5 7.5 0 1 1 10.8 4.7 5.8 5.8 0 0 0 19 12.8z'/%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='24' y2='24' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%2395B560'/%3E%3Cstop offset='1' stop-color='%235A7833'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E";

  return (
    <footer className="bg-white text-ink py-16 border-t border-ink/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
             <div className="flex items-center gap-2 mb-6">
              <img 
                src={cleanLogoUrl} 
                alt="SwingLens Logo" 
                className="w-8 h-8 rounded-lg shadow-sm"
              />
              <span className="text-xl font-display font-bold text-ink">
                SwingLens
              </span>
            </div>
            <p className="text-sm text-subtle font-medium leading-relaxed">
              The world's most advanced AI golf coach. Analyze, improve, and dominate your swing.
            </p>
          </div>
          
          <div>
            <h4 className="text-ink font-bold mb-6 text-sm">Product</h4>
            <ul className="space-y-3 text-sm font-medium text-subtle">
              <li><a href="#features" className="hover:text-golf-600 transition-colors">Features</a></li>
              <li><a href="#solutions" className="hover:text-golf-600 transition-colors">Solutions</a></li>
              <li><a href="#testimonials" className="hover:text-golf-600 transition-colors">Testimonials</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-ink font-bold mb-6 text-sm">Company</h4>
            <ul className="space-y-3 text-sm font-medium text-subtle">
              <li><a href="#" className="hover:text-golf-600 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-golf-600 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-golf-600 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-golf-600 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-ink font-bold mb-6 text-sm">Legal</h4>
            <ul className="space-y-3 text-sm font-medium text-subtle">
              <li>
                <a 
                  href={getPath('privacy')} 
                  onClick={(e) => {
                    e.preventDefault();
                    window.history.pushState({}, '', getPath('privacy'));
                    window.dispatchEvent(new PopStateEvent('popstate'));
                  }}
                  className="hover:text-golf-600 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a 
                  href={getPath('terms')} 
                  onClick={(e) => {
                    e.preventDefault();
                    window.history.pushState({}, '', getPath('terms'));
                    window.dispatchEvent(new PopStateEvent('popstate'));
                  }}
                  className="hover:text-golf-600 transition-colors"
                >
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-golf-100">
          <p className="text-sm text-subtle">© 2025 Perflection.AI Inc. All rights reserved.</p>
          <div className="flex gap-6 mt-6 md:mt-0">
            <a 
              href="https://www.instagram.com/perflection.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5 text-golf-400 hover:text-ink cursor-pointer transition-colors" />
            </a>
            <a 
              href="https://www.tiktok.com/@perflection.ai.rizz" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="TikTok"
            >
              <TikTokIcon className="w-5 h-5 text-golf-400 hover:text-ink cursor-pointer transition-colors" />
            </a>
            <a 
              href="https://www.xiaohongshu.com/user/profile/95804794843" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Rednote"
            >
              <RednoteIcon className="w-5 h-5 text-golf-400 hover:text-ink cursor-pointer transition-colors" />
            </a>
            <a 
              href="https://www.linkedin.com/company/perflection-ai/" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 text-golf-400 hover:text-ink cursor-pointer transition-colors" />
            </a>
            <a 
              href="https://discord.gg/9mEKxpWuDR" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Discord"
            >
              <DiscordIcon className="w-5 h-5 text-golf-400 hover:text-ink cursor-pointer transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};