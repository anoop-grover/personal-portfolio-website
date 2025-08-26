import { useState, useEffect, useRef } from "react";
import { FaLaptopCode, FaMobileAlt, FaRobot, FaPalette, FaStar, FaTimes } from "react-icons/fa";

export default function Services() {
  const allServices = [
    {
      icon: <FaLaptopCode size={30} />,
      title: "Web Development",
      description: "Building responsive, modern websites using React, Tailwind, and Vite.",
      details: "Full-stack web development with React, Tailwind, Vite, and backend integration. Custom UI/UX design, performance optimization, and deployment included.",
      cta: "Learn More",
      link: "#web",
      stats: { clients: 10, projects: 20, hours: 500 },
      video: "https://www.w3schools.com/html/mov_bbb.mp4",
      testimonials: [
        { name: "Alice", feedback: "Anoop built an amazing responsive website!" },
        { name: "Bob", feedback: "Highly professional and fast delivery." },
      ],
    },
    {
      icon: <FaMobileAlt size={30} />,
      title: "Mobile App Development",
      description: "Creating cross-platform mobile apps with React Native and Flutter.",
      details: "End-to-end mobile app development for iOS and Android. Features include push notifications, API integration, and responsive design.",
      cta: "Learn More",
      link: "#mobile",
      stats: { clients: 8, projects: 12, hours: 300 },
      video: "",
      testimonials: [
        { name: "Charlie", feedback: "The mobile app exceeded our expectations!" },
      ],
    },
    {
      icon: <FaRobot size={30} />,
      title: "AI / ML Solutions",
      description: "Developing AI-powered solutions and recommendation systems.",
      details: "AI and ML solutions for recommendation systems, predictive analytics, and automation. Includes Python, Scikit-learn, and ML pipelines.",
      cta: "Learn More",
      link: "#ai",
      stats: { clients: 5, projects: 8, hours: 200 },
      video: "",
      testimonials: [
        { name: "Diana", feedback: "Anoop's ML models were accurate and efficient." },
      ],
    },
  ];

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const cardRefs = useRef([]);

  // Scroll Reveal using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0", "scale-100");
          }
        });
      },
      { threshold: 0.2 }
    );
    cardRefs.current.forEach((el) => observer.observe(el));
  }, []);

  const openModal = (service) => {
    setSelectedService(service);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedService(null);
    setModalOpen(false);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-purple-600 to-indigo-600 text-white px-4">
      <h2 className="text-4xl font-bold text-center mb-12">Services</h2>

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {allServices.map((service, idx) => (
          <div
            key={idx}
            ref={(el) => (cardRefs.current[idx] = el)}
            className="bg-white/10 rounded-xl p-6 flex flex-col items-center gap-4 text-center shadow-lg hover:shadow-2xl transition duration-700 transform opacity-0 translate-y-10 scale-95 cursor-pointer"
            onClick={() => openModal(service)}
          >
            <div className="text-purple-400">{service.icon}</div>
            <h3 className="text-xl font-semibold">{service.title}</h3>
            <p className="text-sm">{service.description}</p>
            <button className="mt-4 px-6 py-2 bg-purple-700 rounded-lg hover:bg-purple-800 transition">
              {service.cta}
            </button>
          </div>
        ))}
      </div>

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
            <h3 className="text-2xl font-bold mb-4">{selectedService.title}</h3>
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
                <span className="text-3xl font-bold">{selectedService.stats.clients}+</span>
                <p>Clients</p>
              </div>
              <div className="text-center">
                <span className="text-3xl font-bold">{selectedService.stats.projects}+</span>
                <p>Projects</p>
              </div>
              <div className="text-center">
                <span className="text-3xl font-bold">{selectedService.stats.hours}+</span>
                <p>Hours</p>
              </div>
            </div>

            {/* Testimonials */}
            {selectedService.testimonials && selectedService.testimonials.length > 0 && (
              <div className="mt-6">
                <h4 className="text-xl font-semibold mb-4">Testimonials</h4>
                <div className="space-y-4">
                  {selectedService.testimonials.map((t, i) => (
                    <div
                      key={i}
                      className="bg-purple-100/20 p-4 rounded-lg text-black"
                    >
                      <p className="italic">"{t.feedback}"</p>
                      <p className="mt-1 font-semibold">- {t.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4 mt-6">
              <a
                href={selectedService.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-purple-700 rounded-lg hover:bg-purple-800 text-white transition"
              >
                {selectedService.cta}
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
