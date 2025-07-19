import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faYoutube, faSpotify, faTiktok, faApple } from '@fortawesome/free-brands-svg-icons';
import { faSun, faMoon, faEnvelope } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
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
      {/* Ambient Sound Control Bottom-Left */}
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
      </button>

      {/* Dark Mode Toggle Button */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="fixed bottom-6 left-20 z-50 p-3 bg-[#f6e6d9] text-[#2f2f2f] rounded-sm border-2 border-[#2f2f2f] shadow-[0_0_0_2px_#2f2f2f] hover:bg-[#bba3d4] transition-colors"
        aria-label="Toggle dark mode"
      >
        <span className="w-6 h-6 flex items-center justify-center">
          <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} size="lg" />
        </span>
      </button>

      {/* Fixed Rotated Text Left Side */}
      <div className="fixed top-1/2 left-0 -translate-y-1/2 -rotate-90 font-black text-[2rem] tracking-tighter pointer-events-none select-none z-40"
        style={{ color: isDarkMode ? '#f5f5f5' : '#2f2f2f' }}
      >
        DELIA
      </div>

      {/* Hero Section */}
      <header className={`relative z-30 border-b-4 ${
        isDarkMode ? 'bg-[#3b3b3b] border-[#f5f5f5]' : 'bg-[#8bae7e] border-[#2f2f2f]'
      }`}>
        {/* Nav Bar */}
        <nav className={`w-full flex flex-wrap justify-center gap-6 py-8 border-b-4 uppercase font-black text-[1.25rem] tracking-tighter ${
          isDarkMode ? 'border-[#f5f5f5] text-[#f5f5f5]' : 'border-[#2f2f2f] text-[#2f2f2f]'
        }`}>
          {['home', 'videos', 'music', 'merch', 'bio', 'shows', 'contact'].map((item, idx) => (
            <a
              key={idx}
              href={`#${item}`}
              className={`hover:bg-[#bba3d4] hover:text-white px-3 py-1 border-4 transition-all duration-150 ${
                isDarkMode
                  ? 'border-[#f5f5f5] text-[#f5f5f5]'
                  : 'border-[#2f2f2f] text-[#2f2f2f]'
              }`}
              style={{ letterSpacing: '-0.05em' }}
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Main title block with parallax scroll */}
        <motion.div
          style={{ y }}
          initial={{ opacity: 0, scale: 0.9, skewX: 5 }}
          animate={{ opacity: 1, scale: 1, skewX: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-7xl mx-auto px-8 py-20 text-center"
        >
          <h1 className="font-black uppercase text-[8rem] tracking-tighter leading-none select-none"
            style={{ color: isDarkMode ? '#f5f5f5' : '#2f2f2f' }}
          >
            DELIA
          </h1>
          <h2 className="mt-4 uppercase font-black text-[2rem] tracking-tight"
            style={{ color: isDarkMode ? '#f5f5f5' : '#2f2f2f' }}
          >
            IN-BETWEEN MOMENTS TOUR 2025
          </h2>
        </motion.div>

        {/* Large tagline */}
        <div className={`uppercase font-black text-[3rem] tracking-tighter text-center border-t-4 py-6 select-none ${
          isDarkMode ? 'text-[#f5f5f5] border-[#f5f5f5]' : 'text-[#2f2f2f] border-[#2f2f2f]'
        }`}>
          MUSIC FOR THE IN-BETWEEN
        </div>

        {/* Asymmetric blocks with rough borders */}
        <div className="flex flex-wrap justify-center gap-6 px-8 py-12 max-w-5xl mx-auto">
          {[
            'BACK 2 BACK SETS',
            'THE WHEEL PICKS THE SONGS',
            'DIFFERENT EVERY NIGHT',
          ].map((label, idx) => (
            <motion.div
              key={idx}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.1, skewX: 3 }}
              transition={{ duration: 0.4 }}
              className={`px-6 py-4 uppercase font-black text-[0.875rem] tracking-tight max-w-xs select-none ${
                isDarkMode
                  ? 'bg-[#3b3b3b] border-4 border-[#f5f5f5]'
                  : 'bg-[#f5f5f5] border-4 border-[#2f2f2f]'
              }`}
              style={{
                clipPath:
                  idx === 1
                    ? 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)'
                    : 'polygon(0 0, 100% 5%, 100% 95%, 0% 100%)',
              }}
            >
              {label}
            </motion.div>
          ))}
        </div>

        {/* YouTube Embed with no padding, background depends on dark mode */}
        <div className={`w-full max-w-4xl mx-auto border-4 ${
          isDarkMode ? 'border-[#f5f5f5] bg-[#2f2f2f]' : 'border-[#2f2f2f] bg-[#a0c4d0]'
        }`}>
          <iframe
            className="w-full aspect-video"
            src="https://www.youtube.com/embed/shqQJgJ4W5k?si=sMdELTZTZOkBHoR4"
            title="DELIA Tour Preview"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            frameBorder="0"
          />
        </div>
      </header>

      {/* About Section with aggressive grid and thick borders */}
      <section
        id="bio"
        className={`max-w-6xl mx-auto mt-20 px-8 py-16 grid grid-cols-12 gap-8 uppercase font-black tracking-tight ${
          isDarkMode ? 'text-[#f5f5f5] border-4 border-[#f5f5f5]' : 'text-[#2f2f2f] border-4 border-[#2f2f2f]'
        }`}
      >
        <motion.h2
          initial={{ opacity: 0, x: -50, skewX: 10 }}
          whileInView={{ opacity: 1, x: 0, skewX: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="col-span-12 text-[3rem] leading-none select-none"
        >
          ABOUT DELIA
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, x: 50, skewX: -10 }}
          whileInView={{ opacity: 1, x: 0, skewX: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="col-span-12 md:col-span-8 text-[1.25rem] leading-snug tracking-tight select-text"
          style={{ lineHeight: 1.3 }}
        >
          Delia makes music for the quiet in-betweens, the memories that hit you out of nowhere,
          the version of you that still believes in feeling things fully. It’s not about going back, it’s about holding on to what matters as you move forward. It’s a soundscape for the sensitive — where vulnerability is the star of the show.
        </motion.p>
      </section>

      {/* Poster-style journal section */}
      <section className={`mt-32 px-8 py-16 max-w-6xl mx-auto border-4 uppercase font-black tracking-tight ${
        isDarkMode ? 'border-[#f5f5f5] text-[#f5f5f5] bg-[#3b3b3b]' : 'border-[#2f2f2f] text-[#2f2f2f] bg-[#f5f5f5]'
      }`}>
        <motion.h2 
          initial={{ opacity: 0, y: 50 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }} 
          viewport={{ once: true }} 
          className="text-[3rem] mb-10 select-none">
          Delia Diaries
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((entry) => (
            <motion.div 
              key={entry}
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: entry * 0.2 }} 
              viewport={{ once: true }}
              className={`p-6 flex flex-col gap-4 border-4 ${
                isDarkMode ? 'border-[#f5f5f5] bg-[#2f2f2f]' : 'border-[#2f2f2f] bg-[#f5f5f5]'
              }`}
            >
              <h3 className="text-[1.25rem]">{`ENTRY ${entry}`}</h3>
              <p className={`tracking-tight leading-snug text-[1rem] ${
                isDarkMode ? 'text-[#f5f5f5]' : 'text-[#2f2f2f]'
              }`}>
                A behind-the-scenes peek at a moment that shaped the sound. These diary snippets reveal the vibe behind the vibe.
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Listen and Follow Sections with grid and stark styling */}
      <section id="music" className={`max-w-6xl mx-auto mt-20 px-8 grid grid-cols-1 md:grid-cols-2 gap-12 uppercase font-black tracking-tight ${
        isDarkMode ? 'text-[#f5f5f5] border-4 border-[#f5f5f5] bg-[#3b3b3b]' : 'text-[#2f2f2f] border-4 border-[#2f2f2f] bg-[#f5f5f5]'
      }`}>
        <div className={`p-8 flex flex-col gap-6 border-4 ${
          isDarkMode ? 'border-[#f5f5f5]' : 'border-[#2f2f2f]'
        }`}>
          <p className="text-[1.5rem] tracking-tighter select-none">LISTEN ON:</p>
          <div className={`flex gap-8 text-[1.25rem] ${
            isDarkMode ? 'text-[#f5f5f5]' : 'text-[#2f2f2f]'
          }`}>
            {['https://spotify.com', 'https://music.apple.com'].map((href, idx) => (
              <motion.a
                key={idx}
                href={href}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 hover:text-[#bba3d4] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={idx === 0 ? faSpotify : faApple} size="lg" />
                {idx === 0 ? 'Spotify' : 'Apple Music'}
              </motion.a>
            ))}
          </div>
        </div>

        <div className={`p-8 flex flex-col gap-6 border-4 ${
          isDarkMode ? 'border-[#f5f5f5]' : 'border-[#2f2f2f]'
        }`}>
          <p className="text-[1.5rem] tracking-tighter select-none">FOLLOW:</p>
          <div className={`flex gap-8 text-[1.25rem] ${
            isDarkMode ? 'text-[#f5f5f5]' : 'text-[#2f2f2f]'
          }`}>
            {[
              { href: 'https://instagram.com', icon: faInstagram },
              { href: 'https://tiktok.com', icon: faTiktok },
              { href: 'https://youtube.com', icon: faYoutube },
              { href: 'mailto:madebydelia1@gmail.com', icon: faEnvelope },
            ].map(({ href, icon }, idx) => (
              <motion.a
                key={idx}
                href={href}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 hover:text-[#bba3d4] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={icon} size="lg" /> 
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact and Mailing List Section */}
      <section
        id="contact"
        className={`w-full max-w-7xl mx-auto mt-20 px-8 py-16 grid grid-cols-12 gap-12 uppercase font-black tracking-tight overflow-hidden ${
          isDarkMode ? 'text-[#f5f5f5] border-4 border-[#f5f5f5] bg-[#3b3b3b]' : 'text-[#2f2f2f] border-4 border-[#2f2f2f] bg-[#f5f5f5]'
        }`}
      >
        <motion.div
          initial={{ opacity: 0, x: -50, skewX: 10 }}
          whileInView={{ opacity: 1, x: 0, skewX: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="col-span-12 md:col-span-6 flex flex-col gap-8"
        >
          <h3 className="text-[2rem] select-none">CONTACT US</h3>
          <form
            action="mailto:madebydelia1@gmail.com"
            method="POST"
            className="flex flex-col gap-6"
          >
            <input
              type="text"
              name="name"
              placeholder="NAME"
              className={`p-3 uppercase tracking-tight font-black placeholder-[#2f2f2f] ${
                isDarkMode
                  ? 'bg-[#3b3b3b] border-4 border-[#f5f5f5] text-[#f5f5f5] placeholder-[#f5f5f5]'
                  : 'bg-[#f5f5f5] border-4 border-[#2f2f2f] text-[#2f2f2f] placeholder-[#2f2f2f]'
              }`}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="EMAIL"
              className={`p-3 uppercase tracking-tight font-black placeholder-[#2f2f2f] ${
                isDarkMode
                  ? 'bg-[#3b3b3b] border-4 border-[#f5f5f5] text-[#f5f5f5] placeholder-[#f5f5f5]'
                  : 'bg-[#f5f5f5] border-4 border-[#2f2f2f] text-[#2f2f2f] placeholder-[#2f2f2f]'
              }`}
              required
            />
            <textarea
              name="message"
              rows="5"
              placeholder="YOUR MESSAGE"
              className={`p-3 uppercase tracking-tight font-black resize-none placeholder-[#2f2f2f] ${
                isDarkMode
                  ? 'bg-[#3b3b3b] border-4 border-[#f5f5f5] text-[#f5f5f5] placeholder-[#f5f5f5]'
                  : 'bg-[#f5f5f5] border-4 border-[#2f2f2f] text-[#2f2f2f] placeholder-[#2f2f2f]'
              }`}
              required
            />
            <button
              type="submit"
              className="bg-[#f6e6d9] text-[#2f2f2f] font-black uppercase tracking-tight py-3 border-4 border-[#2f2f2f] hover:bg-[#bba3d4] hover:text-white transition-colors"
            >
              SEND MESSAGE
            </button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50, skewX: -10 }}
          whileInView={{ opacity: 1, x: 0, skewX: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="col-span-12 md:col-span-6 flex flex-col gap-8"
        >
          <h3 className="text-[2rem] select-none">JOIN THE MAILING LIST</h3>
          <form className="flex flex-col gap-6">
            <input
              type="email"
              name="email"
              placeholder="YOUR EMAIL"
              className={`p-3 uppercase tracking-tight font-black placeholder-[#2f2f2f] ${
                isDarkMode
                  ? 'bg-[#3b3b3b] border-4 border-[#f5f5f5] text-[#f5f5f5] placeholder-[#f5f5f5]'
                  : 'bg-[#f5f5f5] border-4 border-[#2f2f2f] text-[#2f2f2f] placeholder-[#2f2f2f]'
              }`}
              required
            />
            <button
              type="submit"
              className="bg-[#f6e6d9] text-[#2f2f2f] font-black uppercase tracking-tight py-3 border-4 border-[#2f2f2f] hover:bg-[#bba3d4] hover:text-white transition-colors"
            >
              SUBSCRIBE
            </button>
          </form>
        </motion.div>
      </section>

      {/* Grainy Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[url('/images/grunge.png')] opacity-10 mix-blend-overlay grainy-motion" />

      {/* Background glitch radial gradient */}
      <div className="fixed inset-0 pointer-events-none z-10 bg-[radial-gradient(ellipse_at_center,_rgba(255,0,0,0.15)_0%,_transparent_70%)]" />

      <audio ref={audioRef} src="/audio/loop.mp3" loop preload="auto" />

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
                  href="https://instagram.com/madebydelia"
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#94b17c] transition"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a
                  href="https://youtube.com/@madebydelia"
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
                  href="https://tiktok.com/@madebydelia"
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
                  href="mailto:madebydelia1@gmail.com"
                  aria-label="Email"
                  className="hover:text-[#94b17c] transition"
                >
                  <FontAwesomeIcon icon={faEnvelope} />
                </a>
              </div>
              <div className="text-xs opacity-70">
                &copy; {new Date().getFullYear()} DELIA. All rights reserved.
              </div>
            </footer>
    </div>
  );
}