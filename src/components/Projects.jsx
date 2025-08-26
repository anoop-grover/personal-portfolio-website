import { useState, useEffect, useRef } from "react";
import { FaExternalLinkAlt, FaGithub, FaTimes } from "react-icons/fa";

export default function Projects() {
  const allProjects = [
    {
      title: "AI-Powered Portfolio",
      description: "Full-stack portfolio with interactive Hero, About Me, and Projects sections.",
      tech: ["React", "Tailwind", "Vite"],
      img: "https://via.placeholder.com/400x250",
      category: "Web",
      live: "https://personal-portfolio-website-nine-pearl.vercel.app/",
      code: "https://github.com/anoop-grover/personal-portfolio-website",
      featured: true,
      video: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      title: "Movie Recommendation System",
      description: "Python project suggesting movies based on user preferences using ML algorithms.",
      tech: ["Python", "Pandas", "Scikit-learn"],
      img: "https://via.placeholder.com/400x250",
      category: "AI/ML",
      live: "#",
      code: "https://github.com/anoop-grover/movie-recommendation-system",
      featured: false,
      video: "",
    },
  ];

  const categories = ["All", "Web", "AI/ML"];
  const [activeCategory, setActiveCategory] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const cardRefs = useRef([]);

  const projects = allProjects.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  );

  // Scroll Reveal using IntersectionObserver
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

  return (
    <section className="py-20 bg-gradient-to-b from-indigo-600 to-purple-600 text-white px-4">
      <h2 className="text-4xl font-bold text-center mb-12">Projects</h2>

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
                  <span key={i} className="bg-white/20 px-3 py-1 rounded-full text-xs">
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
          <div className="bg-white rounded-xl max-w-3xl w-full p-6 relative text-black">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-black text-2xl hover:text-purple-700 transition"
            >
              <FaTimes />
            </button>
            <h3 className="text-2xl font-bold mb-4">{selectedProject.title}</h3>
            <p className="mb-4">{selectedProject.description}</p>
            {selectedProject.video && (
              <video
                src={selectedProject.video}
                controls
                className="w-full rounded-lg mb-4"
              />
            )}
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedProject.tech.map((t, i) => (
                <span key={i} className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs">
                  {t}
                </span>
              ))}
            </div>
            <div className="flex gap-4">
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
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
