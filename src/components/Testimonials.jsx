import { useState, useEffect } from "react";
import Slider from "react-slick";
import { FaStar, FaQuoteLeft, FaQuoteRight, FaPlus, FaThumbsUp } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Testimonials() {
  const initialTestimonials = [
    {
      name: "Alice Johnson",
      designation: "Mentor",
      company: "Google",
      image: "https://via.placeholder.com/100",
      rating: 5,
      category: "Mentor",
      feedback: "Anoop is an exceptional learner and a problem-solver. Highly recommended!",
      likes: 0,
    },
    {
      name: "Bob Smith",
      designation: "Client",
      company: "Freelance Project",
      image: "https://via.placeholder.com/100",
      rating: 4,
      category: "Client",
      feedback: "Delivered the project with high professionalism and efficiency.",
      likes: 0,
    },
    {
      name: "Charlie Lee",
      designation: "Teammate",
      company: "FAANG Prep Group",
      image: "https://via.placeholder.com/100",
      rating: 5,
      category: "Teammate",
      feedback: "Great collaboration and communication skills!",
      likes: 0,
    },
  ];

  const categories = ["All", "Mentor", "Client", "Teammate", "Professor"];
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [ratingFilter, setRatingFilter] = useState(0);
  const [showForm, setShowForm] = useState(false);

  // Typing effect states
  const [typedFeedback, setTypedFeedback] = useState("");
  const [currentFeedbackIdx, setCurrentFeedbackIdx] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const filteredTestimonials = testimonials
    .filter((t) => (activeCategory === "All" ? true : t.category === activeCategory))
    .filter((t) => t.name.toLowerCase().includes(searchTerm.toLowerCase()) || t.feedback.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((t) => (ratingFilter > 0 ? t.rating === ratingFilter : true));

  const topTestimonials = [...testimonials].sort((a, b) => b.rating - a.rating).slice(0, 3);

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  // Typing effect
  useEffect(() => {
    if (filteredTestimonials.length === 0) return;
    const currentFeedback = filteredTestimonials[currentFeedbackIdx].feedback;
    if (charIndex < currentFeedback.length) {
      const timeout = setTimeout(() => {
        setTypedFeedback((prev) => prev + currentFeedback[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 30);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setTypedFeedback("");
        setCharIndex(0);
        setCurrentFeedbackIdx((prev) => (prev + 1) % filteredTestimonials.length);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, filteredTestimonials, currentFeedbackIdx]);

  const handleLike = (index) => {
    const updated = [...testimonials];
    updated[index].likes += 1;
    setTestimonials(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const newTestimonial = {
      name: form.name.value,
      designation: form.designation.value,
      company: form.company.value,
      image: "https://via.placeholder.com/100",
      rating: Number(form.rating.value),
      category: form.category.value,
      feedback: form.feedback.value,
      likes: 0,
    };
    setTestimonials([newTestimonial, ...testimonials]);
    setShowForm(false);
    form.reset();
  };

  return (
    <section className="py-20 bg-gradient-to-b from-indigo-800 to-purple-900 text-white px-4 relative">
      <h2 className="text-4xl font-bold text-center mb-8 z-10 relative">Testimonials</h2>

      {/* Categories Filter */}
      <div className="flex justify-center gap-4 mb-6 flex-wrap z-10 relative">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            className={`px-4 py-2 rounded-full border ${
              activeCategory === cat
                ? "bg-white text-purple-700 border-white"
                : "bg-transparent text-white border-white/50 hover:border-white"
            } transition`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search & Rating */}
      <div className="flex justify-center gap-4 mb-12 flex-wrap z-10 relative">
        <input
          type="text"
          placeholder="Search testimonials..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 rounded-full text-black focus:outline-none"
        />
        <select
          value={ratingFilter}
          onChange={(e) => setRatingFilter(Number(e.target.value))}
          className="px-4 py-2 rounded-full text-black focus:outline-none"
        >
          <option value={0}>All Ratings</option>
          <option value={5}>5 Stars</option>
          <option value={4}>4 Stars</option>
          <option value={3}>3 Stars</option>
        </select>
      </div>

      {/* Animated Typing */}
      <div className="max-w-3xl mx-auto text-center mb-12 text-lg italic relative z-10">
        <p>"{typedFeedback}"</p>
      </div>

      {/* Top 3 Highlight */}
      <div className="max-w-6xl mx-auto mb-12 grid md:grid-cols-3 gap-6 z-10 relative">
        {topTestimonials.map((t, idx) => (
          <div key={idx} className="bg-white/10 rounded-xl p-6 flex flex-col items-center text-center hover:shadow-2xl transition duration-500 relative">
            <FaQuoteLeft className="text-purple-400 text-4xl mb-2" />
            <p className="italic mb-4">{t.feedback}</p>
            <div className="flex gap-1 mb-4">
              {Array.from({ length: t.rating }).map((_, i) => (
                <FaStar key={i} className="text-yellow-400" />
              ))}
            </div>
            <img src={t.image} alt={t.name} className="w-16 h-16 rounded-full mb-2" />
            <h4 className="font-semibold">{t.name}</h4>
            <p className="text-sm">{t.designation} | {t.company}</p>
            <div className="flex gap-2 mt-2">
              <button onClick={() => handleLike(idx)} className="flex items-center gap-1 text-yellow-400 hover:text-yellow-300 transition">
                <FaThumbsUp /> {t.likes}
              </button>
            </div>
            <FaQuoteRight className="text-purple-400 text-4xl mt-2" />
          </div>
        ))}
      </div>

      {/* Carousel Slider */}
      <Slider {...settings} className="max-w-6xl mx-auto z-10 relative">
        {filteredTestimonials.map((t, idx) => (
          <div key={idx} className="p-4">
            <div className="bg-white/10 rounded-xl p-6 shadow-lg flex flex-col items-center text-center hover:shadow-2xl transition duration-500 relative">
              <FaQuoteLeft className="text-purple-400 text-4xl mb-2" />
              <p className="italic mb-4">{t.feedback}</p>
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>
              <img src={t.image} alt={t.name} className="w-16 h-16 rounded-full mb-2" />
              <h4 className="font-semibold">{t.name}</h4>
              <p className="text-sm">{t.designation} | {t.company}</p>
              <div className="flex gap-2 mt-2">
                <button onClick={() => handleLike(idx)} className="flex items-center gap-1 text-yellow-400 hover:text-yellow-300 transition">
                  <FaThumbsUp /> {t.likes}
                </button>
              </div>
              <FaQuoteRight className="text-purple-400 text-4xl mt-2" />
            </div>
          </div>
        ))}
      </Slider>

      {/* Scrolling Marquee */}
      <div className="mt-12 overflow-hidden relative z-10">
        <div className="flex animate-marquee gap-12">
          {testimonials.map((t, idx) => (
            <div key={idx} className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm">
              <img src={t.image} alt={t.name} className="w-8 h-8 rounded-full" />
              <span>"{t.feedback}" - {t.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 w-full max-w-lg text-black">
            <h3 className="text-2xl font-bold mb-4">Submit a Testimonial</h3>
            <input name="name" placeholder="Name" className="w-full mb-3 px-4 py-2 rounded border" required />
            <input name="designation" placeholder="Designation" className="w-full mb-3 px-4 py-2 rounded border" required />
            <input name="company" placeholder="Company" className="w-full mb-3 px-4 py-2 rounded border" required />
            <select name="category" className="w-full mb-3 px-4 py-2 rounded border" required>
              <option value="Mentor">Mentor</option>
              <option value="Client">Client</option>
              <option value="Teammate">Teammate</option>
              <option value="Professor">Professor</option>
            </select>
            <select name="rating" className="w-full mb-3 px-4 py-2 rounded border" required>
              <option value={5}>5 Stars</option>
              <option value={4}>4 Stars</option>
              <option value={3}>3 Stars</option>
            </select>
            <textarea name="feedback" placeholder="Your Feedback" className="w-full mb-3 px-4 py-2 rounded border" required />
            <div className="flex justify-end gap-4">
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800">Submit</button>
            </div>
          </form>
        </div>
      )}

      {/* Submit Testimonial Button */}
      <div className="text-center mt-12 z-10 relative">
        <button onClick={() => setShowForm(true)} className="px-6 py-3 bg-purple-700 rounded-lg hover:bg-purple-800 transition flex items-center gap-2 mx-auto">
          <FaPlus /> Submit a Testimonial
        </button>
      </div>

      {/* Marquee Animation */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          display: inline-flex;
          white-space: nowrap;
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </section>
  );
}
