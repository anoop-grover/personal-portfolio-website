import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Home() {
  // Typing effect for roles
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

  return (
    <section className="relative w-full min-h-screen bg-gradient-to-r from-purple-600 to-indigo-600 flex flex-col items-center justify-center text-white">
      
      {/* Avatar */}
      <img
        src="https://via.placeholder.com/150" // Replace with your avatar
        alt="Anoop Grover"
        className="w-36 h-36 rounded-full border-4 border-white mb-6 shadow-lg"
      />

      {/* Name */}
      <h1 className="text-5xl md:text-6xl font-bold mb-2">Anoop Grover</h1>

      {/* Typing Role */}
      <h2 className="text-2xl md:text-3xl font-semibold mb-4 min-h-[40px]">
        {currentRole}
        <span className="animate-pulse">|</span>
      </h2>

      {/* One-line tagline */}
      <p className="text-lg md:text-xl mb-6 text-center max-w-xl">
        Turning ideas into impactful solutions through code.
      </p>

      {/* CTA Buttons */}
      <div className="flex gap-4 mb-6">
        <a
          href="#contact"
          className="px-6 py-3 bg-white text-purple-700 font-semibold rounded-lg shadow hover:bg-gray-200 transition"
        >
          Hire Me
        </a>
        <a
          href="/resume.pdf" // Replace with your resume path
          download
          className="px-6 py-3 border border-white font-semibold rounded-lg hover:bg-white hover:text-purple-700 transition"
        >
          Download Resume
        </a>
      </div>

      {/* Social Icons */}
      <div className="flex gap-4 mb-6 text-2xl">
        <a href="https://github.com/anoop-grover" target="_blank" rel="noopener noreferrer">
          <FaGithub />
        </a>
        <a href="https://linkedin.com/in/anoop-grover" target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
        </a>
        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
          <FaTwitter />
        </a>
      </div>

      {/* Quick Stats */}
      <div className="flex gap-8 mb-12">
        <div className="text-center">
          <h3 className="text-3xl font-bold">5+</h3>
          <p>Projects</p>
        </div>
        <div className="text-center">
          <h3 className="text-3xl font-bold">2+ yrs</h3>
          <p>Experience</p>
        </div>
        <div className="text-center">
          <h3 className="text-3xl font-bold">3</h3>
          <p>Certifications</p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 animate-bounce">
        <span className="text-3xl">⬇</span>
      </div>
    </section>
  );
}
