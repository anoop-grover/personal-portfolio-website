// src/components/Certifications.jsx
"use client";

import { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const certificationsData = [
  {
    id: 1,
    title: "Python for Everybody",
    issuer: "Coursera",
    year: "2024",
    hours: 40,
    skills: ["Python", "Programming"],
    badgeLink: "#",
    completed: true,
    location: { coordinates: [-84.3879, 33.749], name: "USA" },
  },
  {
    id: 2,
    title: "SQL Mastery",
    issuer: "Udemy",
    year: "2025",
    hours: 30,
    skills: ["SQL", "Databases"],
    badgeLink: "#",
    completed: true,
    location: { coordinates: [2.3522, 48.8566], name: "France" },
  },
  {
    id: 3,
    title: "Full-Stack Web Development",
    issuer: "edX",
    year: "2025",
    hours: 120,
    skills: ["HTML", "CSS", "JavaScript", "React"],
    badgeLink: "#",
    completed: false,
    location: { coordinates: [77.209, 28.6139], name: "India" },
  },
];

// Testimonials data
const testimonials = [
  { id: 1, name: "Dr. Smith", role: "Coursera Instructor", feedback: "Anoop showed exceptional dedication." },
  { id: 2, name: "Jane Doe", role: "Mentor", feedback: "Strong SQL fundamentals and problem-solving skills." },
  { id: 3, name: "Peer Review", role: "Teammate", feedback: "Great collaborator during full-stack project." },
];

// Hook for animated counters
function useCountUp(target, duration = 1500) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const step = Math.ceil((target / duration) * 20);
    const interval = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(start);
      }
    }, 20);
    return () => clearInterval(interval);
  }, [target, duration]);

  return count;
}

export default function Certifications() {
  const [search, setSearch] = useState("");

  const filteredCertifications = certificationsData.filter((cert) =>
    cert.title.toLowerCase().includes(search.toLowerCase()) ||
    cert.issuer.toLowerCase().includes(search.toLowerCase())
  );

  const totalCerts = useCountUp(certificationsData.length);
  const completedCerts = useCountUp(certificationsData.filter(c => c.completed).length);
  const totalHours = useCountUp(certificationsData.reduce((sum, cert) => sum + cert.hours, 0));

  const downloadAllPDF = () => {
    alert("Download All Certificates as PDF - Feature placeholder");
  };

  return (
    <section className="py-16 px-6 bg-gray-50 dark:bg-gray-900 relative">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-gray-800 dark:text-gray-100">
          🏆 Certifications
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
          Explore my certifications, skills, and achievements
        </p>

        {/* Stats Counters */}
        <div className="flex justify-center gap-12 mb-8 text-center">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{totalCerts}</h3>
            <p className="text-gray-500 dark:text-gray-400">Certificates</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{completedCerts}</h3>
            <p className="text-gray-500 dark:text-gray-400">Completed</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{totalHours}+</h3>
            <p className="text-gray-500 dark:text-gray-400">Hours Studied</p>
          </div>
        </div>

        {/* Search */}
        <div className="mb-8 flex justify-center">
          <input
            type="text"
            placeholder="Search certifications..."
            className="px-4 py-2 border rounded-lg w-full sm:w-1/2 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Download All PDF */}
        <div className="text-center mb-8">
          <button
            onClick={downloadAllPDF}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            📄 Download All Certificates as PDF
          </button>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertifications.map((cert) => (
            <div
              key={cert.id}
              className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300 relative"
            >
              <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">{cert.title}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{cert.issuer} | {cert.year}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{cert.hours} Hours</p>

              {/* Skills / Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {cert.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 text-xs rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                  <div
                    className={`h-2 bg-green-500 rounded-full transition-all duration-500`}
                    style={{ width: cert.completed ? "100%" : "50%" }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {cert.completed ? "Completed" : "In Progress"}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <a
                  href={cert.badgeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  Verify Badge
                </a>
                <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                  Download PDF
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline View */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Timeline View</h3>
          <div className="relative border-l-2 border-gray-300 dark:border-gray-600 pl-6">
            {certificationsData.map((cert, index) => (
              <div key={index} className="mb-6 relative">
                <div className="absolute -left-3 w-6 h-6 bg-blue-600 rounded-full border-2 border-white dark:border-gray-900"></div>
                <p className="text-gray-700 dark:text-gray-300 font-semibold">{cert.year} - {cert.title}</p>
                <p className="text-gray-500 dark:text-gray-400">{cert.issuer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Gamification Section */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">🎮 Gamification</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 bg-yellow-100 dark:bg-yellow-800 rounded-xl shadow">
              <h4 className="font-bold text-yellow-800 dark:text-yellow-200">Level 1</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Beginner – 1–2 certs</p>
            </div>
            <div className="p-4 bg-green-100 dark:bg-green-800 rounded-xl shadow">
              <h4 className="font-bold text-green-800 dark:text-green-200">Level 2</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Intermediate – 3–5 certs</p>
            </div>
            <div className="p-4 bg-purple-100 dark:bg-purple-800 rounded-xl shadow">
              <h4 className="font-bold text-purple-800 dark:text-purple-200">Level 3</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Expert – 6+ certs</p>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">💬 Testimonials</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.id} className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                <p className="italic text-gray-700 dark:text-gray-300">“{t.feedback}”</p>
                <p className="mt-3 font-semibold text-gray-800 dark:text-gray-100">{t.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive World Map */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100 text-center">
            🌍 Global Certification Locations
          </h3>
          <ComposableMap projection="geoMercator" width={800} height={300} className="mx-auto">
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#E5E7EB"
                    stroke="#D1D5DB"
                    className="dark:fill-gray-700 dark:stroke-gray-600"
                  />
                ))
              }
            </Geographies>
            {certificationsData.map((cert) => (
              <Marker key={cert.id} coordinates={cert.location.coordinates}>
                <circle r={6} fill="#2563EB" stroke="#fff" strokeWidth={2} />
                <text textAnchor="middle" y={-10} style={{ fontSize: "10px", fill: "#111" }}>
                  {cert.issuer}
                </text>
              </Marker>
            ))}
          </ComposableMap>
        </div>
      </div>
    </section>
  );
}
