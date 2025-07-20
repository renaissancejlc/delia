import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useScroll, useTransform, AnimatePresence } from 'framer-motion';
// Framer Motion modal animation variants
const modalVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
  },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } }
};
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faYoutube, faSpotify, faTiktok, faApple, faSoundcloud } from '@fortawesome/free-brands-svg-icons';
import { faSun, faMoon, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const songCovers = {
  'hell breaks loose': 'hell-breaks-loose.jpeg',
  'you & me': 'you-&-me.jpg',
  'reach for the stars': 'reach-for-the-stars.jpeg',
  'celebration': 'celebration.jpeg',
  'dead roses': 'dead-roses.jpg',
  'smooth criminal': 'smooth-criminal.png',
  'let me talk': 'let-me-talk.jpg',
  'body high': 'body-high.png',
  'date night': 'date-night.jpg',
};



export default function Home() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const logoRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [logoY, setLogoY] = useState(80); // initial lower position
  const [isFixed, setIsFixed] = useState(false);
  // Track window width for responsive logo transforms
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);

  // Floating status banner helper
  const showStatusBanner = (message, color = 'black') => {
    const statusBox = document.createElement('div');
    statusBox.innerText = message;
    statusBox.className = `
      fixed top-6 right-6 z-50 border-2 border-white shadow-md px-4 py-2 text-xs font-mono tracking-widest
      ${color === 'red' ? 'bg-red-600 text-white' : 'bg-black text-white'}
    `;
    document.body.appendChild(statusBox);
    setTimeout(() => statusBox.remove(), 5000);
  };

  const { scrollY: framerScrollY } = useScroll();
  const y = useTransform(framerScrollY, [0, 300], [0, 20]);

  // Track window width for responsive logic
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll-based logo spinning effect (using scrollY state)
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrollY(scrollTop);
      if (scrollTop > 80) {
        setIsFixed(true);
      } else {
        setLogoY(80 - scrollTop);
        setIsFixed(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [windowWidth]);
  // Scroll to anchor if hash is present in URL (e.g., /#contact)
  useEffect(() => {
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        // Wait for DOM to settle
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [isPlaying]);

  // Toggle "dark" and "light" classes on html element based on isDarkMode
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [isDarkMode]);


  return (
    <div className={`relative min-h-screen font-sans tracking-tight overflow-x-hidden ${
      isDarkMode ? 'text-[#f5f5f5]' : 'text-[#5a5a5a]'
    }`}>
      {/* Unified full-page background layer */}
      <div className={`absolute inset-0 -z-10 bg-gradient-to-b ${
        isDarkMode
          ? 'from-black via-[#1a1a1a] to-[#330000]'
          : 'from-[#8bae7e] via-[#a0c4d0] to-[#dce7dd]'
      }`} />
      {/* Animated Logo: scroll-linked vertical motion, fixed after reaching top */}
      <div
        className="logo-container fixed z-50"
        style={{
          position: 'fixed',
          top:
            windowWidth < 770
              ? '3.5rem'
              : scrollY < 80
                ? `${105 - scrollY}px`
                : '12px',
          left:
            windowWidth < 770
              ? '1rem'
              : scrollY < 80
                ? `${135 - scrollY}px`
                : '12px',
          transition: 'top 0.2s ease-out',
        }}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
          aria-label="Scroll to top"
        >
          <img
            src="/images/logo.png"
            alt="Delia Logo"
            className="cd-logo transition-transform duration-500 ease-out"
            style={{
              transform: `rotate(${scrollY}deg)`,
            }}
          />
        </button>
      </div>
      {/* Ambient Sound Control Bottom-Left
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="fixed bottom-6 left-6 z-50 p-3 bg-[#f6e6d9] text-[#5a5a5a] rounded-sm border-2 border-[#5a5a5a] shadow-[0_0_0_2px_#5a5a5a] flex items-center justify-center"
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

      {/* Fixed Rotated Text Left Side */}
      <div className="fixed top-1/2 left-[-1.5rem] -translate-y-1/2 -rotate-90 font-black text-[2rem] tracking-tighter pointer-events-none select-none z-40 opacity-70"
        style={{ color: isDarkMode ? '#f5f5f5' : '#5a5a5a' }}
      >
        DELIA
      </div>

      {/* Hero Section */}
      <header
        className={`relative z-30 ${isDarkMode ? 'bg-transparent text-[#f5f5f5]' : 'bg-transparent text-[#5a5a5a]'}`}
      >
        {/* Nav Bar */}
        <nav className={`fixed top-0 left-0 right-0 z-50 w-full flex flex-wrap justify-center gap-4 pt-6 pb-4 sm:pt-8 sm:pb-6 md:pt-10 md:pb-8 uppercase font-black text-[1rem] sm:text-[1.125rem] md:text-[1.25rem] tracking-tighter ${
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

        {/* Main title block with parallax scroll */}
        <motion.div
          id="home"
          className="scroll-mt-28 max-w-7xl mx-auto px-8 pt-48 sm:pt-40 md:pt-36 pb-4 text-center"
          style={{ y }}
          initial={{ opacity: 0, scale: 0.9, skewX: 5, y: -10 }}
          animate={{ opacity: 1, scale: 1, skewX: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="font-black uppercase text-[8rem] tracking-tighter leading-none select-none"
            style={{ color: isDarkMode ? '#f5f5f5' : '#5a5a5a' }}
          >
            DELIA
          </h1>
          <h2 className="mt-4 uppercase font-black text-[2rem] tracking-tight"
            style={{ color: isDarkMode ? '#f5f5f5' : '#5a5a5a' }}
          >
            FOR THE IN-BETWEEN MOMENTS
          </h2>
        </motion.div>

        {/* Large tagline
        <div className={`uppercase font-black text-[3rem] tracking-tighter text-center border-t-4 py-6 select-none ${
          isDarkMode ? 'text-[#f5f5f5] border-[#f5f5f5]' : 'text-[#5a5a5a] border-[#5a5a5a]'
        }`}>
          MUSIC FOR THE IN-BETWEEN
        </div> */}
      </header>
      {/* About Section with aggressive grid and thick borders */}
      <section
        id="mission"
        className={`scroll-mt-28 max-w-6xl mx-auto mt-20 px-8 py-16 grid grid-cols-12 gap-8 uppercase font-black tracking-tight ${isDarkMode ? 'bg-transparent text-[#f5f5f5]' : 'bg-transparent text-[#5a5a5a]'}`}
      >
        <motion.h2
          initial={{ opacity: 0, x: -50, skewX: 10 }}
          whileInView={{ opacity: 1, x: 0, skewX: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="col-span-12 text-[3rem] leading-none select-none text-center"
        >
          Who is DELIA?
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, x: 50, skewX: -10 }}
          whileInView={{ opacity: 1, x: 0, skewX: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="col-span-12 md:col-span-10 md:col-start-2 text-[1.25rem] leading-snug tracking-tight select-text flex flex-col gap-4 text-center items-center"
          style={{ lineHeight: 1.5 }}
        >
          <p>DELIA all started with two kids who grew up neighbors with a vision to build a community much bigger than themselves.</p>
          <p>We all go through highs and lows in this journey of life, but it's the in-between moments that are the ones we believe in focusing on. Those are the times when you may be transitioning from one chapter in your life to the next, typically filled with noise, distraction, and high energy. But these moments are also some of the most important.</p>
          <p>What we call the in-betweens.</p>
          <p>We want to help you embrace those moments. Let go of the stress or anxiety, and live in what's real. We are here to help navigate you through the chaos and find peace in the now, in the present, to be real, and to be alive in the moment.</p>
          <p>DELIA is more than just music, it's the energy you need to get through the in-between moments in life.</p>
          <p className="pt-4">Let's all live in this moment, together.</p>
          <p className="pt-2 self-center text-center">– DELIA</p>
        </motion.div>
      </section>
       {/* Asymmetric blocks with rough borders */}
       <section id="visuals" className={`${isDarkMode ? 'bg-transparent text-[#f5f5f5]' : 'bg-transparent text-[#5a5a5a]'}`}>
        <div className="flex flex-wrap justify-center gap-6 px-8 py-12 max-w-5xl mx-auto">
          {[
            'should we do',
            'something here',
            'idk',
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
                  : 'bg-[#f5f5f5] border-4 border-[#5a5a5a]'
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
        </div>       </section>


        {/* YouTube Embed with no padding, background depends on dark mode */}
        <div
          id="visuals"
          className={`scroll-mt-28 w-full max-w-4xl mx-auto ${isDarkMode ? 'bg-transparent text-[#f5f5f5]' : 'bg-transparent text-[#5a5a5a]'}`}
        >
          <iframe
            className="w-full aspect-video"
            src="https://www.youtube.com/embed/shqQJgJ4W5k?si=sMdELTZTZOkBHoR4"
            title="DELIA Tour Preview"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            frameBorder="0"
          />
        </div>

        {/* Divider between YouTube and Music */}
        <div className="w-full flex justify-center py-8">
          <div className="w-1/2 h-px bg-gradient-to-r from-transparent via-[#a0c4d0] to-transparent dark:via-[#f5f5f5]" />
        </div>

      {/* Featured Releases Section */}
      <section
        id="music"
        className={`scroll-mt-28 mt-20 px-4 ${isDarkMode ? 'bg-transparent text-[#f5f5f5]' : 'bg-transparent text-[#5a5a5a]'}`}
      >
        <h2 className="text-center text-[2.5rem] font-black uppercase mb-12">
          <br></br>
        </h2>
        {/* Responsive grid for music tracks with motion and dreamy styling */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-10 justify-items-center"
        >
          {[
            { name: "Hell Breaks Loose", duration: "3:24" },
            { name: "You & Me", duration: "3:25" },
            { name: "Reach for the Stars", duration: "3:10" },
            { name: "Celebration", duration: "3:05" },
            { name: "Dead Roses", duration: "3:22" },
            { name: "Smooth Criminal", duration: "3:05" },
            { name: "Let Me Talk", duration: "2:39" },
            { name: "Body High", duration: "2:36" },
            { name: "Date Night", duration: "3:09" }
          ].map((track, index) => {
            const title = track.name;
            const image = `/images/covers/${songCovers[title.toLowerCase()]}`;
            return (
              <motion.div
                key={track.title}
                layout
                whileHover={{ scale: 1.03 }}
                className="rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 bg-white/20 backdrop-blur-md border border-white/30 w-full max-w-[160px]"
              >
                <div
                  onClick={() => setSelectedTrack({ ...track, image })}
                  className="cursor-pointer relative flex flex-col items-stretch justify-stretch"
                  tabIndex={0}
                  role="button"
                  aria-label={`Open details for ${track.name}`}
                >
                  <img
                    src={image}
                    alt={title}
                    className="w-full object-cover aspect-square rounded-t-lg max-w-[160px] mx-auto transition-transform duration-300 ease-in-out"
                  />
                  
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Modal */}
        <AnimatePresence>
          {selectedTrack && (
            <>
              <div
                className={`fixed inset-0 z-50 ${isDarkMode ? 'bg-black/80' : 'bg-white/80'}`}
                onClick={() => setSelectedTrack(null)}
              >
                <div className="flex items-center justify-center w-full h-full">
                  <motion.div
                    className={`relative rounded-lg shadow-lg p-6 w-full max-w-md ${isDarkMode ? 'bg-[#121212] text-white' : 'bg-white text-black'}`}
                    variants={modalVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onClick={e => e.stopPropagation()}
                  >
                    <button
                      onClick={() => setSelectedTrack(null)}
                      className="absolute top-4 right-4 z-10 text-xl font-black border-2 rounded-full w-8 h-8 flex items-center justify-center bg-transparent hover:bg-[#a0c4d0] hover:text-white transition"
                      aria-label="Close"
                      style={{
                        borderColor: isDarkMode ? '#f5f5f5' : '#5a5a5a',
                        color: isDarkMode ? '#f5f5f5' : '#5a5a5a',
                      }}
                    >
                      ×
                    </button>
                    <h3 className="text-2xl font-black mb-4">{selectedTrack.name}</h3>
                    <img
                      src={selectedTrack.image}
                      alt={selectedTrack.name}
                      className="w-full object-cover aspect-square mb-4 rounded border-2"
                      style={{
                        borderColor: isDarkMode ? '#f5f5f5' : '#5a5a5a',
                      }}
                    />
                    {/* <div className="mb-4 text-base font-bold uppercase tracking-wide">
                      Duration: <span className="font-mono">{selectedTrack.duration}</span>
                    </div> */}
                    <div className="flex justify-center gap-8 text-2xl mb-2">
                      <span className="cursor-pointer opacity-70 hover:opacity-100" title="Spotify">
                        <FontAwesomeIcon icon={faSpotify} />
                      </span>
                      <span className="cursor-pointer opacity-70 hover:opacity-100" title="Apple Music">
                        <FontAwesomeIcon icon={faApple} />
                      </span>
                      <span className="cursor-pointer opacity-70 hover:opacity-100" title="YouTube">
                        <FontAwesomeIcon icon={faYoutube} />
                      </span>
                      <span className="cursor-pointer opacity-70 hover:opacity-100" title="SoundCloud">
                        <FontAwesomeIcon icon={faSoundcloud} className="text-xl mx-2 hover:text-orange-500 cursor-pointer" />
                      </span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </>
          )}
        </AnimatePresence>
      </section>


      

      
      {/* Contact and Mailing List Section */}
      <section
        id="contact"
        className={`scroll-mt-[100px] w-full max-w-7xl mx-auto mt-20 px-4 sm:px-6 md:px-8 py-16 grid grid-cols-1 md:grid-cols-12 gap-12 uppercase font-black tracking-tight overflow-x-hidden ${isDarkMode ? 'bg-transparent text-[#f5f5f5]' : 'bg-transparent text-[#5a5a5a]'}`}
      >
        <motion.div
          initial={{ opacity: 0, x: -50, skewX: 10 }}
          whileInView={{ opacity: 1, x: 0, skewX: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="w-full md:col-span-6 flex flex-col gap-8"
        >
          <h3 className="text-[2rem] select-none">CONTACT US</h3>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const formElement = e.currentTarget;
              const formData = new FormData(formElement);
              try {
                const response = await fetch("https://formsubmit.co/ajax/contactvadisstudio@gmail.com", {
                  method: "POST",
                  headers: {
                    "Accept": "application/json"
                  },
                  body: formData
                });

                const data = await response.json();
                console.log('FormSubmit response:', data);

                if (response.ok) {
                  showStatusBanner("✓ Message sent. Stay loud.");
                  formElement.reset();
                } else {
                  showStatusBanner("Failed to send. Try again.", "red");
                }
              } catch (error) {
                console.error('FormSubmit error:', error);
                showStatusBanner("Failed to send. Try again.", "red");
              }
            }}
            className="flex flex-col gap-6 w-full max-w-full"
          >
            <input type="text" name="_honey" style={{ display: 'none' }} />
            <input
              type="text"
              name="name"
              placeholder="NAME"
              required
              className={`w-full max-w-full p-3 uppercase tracking-tight font-black placeholder-[#5a5a5a] ${
                isDarkMode
                  ? 'bg-[#3b3b3b] border-4 border-[#f5f5f5] text-[#f5f5f5] placeholder-[#f5f5f5]'
                  : 'bg-[#f5f5f5] border-4 border-[#5a5a5a] text-[#5a5a5a] placeholder-[#5a5a5a]'
              }`}
            />
            <input
              type="email"
              name="email"
              placeholder="EMAIL"
              required
              className={`w-full max-w-full p-3 uppercase tracking-tight font-black placeholder-[#5a5a5a] ${
                isDarkMode
                  ? 'bg-[#3b3b3b] border-4 border-[#f5f5f5] text-[#f5f5f5] placeholder-[#f5f5f5]'
                  : 'bg-[#f5f5f5] border-4 border-[#5a5a5a] text-[#5a5a5a] placeholder-[#5a5a5a]'
              }`}
            />
            <textarea
              name="message"
              rows="5"
              placeholder="YOUR MESSAGE"
              required
              className={`w-full max-w-full p-3 uppercase tracking-tight font-black resize-none placeholder-[#5a5a5a] ${
                isDarkMode
                  ? 'bg-[#3b3b3b] border-4 border-[#f5f5f5] text-[#f5f5f5] placeholder-[#f5f5f5]'
                  : 'bg-[#f5f5f5] border-4 border-[#5a5a5a] text-[#5a5a5a] placeholder-[#5a5a5a]'
              }`}
            />
            <div className="flex items-center gap-4 flex-wrap">
              <button
                type="submit"
                className="w-full max-w-full bg-[#f6e6d9] text-[#5a5a5a] font-black uppercase tracking-tight py-3 border-4 border-[#5a5a5a] hover:bg-[#a0c4d0] hover:text-white transition-colors"
              >
                SEND
              </button>
            </div>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50, skewX: -10 }}
          whileInView={{ opacity: 1, x: 0, skewX: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-full md:col-span-6 flex flex-col gap-8"
        >
          <h3 className="text-[2rem] select-none">JOIN THE MAILING LIST</h3>
          <form className="flex flex-col gap-6 w-full max-w-full">
            <input
              type="text"
              name="first_name"
              placeholder="FIRST NAME"
              className={`w-full max-w-full p-3 uppercase tracking-tight font-black placeholder-[#5a5a5a] ${
                isDarkMode
                  ? 'bg-[#3b3b3b] border-4 border-[#f5f5f5] text-[#f5f5f5] placeholder-[#f5f5f5]'
                  : 'bg-[#f5f5f5] border-4 border-[#5a5a5a] text-[#5a5a5a] placeholder-[#5a5a5a]'
              }`}
            />
            <input
              type="email"
              name="email"
              placeholder="YOUR EMAIL"
              className={`w-full max-w-full p-3 uppercase tracking-tight font-black placeholder-[#5a5a5a] ${
                isDarkMode
                  ? 'bg-[#3b3b3b] border-4 border-[#f5f5f5] text-[#f5f5f5] placeholder-[#f5f5f5]'
                  : 'bg-[#f5f5f5] border-4 border-[#5a5a5a] text-[#5a5a5a] placeholder-[#5a5a5a]'
              }`}
              required
            />
            <select
              name="country"
              className={`w-full max-w-full p-3 uppercase tracking-tight font-black ${
                isDarkMode
                  ? 'bg-[#3b3b3b] border-4 border-[#f5f5f5] text-[#f5f5f5]'
                  : 'bg-[#f5f5f5] border-4 border-[#5a5a5a] text-[#5a5a5a]'
              }`}
            >
              <option value="">SELECT COUNTRY</option>
              {[
                "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
                "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
                "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia",
                "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)", "Costa Rica",
                "Croatia", "Cuba", "Cyprus", "Czech Republic", "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador",
                "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France",
                "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau",
                "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland",
                "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan",
                "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar",
                "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia",
                "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal",
                "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan",
                "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar",
                "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia",
                "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa",
                "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan",
                "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan",
                "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City",
                "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
              ].map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            <button
              type="submit"
              className="w-full max-w-full bg-[#f6e6d9] text-[#5a5a5a] font-black uppercase tracking-tight py-3 border-4 border-[#5a5a5a] hover:bg-[#a0c4d0] hover:text-white transition-colors"
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

      {/* Fixed Bottom Grass Frame */}
      {(() => {
        // Generate 20 random grass images, only once per render (not on every render)
        const [grassImages, setGrassImages] = React.useState([]);
        React.useEffect(() => {
          const randomImages = Array.from({ length: 20 }, () =>
            `/images/grass${Math.floor(Math.random() * 6) + 1}.png`
          );
          setGrassImages(randomImages);
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
                  left: `${(i / 20) * 100}%`,
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
        /* Responsive Delia Logo sizing */
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
          <a href="/privacy-policy" className="ml-2 underline hover:text-[#94b17c] transition">Privacy Policy</a>.
          <span className="mx-1"></span>
          <span>
            Site by <a href="https://vadis.studio" className="underline hover:text-[#94b17c] transition">vadis.studio</a>.
          </span>
        </div>
        <br></br>
        <br></br>
        <br></br>
      </footer>
    </div>
  );
}