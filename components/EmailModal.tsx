import React, { useState } from 'react';
import { X, Mail, Loader2, CheckCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export const EmailModal: React.FC<EmailModalProps> = ({ isOpen, onClose, title = "Join Waitlist" }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const SERVICE_ID = 'service_3y7cn3d';
  const TEMPLATE_ID = 'template_3v96b9h';
  const PUBLIC_KEY = 'OgBxaFwDtbJUZI0X8';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Initialize EmailJS
      emailjs.init(PUBLIC_KEY);

      // Send email using EmailJS
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        to_email: email,
        from_name: 'Perflection AI',
        message: `New signup request from: ${email}`,
        user_email: email,
      });

      setIsSuccess(true);
      setEmail('');
      
      // Close modal after 2 seconds
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 2000);
    } catch (err) {
      console.error('EmailJS error:', err);
      setError('Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setEmail('');
      setError('');
      setIsSuccess(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div 
        className="bg-paper rounded-2xl shadow-soft-xl border border-ink/10 max-w-md w-full p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          disabled={isLoading}
          className="absolute top-4 right-4 text-subtle hover:text-ink transition-colors disabled:opacity-50"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-golf-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-golf-600" />
            </div>
            <h3 className="text-2xl font-display font-bold text-ink mb-2">Success!</h3>
            <p className="text-subtle">You're on the list. We'll be in touch at launch.</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-golf-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-golf-600" />
              </div>
              <h3 className="text-2xl font-display font-bold text-ink mb-2">{title}</h3>
              <p className="text-subtle text-sm">Enter your email to join the waitlist.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-ink mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-3 bg-white border border-ink/10 rounded-xl focus:border-golf-300 focus:ring-4 focus:ring-golf-100 transition-all outline-none text-ink placeholder:text-subtle/50 disabled:opacity-50"
                />
              </div>

              {error && (
                <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg p-3">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || !email}
                className="w-full bg-golf-600 text-white px-6 py-3 rounded-xl font-semibold shadow-card hover:bg-golf-500 hover:shadow-soft-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Join Waitlist'
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

