import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faYoutube, faSpotify, faTiktok, faApple, faSoundcloud } from '@fortawesome/free-brands-svg-icons';
import { faSun, faMoon, faEnvelope } from '@fortawesome/free-solid-svg-icons';

export default function PrivacyPolicy() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const logoRef = useRef(null);
  

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 20]);

  // Scroll-based logo rotation
    useEffect(() => {
      const handleScroll = () => {
        if (logoRef.current) {
          const rotation = window.scrollY * 0.2;
          logoRef.current.style.transform = `rotate(${rotation}deg)`;
        }
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
  useEffect(() => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <div className={`relative min-h-screen font-sans tracking-tight overflow-x-hidden ${
      isDarkMode ? 'text-[#f5f5f5]' : 'text-[#5a5a5a]'
    }`}>
      <div className={`absolute inset-0 -z-10 bg-gradient-to-b ${
        isDarkMode
          ? 'from-black via-[#1a1a1a] to-[#330000]'
          : 'from-[#8bae7e] via-[#a0c4d0] to-[#dce7dd]'
      }`} />

      {/* Rotating clickable disc logo */}
      <div
        className="logo-container fixed z-50"
        style={{
          position: 'fixed',
          top: '3.5rem',
          left: '1rem',
          transition: 'top 0.2s ease-out',
        }}
      >
        <a
          href="/"
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
          aria-label="Go to homepage"
        >
          <img
            ref={logoRef}
            src="/images/logo.png"
            alt="Delia Logo"
            className="cd-logo transition-transform duration-500 ease-out"
          />
        </a>
      </div>

      {/* <img
        ref={logoRef}
        src="/images/logo.png"
        alt="DELIA Logo"
        className="fixed top-20 sm:top-6 left-2 w-[100px] sm:w-[140px] md:w-[160px] z-40 opacity-100 pointer-events-none"
      /> */}

      {/* Hero Section */}
      <header className={`relative z-30 border-b-4 ${
        isDarkMode ? 'bg-black border-[#f5f5f5]' : 'bg-[#5a5a5a] border-[#2f2f2f]'
      }`}>
        {/* Nav Bar */}
        <nav className={`fixed top-0 left-0 right-0 z-50 w-full flex flex-wrap justify-center gap-4 pt-6 pb-4 sm:pt-8 sm:pb-6 md:pt-10 md:pb-8 uppercase font-[#5a5a5a] text-[1rem] sm:text-[1.125rem] md:text-[1.25rem] tracking-tighter ${
          isDarkMode ? 'text-[#f5f5f5]' : 'text-[#5a5a5a]'
        }`}>
          {[ 'music', 'mission', 'visuals'].map((item, idx) => (
            <a
              key={idx}
              href={`${item === 'home' ? '/' : `/#${item}`}`}
              className={`hover:bg-[#a0c4d0] hover:text-white px-3 py-1 border-4 transition-all duration-150 ${
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
{/* Dark Mode Toggle Button
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="fixed bottom-6 left-6 z-50 p-3 bg-[#f6e6d9] text-[#5a5a5a] rounded-sm border-2 border-[#5a5a5a] shadow-[0_0_0_2px_#5a5a5a] flex items-center justify-center"
        aria-label="Toggle dark mode"
      >
        <span className="w-6 h-6 flex items-center justify-center">
          <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} size="lg" />
        </span>
      </button> */}

      {/* Fixed Rotated Text Left Side
      <div className="fixed top-1/2 left-[-1.5rem] -translate-y-1/2 -rotate-90 font-[#5a5a5a] text-[2rem] tracking-tighter pointer-events-none select-none z-40 opacity-70"
        style={{ color: isDarkMode ? '#f5f5f5' : '#5a5a5a' }}
      >
        DELIA
      </div> */}

      {/* Main Privacy Policy Content */}
      <section className={`scroll-mt-[100px] w-full max-w-4xl mx-auto mt-24 px-8 py-16 font-sans tracking-tight text-center ${
        isDarkMode ? 'text-[#f5f5f5] border-4  bg-[#3b3b3b]' : 'text-[#5a5a5a]'
      }`}>
        <h1 className="text-4xl font-[#5a5a5a] uppercase mb-8 text-center">Privacy Policy</h1>
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

      {/* Fixed Bottom Grass Frame */}
      {(() => {
        const [grassImages, setGrassImages] = React.useState([]);
        React.useEffect(() => {
          if (typeof window !== 'undefined') {
            const isMobile = window.innerWidth <= 768;
            const grassCount = isMobile ? 4 : 20;
            const randomImages = Array.from({ length: grassCount }, () =>
              `/images/grass${Math.floor(Math.random() * 2) + 1}.png`
            );
            setGrassImages(randomImages);
          }
        }, []);
        return (
          <div
            className="fixed bottom-0 left-0 w-full h-[200px] z-40 pointer-events-none overflow-hidden flex justify-center items-end"
            style={{
              background: "transparent",
            }}
          >
            {grassImages.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Grass ${i}`}
                className="h-full w-auto object-cover opacity-90"
                style={{
                  position: 'absolute',
                  left: `${(i / grassImages.length) * 100}%`,
                  transform: `translateX(-50%)`,
                  bottom: -60,
                }}
              />
            ))}
          </div>
        );
      })()}

      <audio ref={audioRef} src="/audio/loop.aiff" loop preload="auto" />

      <style>{`
        @keyframes floatGrain {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }

        .grainy-motion {
          animation: floatGrain 12s ease-in-out infinite;
        }

        .cd-logo {
          max-width: 210px;
          max-height: 210px;
          display: block;
        }
        @media (min-width: 1024px) {
          .cd-logo {
            width: 210px;
            height: 210px;
          }
        }
        @media (min-width: 770px) and (max-width: 1023px) {
          .cd-logo {
            width: 120px;
            height: 120px;
          }
        }
        @media (max-width: 769px) {
          .cd-logo {
            width: 80px;
            height: 80px;
          }
        }
      `}</style>

       {/* Footer */}
            <footer
              className={`w-full px-4 py-8 text-center z-10 relative
              ${isDarkMode ? "bg-black/80 text-gray-200" : "bg-[#a0c4d0]/80 text-[#5a5a5a]"}
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
                <span className="mx-2">|</span>
                <span>
                  Site by <a href="https://vadis.studio" className="underline hover:text-[#94b17c] transition">vadis.studio</a>
                </span>
              </div>
              <br></br>
              <br></br>
              <br></br>
            </footer>
    </div>
  );
}