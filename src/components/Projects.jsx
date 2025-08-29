import { useState, useEffect, useRef } from "react";
import {
  FaExternalLinkAlt,
  FaGithub,
  FaTimes,
  FaDownload,
  FaStar,
} from "react-icons/fa";

export default function Projects() {
  const allProjects = [
    {
      title: "AI-Powered Portfolio",
      description:
        "Full-stack portfolio with interactive Hero, About Me, and Projects sections.",
      problem: "Most portfolios are static and lack interactivity.",
      solution:
        "Built a dynamic portfolio with React, Tailwind, and animations.",
      impact: "Improved recruiter engagement by 3x.",
      tech: ["React", "Tailwind", "Vite"],
      tags: ["Frontend", "Personal", "Portfolio"],
      img: "https://via.placeholder.com/400x250",
      category: "Web",
      live: "https://personal-portfolio-website-nine-pearl.vercel.app/",
      code: "https://github.com/anoop-grover/personal-portfolio-website",
      featured: true,
      pinned: true,
      stats: { stars: 120, views: 2000 },
      video: "https://www.w3schools.com/html/mov_bbb.mp4",
      timeline: "2025 Jan – 2025 Feb",
      testimonial: "Amazing project execution and creativity! – Instructor",
    },
    {
      title: "Movie Recommendation System",
      description:
        "Python project suggesting movies based on user preferences using ML algorithms.",
      problem: "Hard to find personalized movie suggestions.",
      solution:
        "Implemented ML model to recommend movies based on user input.",
      impact: "Improved accuracy by 85% compared to random picks.",
      tech: ["Python", "Pandas", "Scikit-learn"],
      tags: ["ML", "Python", "Recommendation"],
      img: "https://via.placeholder.com/400x250",
      category: "AI/ML",
      live: "#",
      code: "https://github.com/anoop-grover/movie-recommendation-system",
      featured: false,
      pinned: false,
      stats: { stars: 45, views: 800 },
      video: "",
      timeline: "2024 Aug – 2024 Sep",
      testimonial: "Great start with ML projects. – Peer",
    },
  ];

  const categories = ["All", "Web", "AI/ML"];
  const [activeCategory, setActiveCategory] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const cardRefs = useRef([]);

  const projects = allProjects.filter(
    (p) =>
      (activeCategory === "All" || p.category === activeCategory) &&
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Scroll Reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
          }
        });
      },
      { threshold: 0.2 }
    );
    cardRefs.current.forEach((el) => observer.observe(el));
  }, []);

  const openModal = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setModalOpen(false);
  };

  // Download Portfolio PDF (Dummy)
  const downloadPortfolioPDF = () => {
    const blob = new Blob(["My Full Project Portfolio"], {
      type: "application/pdf",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "portfolio.pdf";
    a.click();
  };

  // Download Project Code (ZIP dummy)
  const downloadProjectZip = (title) => {
    const blob = new Blob([`Code files for ${title}`], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.replace(/\s+/g, "_")}.zip`;
    a.click();
  };

  return (
    <section
      className={`py-20 px-4 transition ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-b from-indigo-600 to-purple-600 text-white"
      }`}
    >
      <div className="flex justify-between items-center mb-6 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold">Projects</h2>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 bg-black/20 rounded-lg text-sm"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* Search + PDF Download */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 max-w-6xl mx-auto mb-8">
        <input
          type="text"
          placeholder="Search Projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 rounded-lg w-full md:w-1/3 text-black"
        />
        <button
          onClick={downloadPortfolioPDF}
          className="px-4 py-2 bg-white text-purple-700 rounded-lg flex items-center gap-2"
        >
          <FaDownload /> Download Portfolio PDF
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex justify-center gap-4 mb-10 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full border ${
              activeCategory === cat
                ? "bg-white text-purple-700 border-white"
                : "bg-white/20 text-white border-white/50 hover:bg-white/30"
            } transition`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Pinned Projects Row */}
      <div className="max-w-6xl mx-auto mb-12">
        <h3 className="text-2xl font-semibold mb-4">⭐ Pinned Projects</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {allProjects
            .filter((p) => p.pinned)
            .map((p, idx) => (
              <div
                key={idx}
                className="bg-white/20 rounded-lg p-4 shadow-lg cursor-pointer"
                onClick={() => openModal(p)}
              >
                <h4 className="text-lg font-bold">{p.title}</h4>
                <p className="text-sm">{p.description}</p>
              </div>
            ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {projects.map((project, idx) => (
          <div
            key={idx}
            ref={(el) => (cardRefs.current[idx] = el)}
            className="relative group rounded-xl overflow-hidden shadow-lg cursor-pointer opacity-0 translate-y-10 transform transition-all duration-700"
            onClick={() => openModal(project)}
          >
            <img
              src={project.img}
              alt={project.title}
              className="w-full h-48 object-cover group-hover:scale-105 transform transition duration-300"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex flex-col justify-center items-center p-4 text-center gap-2">
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <p className="text-sm">{project.description}</p>
              <div className="flex flex-wrap gap-2 mt-2 justify-center">
                {project.tech.map((t, i) => (
                  <span
                    key={i}
                    className="bg-white/20 px-3 py-1 rounded-full text-xs"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && selectedProject && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full p-6 relative text-black overflow-y-auto max-h-[90vh]">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-black text-2xl hover:text-purple-700 transition"
            >
              <FaTimes />
            </button>
            <h3 className="text-2xl font-bold mb-2">
              {selectedProject.title}
            </h3>
            <p className="mb-2">{selectedProject.description}</p>

            {/* Timeline */}
            <p className="text-sm italic mb-4">
              ⏳ {selectedProject.timeline}
            </p>

            {/* Video */}
            {selectedProject.video && (
              <video
                src={selectedProject.video}
                controls
                className="w-full rounded-lg mb-4"
              />
            )}

            {/* Case Study */}
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <h4 className="font-semibold">Problem</h4>
              <p>{selectedProject.problem}</p>
              <h4 className="font-semibold mt-2">Solution</h4>
              <p>{selectedProject.solution}</p>
              <h4 className="font-semibold mt-2">Impact</h4>
              <p>{selectedProject.impact}</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedProject.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="flex gap-6 mb-4">
              <span>⭐ {selectedProject.stats.stars} Stars</span>
              <span>👁 {selectedProject.stats.views} Views</span>
            </div>

            {/* Tech */}
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedProject.tech.map((t, i) => (
                <span
                  key={i}
                  className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex gap-4 mb-4">
              {selectedProject.live && (
                <a
                  href={selectedProject.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-purple-700 rounded-lg hover:bg-purple-800 text-white flex items-center gap-2 transition"
                >
                  <FaExternalLinkAlt /> Live
                </a>
              )}
              {selectedProject.code && (
                <a
                  href={selectedProject.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-purple-700 rounded-lg hover:bg-purple-700 hover:text-white flex items-center gap-2 transition"
                >
                  <FaGithub /> Code
                </a>
              )}
              <button
                onClick={() => downloadProjectZip(selectedProject.title)}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg flex items-center gap-2"
              >
                <FaDownload /> Code ZIP
              </button>
            </div>

            {/* Testimonial */}
            <div className="bg-purple-50 p-4 rounded-lg italic">
              “{selectedProject.testimonial}”
            </div>
          </div>
        </div>
      )}

      {/* Section Footer */}
      <div className="text-center mt-16 text-sm opacity-80">
        ── End of Projects Section ──
      </div>
    </section>
  );
}
