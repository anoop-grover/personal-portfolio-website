import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function Home() {
  // Typing effect
  const roles = ["Full-Stack Developer", "DSA Enthusiast", "SQL Developer"];
  const [currentRole, setCurrentRole] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const typingSpeed = 150;
    const timeout = setTimeout(() => {
      if (charIndex < roles[roleIndex].length) {
        setCurrentRole(currentRole + roles[roleIndex][charIndex]);
        setCharIndex(charIndex + 1);
      } else {
        setTimeout(() => {
          setCurrentRole("");
          setCharIndex(0);
          setRoleIndex((roleIndex + 1) % roles.length);
        }, 2000);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, currentRole, roleIndex, roles]);

  // Particles init
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center text-white overflow-hidden px-4">
      
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 animate-gradient-slow z-0"></div>

      {/* Floating blobs */}
      <div className="absolute w-48 h-48 bg-purple-400/30 rounded-full top-10 left-5 animate-blob"></div>
      <div className="absolute w-60 h-60 bg-pink-400/30 rounded-full bottom-24 right-10 animate-blob animation-delay-2000"></div>
      <div className="absolute w-36 h-36 bg-indigo-400/20 rounded-full top-1/2 left-1/4 animate-blob animation-delay-4000"></div>

      {/* Particles */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: true, zIndex: 0 },
          particles: {
            number: { value: 40 },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.3 },
            size: { value: { min: 1, max: 3 } },
            move: { enable: true, speed: 1 },
            links: { enable: true, distance: 150, color: "#ffffff", opacity: 0.2, width: 1 },
          },
        }}
      />

      {/* Glass Card */}
      <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-10 flex flex-col items-center text-center max-w-xl shadow-xl hover:shadow-2xl transition-shadow duration-500">
        
        {/* Avatar */}
        <img
          src="https://via.placeholder.com/150" // replace with your avatar
          alt="Anoop Grover"
          className="w-32 md:w-36 h-32 md:h-36 rounded-full border-4 border-white mb-6 shadow-lg hover:scale-105 transform transition-transform duration-500"
        />

        {/* Name */}
        <h1 className="text-4xl md:text-5xl font-bold mb-2">Anoop Grover</h1>

        {/* Typing Role */}
        <h2 className="text-xl md:text-2xl font-semibold mb-4 min-h-[40px]">
          {currentRole}<span className="animate-pulse">|</span>
        </h2>

        {/* One-line tagline */}
        <p className="text-base md:text-lg mb-6 max-w-md">
          Turning ideas into impactful solutions through code.
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-4 mb-6 flex-wrap justify-center">
          <a
            href="#contact"
            className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow hover:bg-purple-700 hover:scale-105 transform transition-all duration-300"
          >
            Hire Me
          </a>
          <a
            href="/resume.pdf"
            download
            className="px-6 py-3 border border-white font-semibold rounded-lg hover:bg-white hover:text-purple-700 hover:scale-105 transform transition-all duration-300"
          >
            Download Resume
          </a>
        </div>

        {/* Social Icons */}
        <div className="flex gap-6 mb-6 text-2xl justify-center">
          <a href="https://github.com/anoop-grover" target="_blank" rel="noopener noreferrer" className="hover:scale-125 transform transition-transform duration-300">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/in/anoop-grover" target="_blank" rel="noopener noreferrer" className="hover:scale-125 transform transition-transform duration-300">
            <FaLinkedin />
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:scale-125 transform transition-transform duration-300">
            <FaTwitter />
          </a>
        </div>

        {/* Quick Stats */}
        <div className="flex gap-6 mb-4 flex-wrap justify-center">
          <div className="text-center bg-white/20 rounded-lg p-4 min-w-[80px] hover:bg-white/30 hover:scale-105 transform transition duration-300">
            <h3 className="text-2xl md:text-3xl font-bold">5+</h3>
            <p>Projects</p>
          </div>
          <div className="text-center bg-white/20 rounded-lg p-4 min-w-[80px] hover:bg-white/30 hover:scale-105 transform transition duration-300">
            <h3 className="text-2xl md:text-3xl font-bold">2+ yrs</h3>
            <p>Experience</p>
          </div>
          <div className="text-center bg-white/20 rounded-lg p-4 min-w-[80px] hover:bg-white/30 hover:scale-105 transform transition duration-300">
            <h3 className="text-2xl md:text-3xl font-bold">3</h3>
            <p>Certifications</p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 z-10 animate-bounce text-white text-3xl">
        ⬇
      </div>

      {/* Tailwind Animations */}
      <style>
        {`
        @keyframes gradient-slow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-slow {
          background-size: 200% 200%;
          animation: gradient-slow 15s ease infinite;
        }
        @keyframes blob {
          0%, 100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob { animation: blob 8s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        `}
      </style>

    </section>
  );
}
