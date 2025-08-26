import { useState } from "react";
import { FaDownload, FaStar } from "react-icons/fa";
import ReactTooltip from "react-tooltip";

export default function Certifications() {
  const certifications = [
    {
      title: "Python for Data Science",
      issuer: "Coursera",
      img: "https://via.placeholder.com/400x250",
      link: "/certificates/python-ds.pdf",
      tags: ["Python", "Data Science"],
      date: "2025-01-15",
      hours: 40,
      location: "USA",
      testimonials: [
        { name: "John Doe", feedback: "Excellent course!" },
      ],
      badge: "Advanced Python",
    },
    {
      title: "SQL Developer Certification",
      issuer: "Oracle",
      img: "https://via.placeholder.com/400x250",
      link: "/certificates/sql-dev.pdf",
      tags: ["SQL", "Database"],
      date: "2025-02-10",
      hours: 35,
      location: "India",
      testimonials: [
        { name: "Jane Smith", feedback: "Highly recommend this certification." },
      ],
      badge: "Database Expert",
    },
    {
      title: "React Developer Bootcamp",
      issuer: "Udemy",
      img: "https://via.placeholder.com/400x250",
      link: "/certificates/react-bootcamp.pdf",
      tags: ["React", "Web Development"],
      date: "2025-03-20",
      hours: 50,
      location: "Germany",
      testimonials: [
        { name: "Alice Lee", feedback: "Great learning experience." },
      ],
      badge: "Frontend Pro",
    },
  ];

  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section className="py-20 bg-gradient-to-b from-indigo-600 to-purple-600 text-white px-4">
      <h2 className="text-4xl font-bold text-center mb-8">Certifications</h2>

      {/* Certifications Grid */}
      <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert, idx) => (
          <div
            key={idx}
            className="bg-white/10 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer relative"
          >
            <img
              src={cert.img}
              alt={cert.title}
              className="w-full h-48 object-cover group-hover:scale-105 transform transition duration-300"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{cert.title}</h3>
              <p className="text-sm">{cert.issuer}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {cert.tags.map((tag, i) => (
                  <span key={i} className="bg-white/20 px-3 py-1 rounded-full text-xs">
                    {tag}
                  </span>
                ))}
              </div>
              <button
                className="mt-4 px-4 py-2 bg-purple-700 rounded-lg hover:bg-purple-800 transition flex items-center gap-2"
                onClick={() => setSelectedCert(cert)}
              >
                <FaStar /> View Details
              </button>
              <a
                href={cert.link}
                download
                className="mt-2 inline-block px-4 py-2 bg-purple-700 rounded-lg hover:bg-purple-800 transition flex items-center gap-2"
              >
                <FaDownload /> Download
              </a>
              <div className="absolute top-4 right-4 bg-yellow-400 text-black px-2 py-1 rounded" data-tip={cert.badge}>
                {cert.badge}
                <ReactTooltip place="top" type="dark" effect="solid" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Certificate Modal */}
      {selectedCert && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-3xl w-full p-6 relative text-black">
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 text-black text-2xl hover:text-purple-700 transition"
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold mb-4">{selectedCert.title}</h3>
            <p className="mb-2">Issuer: {selectedCert.issuer}</p>
            <p className="mb-4">Date: {new Date(selectedCert.date).toLocaleDateString()}</p>

            {/* Testimonials */}
            {selectedCert.testimonials && (
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Testimonials / Endorsements:</h4>
                <ul className="list-disc list-inside">
                  {selectedCert.testimonials.map((t, i) => (
                    <li key={i} className="italic">
                      "{t.feedback}" - {t.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Download Button */}
            <a
              href={selectedCert.link}
              download
              className="mt-4 inline-block px-4 py-2 bg-purple-700 rounded-lg hover:bg-purple-800 transition text-white"
            >
              Download Certificate
            </a>
          </div>
        </div>
      )}

      {/* Interactive World Map (Simple SVG-based placeholder) */}
      <div className="mt-16 max-w-6xl mx-auto">
        <h4 className="text-2xl font-semibold mb-4 text-center">Issuers Global Locations</h4>
        <div className="bg-white/10 rounded-xl p-8 flex justify-center items-center h-64">
          <p className="text-center text-white/80">[Interactive World Map placeholder]</p>
        </div>
      </div>
    </section>
  );
}
