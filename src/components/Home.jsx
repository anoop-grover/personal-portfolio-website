import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function HeroSection() {
  // Typing effect
  const roles = ["Full-Stack Developer", "DSA Enthusiast", "SQL Developer"];
  const [currentRole, setCurrentRole] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const typingSpeed = 120;
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
  }, [charIndex, currentRole, roleIndex]);

  // Particles Background
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  // Countdown Timer (Example: Product Launch)
  const [countdown, setCountdown] = useState(86400); // 24h in seconds
  useEffect(() => {
    const interval = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, []);
  const formatTime = (s) =>
    `${String(Math.floor(s / 3600)).padStart(2, "0")}:${String(
      Math.floor((s % 3600) / 60)
    ).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  // Dark/Light Mode Toggle
  const [dark, setDark] = useState(true);

  return (
    <section
      className={`relative w-full min-h-screen flex items-center justify-center ${
        dark ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      } overflow-hidden px-4`}
    >
      {/* Particles */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: true, zIndex: 0 },
          particles: {
            number: { value: 40 },
            color: { value: dark ? "#ffffff" : "#000000" },
            links: { enable: true, distance: 150, color: dark ? "#fff" : "#000" },
            move: { enable: true, speed: 1 },
          },
        }}
      />

      {/* Hero Card */}
      <div className="relative z-10 rounded-3xl p-8 md:p-10 flex flex-col items-center text-center max-w-3xl shadow-xl bg-white/10 backdrop-blur-md">
        {/* Sticky Mini Navigation */}
        <nav className="absolute top-4 left-4 flex gap-4 text-sm font-medium">
          <a href="#projects">Projects</a>
          <a href="#testimonials">Testimonials</a>
          <a href="#contact">Contact</a>
        </nav>

        {/* Avatar */}
        <img
          src="https://via.placeholder.com/150"
          alt="Anoop Grover"
          className="w-32 h-32 rounded-full border-4 border-white mb-6 shadow-lg"
        />

        {/* Name */}
        <h1 className="text-4xl md:text-5xl font-bold mb-2">Anoop Grover</h1>

        {/* Role Typing Effect */}
        <h2 className="text-xl md:text-2xl font-semibold mb-4 min-h-[40px]">
          {currentRole}
          <span className="animate-pulse">|</span>
        </h2>

        {/* Tagline */}
        <p className="text-base md:text-lg mb-6 max-w-md">
          Turning ideas into impactful solutions through code.
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-4 mb-6 flex-wrap justify-center">
          <a
            href="#contact"
            className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow hover:scale-105 transition"
          >
            Hire Me
          </a>
          <a
            href="/resume.pdf"
            download
            className="px-6 py-3 border border-white rounded-lg hover:bg-white hover:text-purple-700 transition"
          >
            Download Resume
          </a>
        </div>

        {/* Social Icons */}
        <div className="flex gap-6 mb-6 text-2xl">
          <a href="https://github.com/anoop-grover" target="_blank">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/in/anoopgroverrr" target="_blank">
            <FaLinkedin />
          </a>
          <a href="https://x.com/anoopgroverrr" target="_blank">
            <FaTwitter />
          </a>
        </div>

        {/* Quick Stats */}
        <div className="flex gap-6 mb-6 flex-wrap justify-center">
          <Stat number="5+" label="Projects" />
          <Stat number="2+ yrs" label="Experience" />
          <Stat number="3" label="Certifications" />
        </div>

        {/* Featured Project Preview */}
        <div className="mb-6 p-4 bg-white/20 rounded-xl shadow hover:scale-105 transition">
          <h3 className="font-bold">Featured Project</h3>
          <p className="text-sm">AI Meeting Assistant 🚀</p>
        </div>

        {/* Testimonials in Hero */}
        <blockquote className="italic mb-6 text-sm bg-white/10 rounded-lg p-4">
          "Anoop is a passionate learner and a great teammate!" – Mentor
        </blockquote>

        {/* Newsletter */}
        <form className="flex gap-2 mb-6">
          <input
            type="email"
            placeholder="Enter email"
            className="px-3 py-2 rounded-lg text-black"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 rounded-lg text-white"
          >
            Subscribe
          </button>
        </form>

        {/* Fun Facts */}
        <div className="mb-6">
          <p>⚡ Loves Coffee | 🎵 Music Enthusiast | 🌍 Exploring Tech</p>
        </div>

        {/* Languages / Tools Badge Strip */}
        <div className="flex gap-3 flex-wrap mb-6">
          <span className="px-3 py-1 bg-white/20 rounded-lg">React</span>
          <span className="px-3 py-1 bg-white/20 rounded-lg">C++</span>
          <span className="px-3 py-1 bg-white/20 rounded-lg">SQL</span>
        </div>

        {/* Countdown */}
{/*         <div className="mb-6">
          <h3 className="font-bold">Next Launch In:</h3>
          <p className="text-lg">{formatTime(countdown)}</p>
        </div> */}

        {/* Chatbot Widget */}
        <button className="mb-6 px-4 py-2 bg-green-500 rounded-lg text-white">
          💬 Chat with Me
        </button>

        {/* Music Control */}
        <button className="mb-6 px-4 py-2 bg-pink-500 rounded-lg text-white">
          🎵 Toggle Music
        </button>

        {/* Light/Dark Toggle */}
        {/*<button
          onClick={() => setDark(!dark)}
          className="px-4 py-2 bg-yellow-400 rounded-lg text-black"
        >
          {dark ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button> */}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 z-10 animate-bounce text-3xl">⬇</div>
    </section>
  );
}

// Small Stat Component
const Stat = ({ number, label }) => (
  <div className="text-center bg-white/20 rounded-lg p-4 min-w-[90px]">
    <h3 className="text-2xl font-bold">{number}</h3>
    <p>{label}</p>
  </div>
);
