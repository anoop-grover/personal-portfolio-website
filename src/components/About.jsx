import { useEffect, useState } from "react";
import { FaDownload, FaStar } from "react-icons/fa";

export default function AboutMe() {
  const skills = [
    { name: "React", level: 90 },
    { name: "JavaScript", level: 95 },
    { name: "Tailwind CSS", level: 85 },
    { name: "C++", level: 80 },
    { name: "SQL", level: 85 },
  ];

  const timeline = [
    { year: "2023", event: "Started BTech CSE at LPU" },
    { year: "2024", event: "Completed Internship at XYZ Company" },
    { year: "2025", event: "Built AI-Powered Portfolio Website" },
  ];

  const [counters, setCounters] = useState({ projects: 0, experience: 0, certifications: 0 });
  const [currentCert, setCurrentCert] = useState(0);

  const certificates = [
    { title: "Full-Stack Web Development", img: "https://via.placeholder.com/300x200" },
    { title: "DSA Mastery", img: "https://via.placeholder.com/300x200" },
    { title: "SQL Certification", img: "https://via.placeholder.com/300x200" },
  ];

  const funFacts = [
    { icon: "☕", text: "Coffee Lover" },
    { icon: "🎵", text: "Music Enthusiast" },
    { icon: "📚", text: "Avid Reader" },
    { icon: "🎮", text: "Gaming Fan" },
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
    <section className="relative w-full py-20 bg-gradient-to-b from-purple-600 to-indigo-600 text-white flex flex-col items-center gap-16 px-4">

      <h2 className="text-4xl font-bold mb-10 text-center">About Me</h2>

      {/* Stats Counters */}
      <div className="flex gap-10 flex-wrap justify-center">
        <div className="text-center bg-white/20 rounded-lg p-6 min-w-[100px] hover:bg-white/30 transition">
          <h3 className="text-3xl font-bold">{counters.projects}+</h3>
          <p>Projects</p>
        </div>
        <div className="text-center bg-white/20 rounded-lg p-6 min-w-[100px] hover:bg-white/30 transition">
          <h3 className="text-3xl font-bold">{counters.experience}+</h3>
          <p>Years Experience</p>
        </div>
        <div className="text-center bg-white/20 rounded-lg p-6 min-w-[100px] hover:bg-white/30 transition">
          <h3 className="text-3xl font-bold">{counters.certifications}</h3>
          <p>Certifications</p>
        </div>
      </div>

      {/* Career Timeline */}
      <div className="w-full max-w-4xl relative mt-10">
        <div className="border-l-2 border-white/30 absolute h-full left-6 top-0"></div>
        <div className="flex flex-col gap-10">
          {timeline.map((item, idx) => (
            <div key={idx} className="flex items-start gap-6 relative">
              <div className="w-3 h-3 bg-white rounded-full mt-1.5"></div>
              <div>
                <span className="font-bold">{item.year}</span>
                <p className="ml-2">{item.event}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills Progress Bars */}
      <div className="w-full max-w-4xl flex flex-col gap-6 mt-10">
        <h3 className="text-2xl font-semibold mb-4">My Skills</h3>
        {skills.map((skill, idx) => (
          <div key={idx} className="w-full">
            <div className="flex justify-between mb-1">
              <span>{skill.name}</span>
              <span>{skill.level}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-4">
              <div
                className="bg-purple-700 h-4 rounded-full transition-all duration-1000"
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Fun Facts */}
      <div className="w-full max-w-4xl flex flex-wrap gap-4 mt-10 justify-center">
        {funFacts.map((fact, idx) => (
          <div key={idx} className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full hover:bg-white/30 transition">
            <span className="text-2xl">{fact.icon}</span>
            <span>{fact.text}</span>
          </div>
        ))}
      </div>

      {/* Certificates Carousel */}
      <div className="w-full max-w-4xl mt-10">
        <h3 className="text-2xl font-semibold mb-4 text-center">Certificates / Achievements</h3>
        <div className="relative w-full h-64 overflow-hidden rounded-xl bg-white/10 flex items-center justify-center">
          <img
            src={certificates[currentCert].img}
            alt={certificates[currentCert].title}
            className="h-48 object-contain transition-all duration-1000"
          />
          <p className="absolute bottom-4 text-white font-semibold">{certificates[currentCert].title}</p>
        </div>
      </div>

      {/* Video Introduction */}
      <div className="w-full max-w-4xl mt-10 flex justify-center">
        <video
          src="https://www.w3schools.com/html/mov_bbb.mp4" // Replace with your intro video
          controls
          className="w-full max-w-2xl rounded-xl shadow-lg"
        />
      </div>

      {/* Download Resume / Contact */}
      <div className="mt-10 flex gap-4 flex-wrap justify-center">
        <a
          href="/resume.pdf"
          download
          className="px-6 py-3 border border-white font-semibold rounded-lg hover:bg-white hover:text-purple-700 transition"
        >
          <FaDownload className="inline mr-2" /> Download Resume
        </a>
        <a
          href="#contact"
          className="px-6 py-3 bg-purple-700 text-white font-semibold rounded-lg hover:bg-purple-800 transition"
        >
          Contact Me
        </a>
      </div>

      {/* Tailwind Animated blobs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-pink-400/20 rounded-full animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-400/20 rounded-full animate-blob animation-delay-4000"></div>

      <style>
        {`
          @keyframes blob {
            0%,100%{transform:translate(0,0) scale(1);}
            33%{transform:translate(30px,-50px) scale(1.1);}
            66%{transform:translate(-20px,20px) scale(0.9);}
          }
          .animate-blob{animation:blob 8s infinite;}
          .animation-delay-2000{animation-delay:2s;}
          .animation-delay-4000{animation-delay:4s;}
        `}
      </style>
    </section>
  );
}
