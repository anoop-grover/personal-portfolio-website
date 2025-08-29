import { useEffect, useState } from "react";
import { FaDownload, FaQuoteLeft, FaSun, FaMoon } from "react-icons/fa";

export default function AboutMe() {
  const [darkMode, setDarkMode] = useState(false);
  const [counters, setCounters] = useState({ projects: 0, experience: 0, certifications: 0 });
  const [currentCert, setCurrentCert] = useState(0);
  const [skillFilter, setSkillFilter] = useState("All");

  const skills = [
    { name: "React", level: 90, category: "Frontend" },
    { name: "JavaScript", level: 95, category: "Frontend" },
    { name: "Tailwind CSS", level: 85, category: "Frontend" },
    { name: "C++", level: 80, category: "DSA" },
    { name: "SQL", level: 85, category: "Database" },
  ];

  const timeline = [
    { year: "2023", event: "Started BTech CSE at LPU" },
    { year: "2024", event: "Completed Internship at XYZ Company" },
    { year: "2025", event: "Built AI-Powered Portfolio Website" },
  ];

  const certificates = [
    { title: "Full-Stack Web Development", img: "https://via.placeholder.com/300x200" },
    { title: "DSA Mastery", img: "https://via.placeholder.com/300x200" },
    { title: "SQL Certification", img: "https://via.placeholder.com/300x200" },
  ];

  const funFacts = [
    { icon: "☕", text: "Cups of Coffee", count: 300 },
    { icon: "🎵", text: "Songs Listened", count: 1500 },
    { icon: "📚", text: "Books Read", count: 50 },
    { icon: "🎮", text: "Games Played", count: 120 },
  ];

  const testimonials = [
    { name: "John Doe", text: "Anoop is highly skilled and passionate!" },
    { name: "Jane Smith", text: "Great collaborator with strong coding skills." },
  ];

  const miniBlog = [
    { title: "How I solved 100+ DSA problems", date: "Aug 2025" },
    { title: "Building AI Meeting Assistant", date: "Jul 2025" },
  ];

  const quotes = [
    "Code is like humor. When you have to explain it, it’s bad.",
    "First, solve the problem. Then, write the code."
  ];

  // Animate counters
  useEffect(() => {
    const interval = setInterval(() => {
      setCounters((prev) => ({
        projects: prev.projects < 5 ? prev.projects + 1 : 5,
        experience: prev.experience < 2 ? prev.experience + 1 : 2,
        certifications: prev.certifications < 3 ? prev.certifications + 1 : 3,
      }));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Certificates carousel autoplay
  useEffect(() => {
    const certInterval = setInterval(() => {
      setCurrentCert((prev) => (prev + 1) % certificates.length);
    }, 4000);
    return () => clearInterval(certInterval);
  }, [certificates.length]);

  return (
    <section
      id="about"
      className={`relative w-full py-20 ${darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-b from-purple-600 to-indigo-600 text-white"} flex flex-col items-center gap-16 px-4`}
    >
      {/* Sticky Sidebar Nav */}
      <aside className="hidden md:block fixed left-4 top-1/3 space-y-4">
        <a href="#about" className="block hover:underline">Intro</a>
        <a href="#skills" className="block hover:underline">Skills</a>
        <a href="#timeline" className="block hover:underline">Timeline</a>
        <a href="#certs" className="block hover:underline">Certificates</a>
      </aside>

      {/* Background looping video */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover opacity-10 -z-10"
      >
        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
      </video>

      {/* Header */}
      <div className="flex flex-col items-center gap-4">
        <img src="https://via.placeholder.com/150" alt="Profile" className="rounded-full w-32 h-32 border-4 border-white" />
        <h2 className="text-4xl font-bold">About Me</h2>
        <p className="max-w-2xl text-center">Hi, I’m Anoop 👋 A passionate full-stack developer & problem solver who loves AI, Web Dev, and DSA.</p>
      </div>

      {/* Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-6 right-6 p-3 rounded-full bg-white/20 hover:bg-white/30"
      >
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>

      {/* Counters */}
      <div className="flex gap-10 flex-wrap justify-center">
        <div className="text-center bg-white/20 rounded-lg p-6 min-w-[100px]">
          <h3 className="text-3xl font-bold">{counters.projects}+</h3>
          <p>Projects</p>
        </div>
        <div className="text-center bg-white/20 rounded-lg p-6 min-w-[100px]">
          <h3 className="text-3xl font-bold">{counters.experience}+</h3>
          <p>Years Exp</p>
        </div>
        <div className="text-center bg-white/20 rounded-lg p-6 min-w-[100px]">
          <h3 className="text-3xl font-bold">{counters.certifications}</h3>
          <p>Certs</p>
        </div>
      </div>

      {/* Skills with filter */}
      <div id="skills" className="w-full max-w-4xl flex flex-col gap-6 mt-10">
        <h3 className="text-2xl font-semibold">My Skills</h3>
        <div className="flex gap-4 mb-4">
          {["All", "Frontend", "DSA", "Database"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSkillFilter(cat)}
              className={`px-4 py-2 rounded-full ${skillFilter === cat ? "bg-purple-700 text-white" : "bg-white/20"}`}
            >
              {cat}
            </button>
          ))}
        </div>
        {skills
          .filter((s) => skillFilter === "All" || s.category === skillFilter)
          .map((skill, idx) => (
            <div key={idx}>
              <div className="flex justify-between">
                <span>{skill.name}</span><span>{skill.level}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-4">
                <div className="bg-purple-700 h-4 rounded-full" style={{ width: `${skill.level}%` }}></div>
              </div>
            </div>
          ))}
      </div>

      {/* Fun Facts Counters */}
      <div className="flex flex-wrap gap-6 justify-center">
        {funFacts.map((fact, i) => (
          <div key={i} className="bg-white/20 p-4 rounded-lg text-center min-w-[120px]">
            <div className="text-3xl">{fact.icon}</div>
            <p>{fact.text}</p>
            <h3 className="text-xl font-bold">{fact.count}+</h3>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div id="timeline" className="w-full max-w-4xl">
        <h3 className="text-2xl font-semibold mb-4">Career Timeline</h3>
        <div className="relative">
          <div className="border-l-2 border-white/30 absolute h-full left-6"></div>
          {timeline.map((item, idx) => (
            <div key={idx} className="ml-10 mb-6">
              <span className="font-bold">{item.year}</span>
              <p>{item.event}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Certificates */}
      <div id="certs" className="w-full max-w-4xl text-center">
        <h3 className="text-2xl font-semibold mb-4">Certificates</h3>
        <img src={certificates[currentCert].img} alt="" className="mx-auto h-48" />
        <p>{certificates[currentCert].title}</p>
        <div className="flex gap-4 justify-center mt-4">
          <a href="/certificates.pdf" download className="px-4 py-2 bg-white/20 rounded-lg">Download All</a>
          <a href={certificates[currentCert].img} download className="px-4 py-2 bg-white/20 rounded-lg">Download Current</a>
        </div>
      </div>

      {/* Testimonials */}
      <div className="w-full max-w-4xl mt-10">
        <h3 className="text-2xl font-semibold">Testimonials</h3>
        <div className="flex flex-col gap-4 mt-4">
          {testimonials.map((t, i) => (
            <blockquote key={i} className="bg-white/20 p-4 rounded-lg">
              <FaQuoteLeft className="inline mr-2" /> {t.text}
              <footer className="mt-2 font-bold">– {t.name}</footer>
            </blockquote>
          ))}
        </div>
      </div>

      {/* Mini Blog */}
      <div className="w-full max-w-4xl mt-10">
        <h3 className="text-2xl font-semibold">Mini Blog</h3>
        <ul className="list-disc pl-6">
          {miniBlog.map((b, i) => (
            <li key={i}>{b.title} <span className="text-sm opacity-70">({b.date})</span></li>
          ))}
        </ul>
      </div>

      {/* Quotes */}
      <div className="w-full max-w-4xl mt-10 text-center">
        <h3 className="text-2xl font-semibold">Favorite Quotes</h3>
        {quotes.map((q, i) => (
          <p key={i} className="italic mt-2">“{q}”</p>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-16 border-t border-white/30 pt-6 text-sm opacity-80">
        © 2025 Anoop Grover · Built with React + Tailwind
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
        ↓ Scroll Down
      </div>
    </section>
  );
}
