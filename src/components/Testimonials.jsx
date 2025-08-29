// src/components/Testimonials.jsx
"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const testimonialsData = [
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
  // Add more testimonials here
];

export default function Testimonials() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", "Mentor", "Client", "Teammate", "Professor"];

  const filteredTestimonials = testimonialsData.filter((t) => {
    const matchesCategory = category === "All" || t.category === category;
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.feedback.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
          {testimonialsData.filter((t) => t.featured).map((t) => (
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

        {/* Swiper Carousel for filtered testimonials */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          className="max-w-4xl mx-auto"
        >
          {filteredTestimonials.map((t) => (
            <SwiperSlide key={t.id}>
              <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg relative">
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
                {/* Like / Upvote */}
                <button className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline">👍 Like</button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Marquee / Ticker Strip */}
        <div className="mt-8 overflow-hidden relative">
          <div className="whitespace-nowrap animate-marquee flex gap-8">
            {testimonialsData.map((t) => (
              <div
                key={t.id}
                className="inline-block bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-md text-gray-800 dark:text-gray-100 font-medium"
              >
                {t.name}: “{t.feedback.length > 50 ? t.feedback.slice(0, 50) + "..." : t.feedback}”
              </div>
            ))}
          </div>
        </div>

        {/* Submit Testimonial */}
        <div className="mt-8 text-center">
          <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            📝 Submit a Testimonial
          </button>
        </div>
      </div>

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
