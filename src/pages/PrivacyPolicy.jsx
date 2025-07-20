import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faYoutube, faSpotify, faTiktok, faApple, faSoundcloud } from '@fortawesome/free-brands-svg-icons';
import { faSun, faMoon, faEnvelope } from '@fortawesome/free-solid-svg-icons';

export default function PrivacyPolicy() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 20]);

  useEffect(() => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <div className={`relative min-h-screen font-sans tracking-tight overflow-x-hidden ${
      isDarkMode ? 'bg-black text-[#f5f5f5]' : 'bg-[#a0c4d0] text-[#2f2f2f]'
    }`}>

      {/* Hero Section */}
      <header className={`relative z-30 border-b-4 ${
        isDarkMode ? 'bg-black border-[#f5f5f5]' : 'bg-[#8bae7e] border-[#2f2f2f]'
      }`}>
        {/* Nav Bar */}
        <nav className={`fixed top-0 left-0 right-0 z-50 w-full flex flex-wrap justify-center gap-4 pt-6 pb-4 sm:pt-8 sm:pb-6 md:pt-10 md:pb-8 uppercase font-black text-[1rem] sm:text-[1.125rem] md:text-[1.25rem] tracking-tighter ${
          isDarkMode ? 'text-[#f5f5f5]' : 'text-[#5a5a5a]'
        }`}>
          {[ 'music', 'mission', 'visuals'].map((item, idx) => (
            <a
              key={idx}
              href={`${item === 'home' ? '/' : `/#${item}`}`}
              className={`hover:bg-[#bba3d4] hover:text-white px-3 py-1 border-4 transition-all duration-150 ${
                isDarkMode
                  ? 'border-[#f5f5f5] text-[#f5f5f5] bg-black'
                  : 'border-[#5a5a5a] text-[#5a5a5a] bg-[#8bae7e]'
              }`}
              style={{ letterSpacing: '-0.05em' }}
            >
              {item}
            </a>
          ))}
        </nav>
      </header>

      {/* Ambient Sound Control Bottom-Left
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="fixed bottom-6 left-6 z-50 p-3 bg-[#f6e6d9] text-[#2f2f2f] rounded-sm border-2 border-[#2f2f2f] shadow-[0_0_0_2px_#2f2f2f] flex items-center justify-center"
        aria-label={isPlaying ? 'Pause ambient sound' : 'Play ambient sound'}
      >
        {isPlaying ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <rect x="6" y="5" width="4" height="14" />
            <rect x="14" y="5" width="4" height="14" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <polygon points="5,3 19,12 5,21" />
          </svg>
        )}
      </button> */}
{/* Dark Mode Toggle Button */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="fixed bottom-6 left-6 z-50 p-3 bg-[#f6e6d9] text-[#5a5a5a] rounded-sm border-2 border-[#5a5a5a] shadow-[0_0_0_2px_#5a5a5a] flex items-center justify-center"
        aria-label="Toggle dark mode"
      >
        <span className="w-6 h-6 flex items-center justify-center">
          <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} size="lg" />
        </span>
      </button>

      {/* Fixed Rotated Text Left Side */}
      <div className="fixed top-1/2 left-[-1.5rem] -translate-y-1/2 -rotate-90 font-black text-[2rem] tracking-tighter pointer-events-none select-none z-40 opacity-70"
        style={{ color: isDarkMode ? '#f5f5f5' : '#5a5a5a' }}
      >
        DELIA
      </div>

      {/* Main Privacy Policy Content */}
      <section className={`scroll-mt-[100px] w-full max-w-4xl mx-auto mt-40 px-8 py-16 font-sans tracking-tight ${
        isDarkMode ? 'text-[#f5f5f5] border-4  bg-[#3b3b3b]' : 'text-[#2f2f2f] border-4  bg-[#f5f5f5]'
      }`}>
        <h1 className="text-4xl font-black uppercase mb-8 text-center">Privacy Policy</h1>
        <p className="mb-6">
          At DELIA, your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you visit our site or interact with our services.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4">Information We Collect</h2>
        <p className="mb-6">
          We may collect personal information you provide directly, such as your name and email when joining our mailing list or contacting us. We also gather anonymized data such as page views and interaction times for analytics purposes.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4">How We Use Your Information</h2>
        <p className="mb-6">
          Information you share with us is used to respond to inquiries, send updates (if subscribed), and improve user experience. We do not sell or share your personal information with third parties except as required by law.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4">Your Choices</h2>
        <p className="mb-6">
          You may unsubscribe from our emails at any time. For questions about your data or to request deletion, contact us at <a href="mailto:madebydelia1@gmail.com" className="underline">madebydelia1@gmail.com</a>.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4">Updates to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Please review it periodically for any changes.
        </p>
      </section>

      {/* Grainy Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[url('/images/grunge.png')] opacity-10 mix-blend-overlay grainy-motion" />

      {/* Background glitch radial gradient */}
      <div className="fixed inset-0 pointer-events-none z-10 bg-[radial-gradient(ellipse_at_center,_rgba(255,0,0,0.15)_0%,_transparent_70%)]" />

      <audio ref={audioRef} src="/audio/loop.aiff" loop preload="auto" />

      <style>{`
        @keyframes floatGrain {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }

        .grainy-motion {
          animation: floatGrain 12s ease-in-out infinite;
        }
      `}</style>

       {/* Footer */}
            <footer
              className={`w-full px-4 py-8 text-center z-10 relative
              ${isDarkMode ? "bg-black/80 text-gray-200" : "bg-[#a0c4d0]/80 text-[#2f2f2f]"}
              flex flex-col items-center gap-2`}
            >
              <div className="flex flex-row items-center justify-center gap-6 text-2xl mb-2">
                <a
                  href="https://instagram.com/"
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#94b17c] transition"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a
                  href="https://youtube.com/"
                  aria-label="YouTube"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#94b17c] transition"
                >
                  <FontAwesomeIcon icon={faYoutube} />
                </a>
                <a
                  href="https://open.spotify.com/artist/3rQGgfHdCqkfNNpJBbGAbI"
                  aria-label="Spotify"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#94b17c] transition"
                >
                  <FontAwesomeIcon icon={faSpotify} />
                </a>
                <a
                  href="https://tiktok.com/"
                  aria-label="TikTok"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#94b17c] transition"
                >
                  <FontAwesomeIcon icon={faTiktok} />
                </a>
                <a
                  href="https://music.apple.com/us/artist/delia/1691680286"
                  aria-label="Apple Music"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#94b17c] transition"
                >
                  <FontAwesomeIcon icon={faApple} />
                </a>
                <a
                                  href="https://soundcloud.com/your-soundcloud-url"
                                  aria-label="SoundCloud"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:text-[#94b17c] transition"
                                >
                                  <FontAwesomeIcon icon={faSoundcloud} />
                                </a>
                <a
                  href="mailto:madebydelia1@gmail.com"
                  aria-label="Email"
                  className="hover:text-[#94b17c] transition"
                >
                  <FontAwesomeIcon icon={faEnvelope} />
                </a>
              </div>
              <div className="text-xs opacity-70">
                &copy; {new Date().getFullYear()} DELIA. All rights reserved.
                <a href="/privacy-policy" className="ml-2 underline hover:text-[#94b17c] transition">Privacy Policy</a>
              </div>
              
            </footer>
    </div>
  );
}