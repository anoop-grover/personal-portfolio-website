// src/components/Testimonials.jsx
"use client";

import { useState, useEffect } from "react";

const initialTestimonials = [
  {
    id: 1,
    name: "John Doe",
    role: "Mentor @ XYZ",
    feedback: "Anoop is an outstanding learner with great problem-solving skills.",
    rating: 5,
    category: "Mentor",
    avatar: "/avatars/john.jpg",
    featured: true,
  },
  {
    id: 2,
    name: "Sarah Smith",
    role: "Client @ ABC Corp",
    feedback: "Delivered the project with perfection and on time!",
    rating: 5,
    category: "Client",
  },
  {
    id: 3,
    name: "Dr. Patel",
    role: "Professor @ LPU",
    feedback: "Anoop demonstrates excellent technical and leadership qualities.",
    rating: 4,
    category: "Professor",
  },
  {
    id: 4,
    name: "Alex Johnson",
    role: "Teammate @ Project X",
    feedback: "Always collaborative and brings great energy to the team.",
    rating: 5,
    category: "Teammate",
  },
];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    feedback: "",
    rating: 5,
    category: "Mentor",
    avatar: "/avatars/default.jpg",
  });

  // carousel index
  const [currentIndex, setCurrentIndex] = useState(0);

  // auto-slide every 5s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials, search, category]);

  const categories = ["All", "Mentor", "Client", "Teammate", "Professor"];

  const filteredTestimonials = testimonials.filter((t) => {
    const matchesCategory = category === "All" || t.category === category;
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.feedback.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTestimonial = {
      id: testimonials.length + 1,
      ...formData,
    };
    setTestimonials([newTestimonial, ...testimonials]);
    setFormData({
      name: "",
      role: "",
      feedback: "",
      rating: 5,
      category: "Mentor",
      avatar: "/avatars/default.jpg",
    });
    setShowForm(false);
  };

  return (
    <section className="py-16 px-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 relative">
      {/* Background Decorative */}
      <div className="absolute inset-0 bg-[url('/backgrounds/testimonials-bg.svg')] opacity-10 dark:opacity-20 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-gray-800 dark:text-gray-100">
          💬 Testimonials
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
          See what mentors, clients, professors, and teammates say about me
        </p>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <input
            type="text"
            placeholder="Search testimonials..."
            className="px-4 py-2 border rounded-lg w-full sm:w-1/2 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1 rounded-full text-sm font-medium border transition ${
                  category === cat
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Top 3 */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.filter((t) => t.featured).map((t) => (
            <div key={t.id} className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md relative">
              <span className="absolute -top-3 -left-3 text-4xl opacity-20">“</span>
              <p className="italic text-gray-800 dark:text-gray-100 mb-4">{t.feedback}</p>
              <div className="flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{t.name}</h4>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{t.role}</span>
                </div>
              </div>
              <div className="mt-2 flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} className="text-yellow-400">⭐</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Custom Carousel */}
        {filteredTestimonials.length > 0 && (
          <div className="relative max-w-4xl mx-auto">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg relative text-center">
              <span className="absolute -top-3 -left-3 text-4xl opacity-20">“</span>
              <p className="italic text-gray-800 dark:text-gray-100 mb-4">
                {filteredTestimonials[currentIndex].feedback}
              </p>
              <div className="flex items-center justify-center gap-3">
                <img
                  src={filteredTestimonials[currentIndex].avatar}
                  alt={filteredTestimonials[currentIndex].name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {filteredTestimonials[currentIndex].name}
                  </h4>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {filteredTestimonials[currentIndex].role}
                  </span>
                </div>
              </div>
              <div className="mt-2 flex justify-center gap-1">
                {Array.from({ length: filteredTestimonials[currentIndex].rating }).map((_, i) => (
                  <span key={i} className="text-yellow-400">⭐</span>
                ))}
              </div>
              {/* Like / Upvote */}
              <button className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline">👍 Like</button>
            </div>

            {/* Prev/Next Controls */}
            <button
              onClick={() =>
                setCurrentIndex((prev) =>
                  prev === 0 ? filteredTestimonials.length - 1 : prev - 1
                )
              }
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-700 text-white px-3 py-1 rounded-full"
            >
              ◀
            </button>
            <button
              onClick={() =>
                setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length)
              }
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-700 text-white px-3 py-1 rounded-full"
            >
              ▶
            </button>
          </div>
        )}

        {/* Marquee / Ticker Strip */}
        <div className="mt-8 overflow-hidden relative">
          <div className="whitespace-nowrap animate-marquee flex gap-8">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="inline-block bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-md text-gray-800 dark:text-gray-100 font-medium"
              >
                {t.name}: “{t.feedback.length > 50 ? t.feedback.slice(0, 50) + "..." : t.feedback}”
              </div>
            ))}
          </div>
        </div>

        {/* Submit Testimonial Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            📝 Submit a Testimonial
          </button>
        </div>
      </div>

      {/* Popup Form */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Submit Testimonial</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-gray-200"
                required
              />
              <input
                type="text"
                placeholder="Your Role (e.g., Client @ ABC)"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-gray-200"
                required
              />
              <textarea
                placeholder="Your Feedback"
                value={formData.feedback}
                onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-gray-200"
                required
              />
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-gray-200"
              >
                {categories.filter(c => c !== "All").map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <div className="flex justify-between items-center">
                <label className="text-gray-700 dark:text-gray-300">Rating:</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                  className="w-16 px-2 py-1 border rounded dark:bg-gray-700 dark:text-gray-200"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Marquee Animation */}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
          .animate-marquee {
            display: inline-flex;
            animation: marquee 20s linear infinite;
          }
        `}
      </style>
    </section>
  );
}
