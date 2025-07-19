import React from 'react';
import { Facebook, Instagram, Youtube, Twitter } from 'lucide-react';
import { FaTiktok } from 'react-icons/fa';

export default function Footer() {
  return (                <footer
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
  );
}