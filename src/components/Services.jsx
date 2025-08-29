import { useState, useEffect, useRef } from "react";
import {
  FaLaptopCode,
  FaMobileAlt,
  FaRobot,
  FaPalette,
  FaStar,
  FaTimes,
} from "react-icons/fa";

export default function Services() {
  const allServices = [
    {
      id: "web-dev",
      icon: <FaLaptopCode size={30} />,
      title: "Web Development",
      description:
        "Responsive, modern websites using React, Tailwind, and Vite.",
      details:
        "Full-stack development with React, Tailwind, Vite, and basic backend integration. Includes custom UI/UX, performance tweaks, and deployment.",
      cta: "Learn More",
      link: "#web",
      category: "Web",
      featured: true,
      stats: { clients: 10, projects: 20, hours: 500 },
      video: "https://www.w3schools.com/html/mov_bbb.mp4",
      image: "https://via.placeholder.com/800x450?text=Web+Dev+Preview",
      testimonials: [
        { name: "Alice", feedback: "Anoop built an amazing responsive website!" },
        { name: "Bob", feedback: "Highly professional and fast delivery." },
      ],
      faq: [
        { q: "How long does a website take?", a: "Typically 2–4 weeks depending on scope." },
        { q: "Do you handle deployment?", a: "Yes, Vercel/Netlify with CI/CD." },
      ],
    },
    {
      id: "mobile-apps",
      icon: <FaMobileAlt size={30} />,
      title: "Mobile App Development",
      description: "Cross-platform apps with React Native / Flutter.",
      details:
        "End-to-end iOS/Android development. Features: push notifications, API integration, offline storage, and app store guidance.",
      cta: "Learn More",
      link: "#mobile",
      category: "Mobile",
      featured: false,
      stats: { clients: 8, projects: 12, hours: 300 },
      video: "",
      image: "https://via.placeholder.com/800x450?text=Mobile+Apps+Preview",
      testimonials: [
        { name: "Charlie", feedback: "The mobile app exceeded our expectations!" },
      ],
      faq: [
        { q: "Do you publish to stores?", a: "I help with Play Store & App Store submission." },
      ],
    },
    {
      id: "ai-ml",
      icon: <FaRobot size={30} />,
      title: "AI / ML Solutions",
      description: "Practical AI solutions & recommendation systems.",
      details:
        "Recommendation systems, predictive analytics, and automation with Python and Scikit-learn. Clean data pipelines and dashboards.",
      cta: "Learn More",
      link: "#ai",
      category: "AI/ML",
      featured: false,
      stats: { clients: 5, projects: 8, hours: 200 },
      video: "",
      image: "https://via.placeholder.com/800x450?text=AI+%2F+ML+Preview",
      testimonials: [
        { name: "Diana", feedback: "Accurate models and clear communication." },
      ],
      faq: [
        { q: "What data do you need?", a: "Historical records in CSV/DB, KPI definitions, and goals." },
      ],
    },
  ];

  const categories = ["All", "Web", "Mobile", "AI/ML"];
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // Animated counters in modal
  const [modalCounters, setModalCounters] = useState({ clients: 0, projects: 0, hours: 0 });

  // Scroll reveal for cards
  const cardRefs = useRef([]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0", "scale-100");
          }
        }),
      { threshold: 0.2 }
    );
    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Section scroll progress indicator
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const sec = sectionRef.current;
      if (!sec) return;
      const rect = sec.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const total = rect.height - vh;
      const passed = Math.min(Math.max(vh - rect.top, 0), rect.height);
      const pct = total > 0 ? Math.min(Math.max(passed / total, 0), 1) : 0;
      setProgress(pct);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Modal open/close
  const openModal = (service) => {
    setSelectedService(service);
    setModalOpen(true);
    // animate counters up
    const duration = 800;
    const steps = 20;
    const iv = setInterval(() => {
      setModalCounters((prev) => {
        const next = {
          clients: Math.min(service.stats.clients, Math.ceil((service.stats.clients / steps) * (prev.clients + 1))),
          projects: Math.min(service.stats.projects, Math.ceil((service.stats.projects / steps) * (prev.projects + 1))),
          hours: Math.min(service.stats.hours, Math.ceil((service.stats.hours / steps) * (prev.hours + 1))),
        };
        if (next.clients === service.stats.clients && next.projects === service.stats.projects && next.hours === service.stats.hours) {
          clearInterval(iv);
        }
        return next;
      });
    }, duration / steps);
  };

  const closeModal = () => {
    setSelectedService(null);
    setModalOpen(false);
    setModalCounters({ clients: 0, projects: 0, hours: 0 });
  };

  // Filters
  const filtered = allServices.filter((s) => {
    const byCat = activeCategory === "All" || s.category === activeCategory;
    const bySearch =
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase());
    return byCat && bySearch;
  });

  // Lightbox Preview
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxMedia, setLightboxMedia] = useState({ type: "image", src: "" });
  const openLightbox = (service) => {
    if (service.video) {
      setLightboxMedia({ type: "video", src: service.video });
    } else if (service.image) {
      setLightboxMedia({ type: "image", src: service.image });
    } else {
      return;
    }
    setLightboxOpen(true);
  };
  const closeLightbox = () => setLightboxOpen(false);

  return (
    <section
      id="services"
      ref={sectionRef}
      className={`relative py-20 px-4 transition ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-b from-purple-600 to-indigo-600 text-white"
      }`}
    >
      {/* Scroll progress bar (shows only when section in view) */}
      <div className="fixed top-0 left-0 w-full h-1 bg-transparent z-50">
        <div
          className="h-1 bg-white/80 transition-all"
          style={{ width: `${Math.round(progress * 100)}%` }}
        />
      </div>

      {/* Sticky mini navigation */}
      <nav className="hidden lg:flex flex-col gap-3 fixed left-6 top-1/3 z-10">
        <a href="#services-top" className="opacity-80 hover:opacity-100 underline-offset-4 hover:underline">
          Overview
        </a>
        <a href="#services-grid" className="opacity-80 hover:opacity-100 underline-offset-4 hover:underline">
          Services
        </a>
        <a href="#services-faq" className="opacity-80 hover:opacity-100 underline-offset-4 hover:underline">
          FAQ
        </a>
        <a href="#services-book" className="opacity-80 hover:opacity-100 underline-offset-4 hover:underline">
          Book
        </a>
      </nav>

      {/* Header / Controls */}
      <div id="services-top" className="max-w-6xl mx-auto flex flex-col gap-4 mb-8">
        <div className="flex items-center justify-between">
          <h2 className="text-4xl font-bold">Services</h2>
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-3 py-2 rounded-lg text-black w-40 md:w-64"
            />
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-4 py-2 bg-black/20 rounded-lg text-sm"
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </div>

        {/* Category Tabs / Filters */}
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full border ${
                activeCategory === cat
                  ? "bg-white text-purple-700 border-white"
                  : "bg-white/20 text-white border-white/50 hover:bg-white/30"
              } transition`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Topmate booking */}
        <div id="services-book" className="flex flex-wrap items-center gap-3">
          <a
            href="https://topmate.io/your_handle"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 bg-green-500 rounded-lg font-semibold hover:bg-green-600 transition"
          >
            Book a Session (Topmate)
          </a>
          <a
            href="#contact"
            className="px-5 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition"
          >
            Contact Me
          </a>
        </div>
      </div>

      {/* Featured / Highlighted services */}
      <div className="max-w-6xl mx-auto mb-10">
        <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <FaStar /> Featured
        </h3>
        <div className="grid gap-6 md:grid-cols-2">
          {allServices
            .filter((s) => s.featured)
            .map((service) => (
              <div
                key={service.id}
                className="relative bg-white/10 rounded-xl p-6 shadow-lg hover:shadow-2xl transition"
              >
                <span className="absolute -top-3 -left-3 bg-yellow-300 text-black text-xs font-bold px-3 py-1 rounded-full">
                  Featured
                </span>
                <div className="flex items-center gap-4">
                  <div className="text-purple-300">{service.icon}</div>
                  <div>
                    <h4 className="text-xl font-semibold">{service.title}</h4>
                    <p className="text-sm opacity-90">{service.description}</p>
                  </div>
                </div>
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => openLightbox(service)}
                    className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition"
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => openModal(service)}
                    className="px-4 py-2 bg-purple-700 rounded-lg hover:bg-purple-800 transition"
                  >
                    {service.cta}
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Services Grid */}
      <div id="services-grid" className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {filtered.map((service, idx) => (
          <div
            key={service.id}
            ref={(el) => (cardRefs.current[idx] = el)}
            className="relative group bg-white/10 rounded-xl p-6 flex flex-col items-center gap-4 text-center shadow-lg hover:shadow-2xl transition duration-700 transform opacity-0 translate-y-10 scale-95"
          >
            {service.featured && (
              <span className="absolute top-3 right-3 bg-yellow-300 text-black text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                <FaStar /> Featured
              </span>
            )}
            <div className="text-purple-300">{service.icon}</div>
            <h3 className="text-xl font-semibold">{service.title}</h3>
            <p className="text-sm opacity-90">{service.description}</p>

            <div className="mt-2 flex gap-3">
              <button
                onClick={() => openLightbox(service)}
                className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition"
              >
                Preview
              </button>
              <button
                onClick={() => openModal(service)}
                className="px-4 py-2 bg-purple-700 rounded-lg hover:bg-purple-800 transition"
              >
                {service.cta}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div id="services-faq" className="max-w-6xl mx-auto mt-14">
        <h3 className="text-2xl font-semibold mb-4">FAQ</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {allServices.flatMap((s) =>
            (s.faq || []).map((f, i) => (
              <details
                key={`${s.id}-faq-${i}`}
                className="bg-white/10 rounded-lg p-4 cursor-pointer"
              >
                <summary className="font-semibold">{f.q}</summary>
                <p className="mt-2 opacity-90">{f.a}</p>
              </details>
            ))
          )}
        </div>
      </div>

      {/* Lightbox / Preview (image or video) */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={closeLightbox}
        >
          <div
            className="bg-black rounded-lg max-w-4xl w-full p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="text-white text-2xl absolute right-6 top-6"
              onClick={closeLightbox}
            >
              <FaTimes />
            </button>
            {lightboxMedia.type === "video" ? (
              <video src={lightboxMedia.src} controls className="w-full rounded-lg" />
            ) : (
              <img src={lightboxMedia.src} alt="Preview" className="w-full rounded-lg" />
            )}
          </div>
        </div>
      )}

      {/* Service Details Modal */}
      {modalOpen && selectedService && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-3xl w-full p-6 relative text-black">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-black text-2xl hover:text-purple-700 transition"
            >
              <FaTimes />
            </button>

            <div className="flex items-center gap-3 mb-2">
              <div className="text-purple-600">{selectedService.icon}</div>
              <h3 className="text-2xl font-bold">{selectedService.title}</h3>
            </div>
            <p className="mb-4">{selectedService.details}</p>

            {/* Video Demo */}
            {selectedService.video && (
              <video
                src={selectedService.video}
                controls
                className="w-full rounded-lg mb-4"
              />
            )}

            {/* Animated Counters */}
            <div className="flex justify-around mt-6 flex-wrap gap-6">
              <div className="text-center">
                <span className="text-3xl font-bold">{modalCounters.clients}+</span>
                <p>Clients</p>
              </div>
              <div className="text-center">
                <span className="text-3xl font-bold">{modalCounters.projects}+</span>
                <p>Projects</p>
              </div>
              <div className="text-center">
                <span className="text-3xl font-bold">{modalCounters.hours}+</span>
                <p>Hours</p>
              </div>
            </div>

            {/* Testimonials */}
            {selectedService.testimonials?.length > 0 && (
              <div className="mt-6">
                <h4 className="text-xl font-semibold mb-3">Client Feedback</h4>
                <div className="space-y-3">
                  {selectedService.testimonials.map((t, i) => (
                    <div key={i} className="bg-purple-50 p-3 rounded-lg">
                      <p className="italic">“{t.feedback}”</p>
                      <p className="mt-1 font-semibold">– {t.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mt-6">
              <a
                href={selectedService.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-purple-700 rounded-lg hover:bg-purple-800 text-white transition"
              >
                {selectedService.cta}
              </a>
              <a
                href="https://topmate.io/your_handle"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-green-500 rounded-lg hover:bg-green-600 text-white transition"
              >
                Book a Session (Topmate)
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Section Footer / Divider */}
      <div className="max-w-6xl mx-auto mt-16 pt-6 border-t border-white/30 text-center text-sm opacity-90">
        ── End of Services Section ──
      </div>

      {/* Decorative floating blobs */}
      <div className="pointer-events-none absolute -top-8 -right-8 w-56 h-56 bg-pink-400/20 rounded-full blur-2xl"></div>
      <div className="pointer-events-none absolute -bottom-8 -left-8 w-72 h-72 bg-purple-400/20 rounded-full blur-2xl"></div>
    </section>
  );
}
