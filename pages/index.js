import Head from "next/head";
import { AiFillGithub, AiFillLinkedin, AiOutlineMail, AiOutlinePhone, AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { BsFillMoonStarsFill } from "react-icons/bs";
import { useState, useEffect, useRef } from "react";
import dp from "../public/dp.jpg";
import web1 from "../public/linktree.png";
import web2 from "../public/meeting.png";
import web3 from "../public/pocket.png";
import web4 from "../public/calculator.png";
import web5 from "../public/sps.png";
import Image from "next/image";

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [displayName, setDisplayName] = useState("");
  const [currentRole, setCurrentRole] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isTyping, setIsTyping] = useState(true);
  const [showContact, setShowContact] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileContactOpen, setMobileContactOpen] = useState(false);
  const roles = ["Web Developer", "Designer", "Freelancer"];
  const fullName = "I'm Anik Sarkar";
  const portfolioRef = useRef(null);

  // Typing animation
  useEffect(() => {
    let i = 0;
    let typingInterval;
    let blinkingInterval;

    const startTyping = () => {
      setIsTyping(true);
      i = 0;
      typingInterval = setInterval(() => {
        if (i <= fullName.length) {
          setDisplayName(fullName.substring(0, i));
          i++;
        } else {
          clearInterval(typingInterval);
          setTimeout(startDeleting, 2000);
        }
      }, 150);
    };

    const startDeleting = () => {
      setIsTyping(false);
      i = fullName.length;
      typingInterval = setInterval(() => {
        if (i >= 0) {
          setDisplayName(fullName.substring(0, i));
          i--;
        } else {
          clearInterval(typingInterval);
          setTimeout(startTyping, 1000);
        }
      }, 100);
    };

    blinkingInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    startTyping();

    return () => {
      clearInterval(typingInterval);
      clearInterval(blinkingInterval);
    };
  }, []);

  // Role alternation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Scroll to portfolio function
  const scrollToPortfolio = () => {
    portfolioRef.current?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const handleDownloadResume = () => {
    const resumeUrl = '/resume.pdf';
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Anik_Sarkar_Resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setMobileMenuOpen(false);
  };

  const toggleContact = () => {
    if (window.innerWidth <= 425) {
      setMobileContactOpen(!mobileContactOpen);
    } else {
      setShowContact(!showContact);
    }
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="overflow-x-hidden">
        <Head>
          <title>Anik Sarkar | Portfolio</title>
          <meta name="description" content="Web Developer and Designer Portfolio" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="bg-white px-6 dark:bg-gray-900 md:px-20 lg:px-40">
          <section className="min-h-screen">
            <nav className="py-10 mb-12 flex justify-between items-center dark:text-white">
              <h1 className="text-xl font-burtons">developed by anik</h1>
              
              {/* Desktop Navigation */}
              <ul className="hidden md:flex items-center gap-4">
                <li>
                  <BsFillMoonStarsFill
                    onClick={() => setDarkMode(!darkMode)}
                    className="cursor-pointer text-2xl hover:text-teal-500 transition-colors"
                  />
                </li>
                <li>
                  <button
                    onClick={toggleContact}
                    className="px-4 py-2 border-none rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    Contact
                  </button>
                  {showContact && (
                    <div className="absolute right-20 mt-2 w-64 bg-white dark:bg-gray-800 p-4 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-2 mb-2">
                        <AiOutlineMail className="text-teal-500" />
                        <span>anikkgp571@gmail.com</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AiOutlinePhone className="text-teal-500" />
                        <span>+91 8637315752</span>
                      </div>
                    </div>
                  )}
                </li>
                <li>
                  <button
                    onClick={handleDownloadResume}
                    className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-4 py-2 border-none rounded-md hover:opacity-90 transition-opacity"
                  >
                    Resume
                  </button>
                </li>
                <li>
                  <button
                    onClick={scrollToPortfolio}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 border-none rounded-md hover:opacity-90 transition-opacity"
                  >
                    My Portfolio
                  </button>
                </li>
              </ul>

              {/* Mobile Menu Button */}
              <button 
                className="md:hidden text-2xl z-20"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
              </button>
            </nav>

            {/* Mobile Menu Backdrop */}
            {mobileMenuOpen && (
              <div 
                className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-10"
                onClick={() => setMobileMenuOpen(false)}
              />
            )}

            {/* Mobile Menu Dropdown */}
            <div className={`md:hidden fixed right-6 top-24 w-64 bg-white dark:bg-gray-800 rounded-md shadow-xl z-20 p-4 transition-all duration-300 transform ${mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'}`}>
              <ul className="flex flex-col gap-3">
                <li>
                  <button
                    onClick={() => {
                      setDarkMode(!darkMode);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left flex items-center gap-3 px-4 py-3 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-colors"
                  >
                    <BsFillMoonStarsFill className="text-lg" />
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                  </button>
                </li>
                <li>
                  <button
                    onClick={toggleContact}
                    className="w-full text-left flex items-center gap-3 px-4 py-3 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-colors"
                  >
                    <AiOutlineMail className="text-lg" />
                    Contact Info
                    <span className={`ml-auto transition-transform ${mobileContactOpen ? 'rotate-90' : ''}`}>
                      ▶
                    </span>
                  </button>
                  {mobileContactOpen && (
                    <div className="mt-2 ml-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-md">
                      <div className="flex items-center gap-2 mb-2">
                        <AiOutlineMail className="text-teal-500 text-sm" />
                        <span className="text-sm">anikkgp571@gmail.com</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AiOutlinePhone className="text-teal-500 text-sm" />
                        <span className="text-sm">+91 8637315752</span>
                      </div>
                    </div>
                  )}
                </li>
                <li>
                  <button
                    onClick={handleDownloadResume}
                    className="w-full text-left bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-4 py-3 rounded-md flex items-center gap-3 hover:opacity-90 transition-opacity"
                  >
                    <span>Download Resume</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={scrollToPortfolio}
                    className="w-full text-left bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-3 rounded-md flex items-center gap-3 hover:opacity-90 transition-opacity"
                  >
                    <span>View Portfolio</span>
                  </button>
                </li>
              </ul>
            </div>

            <div className="text-center p-10 py-10">
              <div className="relative inline-block">
                <h2 className="text-5xl py-2 text-teal-600 font-medium dark:text-teal-400 md:text-6xl">
                  Hello👋🏻<br />{displayName}
                  <span 
                    className={`ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
                    style={{ color: isTyping ? 'inherit' : '#f43f5e' }}
                  >
                    |
                  </span>
                </h2>
              </div>

              <div className="h-12">
                <h3 
                  className="text-2xl py-2 dark:text-white md:text-3xl transition-opacity duration-500"
                  key={currentRole}
                >
                  {roles[currentRole]}
                </h3>
              </div>

              <p className="text-md py-5 leading-8 text-gray-800 dark:text-gray-200 max-w-xl mx-auto md:text-xl">
                Freelance Designer & Developer Open for work – build sleek designs and functional code to bring your ideas to life. Let's collaborate and create something amazing!
              </p>

              <div className="text-5xl flex justify-center gap-16 py-3 text-gray-600 dark:text-gray-400">
                <a
                  href="https://github.com/IamAnik2003"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <AiFillGithub className="hover:text-teal-500 transition duration-300" />
                </a>
                <a
                  href="https://www.linkedin.com/public-profile/settings?trk=d_flagship3_profile_self_view_public_profile"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <AiFillLinkedin className="hover:text-teal-500 transition duration-300" />
                </a>
                <a
                  href="mailto:anikkgp571@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Email"
                >
                  <AiOutlineMail className="hover:text-teal-500 transition duration-300" />
                </a>
              </div>

              {/* Responsive Profile Image */}
              <div className="mx-auto bg-gradient-to-b from-teal-500 rounded-full w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 relative overflow-hidden mt-10 md:mt-20">
  <img 
    src="/dp.jpg" 
    alt="Anik Sarkar" 
    className="w-full h-full object-cover"
  />
</div>
            </div>
          </section>

          <section ref={portfolioRef} className="py-10">
            <div>
              <h3 className="text-3xl py-1 dark:text-white">Portfolio</h3>
              <p className="text-md py-2 leading-8 text-gray-800 dark:text-gray-200">
                Since the beginning of my journey as a freelance designer and
                developer, I've created multiple projects for both business and consumer use.
              </p>
              <p className="text-md py-2 leading-8 text-gray-800 dark:text-gray-200">
                I offer a wide range of services, including brand design,
                programming and teaching.
              </p>
            </div>
            <div className="flex flex-col gap-10 py-10 lg:flex-row lg:flex-wrap">
              <a className="basis-1/3 flex-1" href="https://link-tree-react-yb2i.vercel.app/" target="_blank" rel="noopener noreferrer">
                <h1 className="text-2xl py-2 dark:text-white"> 
                  Project 1: Link Management App (React.js)
                </h1>
                <Image
                  className="rounded-lg object-cover hover:scale-105 transition-transform duration-300"
                  width={"100%"}
                  height={"100%"}
                  layout="responsive"
                  src={web1}
                  alt="Link Management App"
                />
              </a>
              <a className="basis-1/3 flex-1" href="https://meeting-management2.vercel.app/" target="_blank" rel="noopener noreferrer">
                <h1 className="text-2xl py-2 dark:text-white"> 
                  Project 2: Meeting Management App (React.js)
                </h1>
                <Image
                  className="rounded-lg object-cover hover:scale-105 transition-transform duration-300"
                  width={"100%"}
                  height={"100%"}
                  layout="responsive"
                  src={web2}
                  alt="Meeting Management App"
                />
              </a>
              <a className="basis-1/3 flex-1" href="https://react-notes-app-three-sigma.vercel.app/" target="_blank" rel="noopener noreferrer">
                <h1 className="text-2xl py-2 dark:text-white"> 
                  Project 3: Pocket Notes App (React.js)
                </h1>
                <Image
                  className="rounded-lg object-cover hover:scale-105 transition-transform duration-300"
                  width={"100%"}
                  height={"100%"}
                  layout="responsive"
                  src={web3}
                  alt="Pocket Notes App"
                />
              </a>
              <a className="basis-1/3 flex-1" href="https://spectacular-piroshki-73f50f.netlify.app/" target="_blank" rel="noopener noreferrer">
                <h1 className="text-2xl py-2 dark:text-white"> 
                  Project 4: Calculator App (React.js)
                </h1>
                <Image
                  className="rounded-lg object-cover hover:scale-105 transition-transform duration-300"
                  width={"100%"}
                  height={"100%"}
                  layout="responsive"
                  src={web4}
                  alt="Calculator App"
                />
              </a>
              <a className="basis-1/3 flex-1" href="https://spontaneous-longma-8149e9.netlify.app/" target="_blank" rel="noopener noreferrer">
                <h1 className="text-2xl py-2 dark:text-white"> 
                  Project 5: Rock Paper Scissors Game (HTML/CSS/JS)
                </h1>
                <Image
                  className="rounded-lg object-cover hover:scale-105 transition-transform duration-300"
                  width={"100%"}
                  height={"100%"}
                  layout="responsive"
                  src={web5}
                  alt="Rock Paper Scissors Game"
                />
              </a>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}