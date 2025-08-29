// src/components/Certifications.jsx
import { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const certificationsData = [
  {
    id: 1,
    title: "Python for Everybody",
    issuer: "Coursera",
    date: "Jan 2024",
    link: "https://coursera.org/verify/xxxx",
    tags: ["Python", "Programming", "Basics"],
  },
  {
    id: 2,
    title: "SQL (Intermediate)",
    issuer: "HackerRank",
    date: "Mar 2024",
    link: "https://hackerrank.com/cert/xxxx",
    tags: ["SQL", "Database", "Queries"],
  },
  {
    id: 3,
    title: "Web Development Bootcamp",
    issuer: "Udemy",
    date: "Jul 2024",
    link: "https://udemy.com/certificate/xxxx",
    tags: ["HTML", "CSS", "JavaScript"],
  },
];

// Simple Counter Component
function Counter({ from, to, duration }) {
  const controls = useAnimation();
  const [count, setCount] = useState(from);

  useEffect(() => {
    controls.start({
      val: to,
      transition: { duration: duration, ease: "easeOut" },
    });
  }, [to]);

  return (
    <motion.span
      animate={controls}
      initial={{ val: from }}
      variants={{
        val: (val) => ({
          transitionEnd: { textContent: Math.floor(val) },
        }),
      }}
    >
      {count}
    </motion.span>
  );
}

export default function Certifications() {
  const [view, setView] = useState("grid");
  const sectionRef = useRef(null);

  // 📄 Download Single Certificate
  const downloadCertificate = async (id) => {
    const element = document.getElementById(`cert-${id}`);
    if (!element) return;

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`certificate-${id}.pdf`);
  };

  // 📄 Download ALL Certificates
  const downloadAllCertificates = async () => {
    const pdf = new jsPDF("p", "mm", "a4");

    for (let i = 0; i < certificationsData.length; i++) {
      const element = document.getElementById(`cert-${certificationsData[i].id}`);
      if (!element) continue;

      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL("image/png");

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      if (i !== 0) pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    }

    pdf.save("all-certificates.pdf");
  };

  // 🖨️ Print Single Certificate
  const printCertificate = (id) => {
    const element = document.getElementById(`cert-${id}`);
    if (!element) return;

    const newWindow = window.open("", "_blank");
    newWindow.document.write(`<html><head><title>Print Certificate</title></head><body>`);
    newWindow.document.write(element.outerHTML);
    newWindow.document.write("</body></html>");
    newWindow.document.close();
    newWindow.print();
  };

  return (
    <section id="certifications" ref={sectionRef} className="py-16 px-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          📜 Certifications
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          A showcase of my achievements and continuous learning journey.
        </p>

        {/* 📊 Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-md">
            <h3 className="text-3xl font-bold text-blue-600">
              <Counter from={0} to={certificationsData.length} duration={2} />+
            </h3>
            <p className="text-gray-600 dark:text-gray-300">Total Certifications</p>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-md">
            <h3 className="text-3xl font-bold text-green-600">
              <Counter from={0} to={120} duration={3} />+
            </h3>
            <p className="text-gray-600 dark:text-gray-300">Hours Studied</p>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-md">
            <h3 className="text-3xl font-bold text-purple-600">
              <Counter from={0} to={15} duration={3} />+
            </h3>
            <p className="text-gray-600 dark:text-gray-300">Achievements</p>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex justify-center mb-6 space-x-2">
          <button
            onClick={() => setView("grid")}
            className={`px-4 py-2 rounded-lg border ${
              view === "grid" ? "bg-blue-600 text-white" : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            }`}
          >
            Grid
          </button>
          <button
            onClick={() => setView("list")}
            className={`px-4 py-2 rounded-lg border ${
              view === "list" ? "bg-blue-600 text-white" : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            }`}
          >
            List
          </button>
          <button
            onClick={() => setView("timeline")}
            className={`px-4 py-2 rounded-lg border ${
              view === "timeline" ? "bg-blue-600 text-white" : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            }`}
          >
            Timeline
          </button>
        </div>

        {/* Download All */}
        <button
          onClick={downloadAllCertificates}
          className="mb-6 px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
        >
          📂 Download All Certificates
        </button>

        {/* Certifications Display */}
        {view === "grid" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificationsData.map((cert) => (
              <CertificateCard key={cert.id} cert={cert} downloadCertificate={downloadCertificate} printCertificate={printCertificate} />
            ))}
          </div>
        )}

        {view === "list" && (
          <div className="space-y-4">
            {certificationsData.map((cert) => (
              <CertificateCard key={cert.id} cert={cert} downloadCertificate={downloadCertificate} printCertificate={printCertificate} />
            ))}
          </div>
        )}

        {/* Timeline View */}
        {view === "timeline" && (
          <div className="relative border-l-2 border-blue-500 dark:border-blue-400 pl-6 space-y-8 text-left">
            {certificationsData.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md relative"
              >
                {/* Timeline Dot */}
                <span className="absolute -left-[34px] top-6 w-6 h-6 rounded-full bg-blue-600 dark:bg-blue-400 border-4 border-white dark:border-gray-900"></span>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{cert.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{cert.issuer} • {cert.date}</p>

                {/* Tags */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {cert.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => downloadCertificate(cert.id)}
                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    ⬇️ Download
                  </button>
                  <button
                    onClick={() => printCertificate(cert.id)}
                    className="px-3 py-1 text-sm bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                  >
                    🖨️ Print
                  </button>
                </div>

                {/* Verify Link */}
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                >
                  🔗 Verify Certificate
                </a>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// Reusable Card
function CertificateCard({ cert, downloadCertificate, printCertificate }) {
  return (
    <motion.div
      id={`cert-${cert.id}`}
      whileHover={{ scale: 1.05 }}
      className="p-6 rounded-2xl shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-left"
    >
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{cert.title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">{cert.issuer} • {cert.date}</p>

      {/* Tags */}
      <div className="mt-3 flex flex-wrap gap-2">
        {cert.tags.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 text-xs bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Buttons */}
      <div className="mt-4 flex gap-3">
        <button
          onClick={() => downloadCertificate(cert.id)}
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          ⬇️ Download
        </button>
        <button
          onClick={() => printCertificate(cert.id)}
          className="px-3 py-1 text-sm bg-gray-600 text-white rounded-lg hover:bg-gray-700"
        >
          🖨️ Print
        </button>
      </div>

      {/* Verify Button */}
      <a
        href={cert.link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
      >
        🔗 Verify Certificate
      </a>
    </motion.div>
  );
}
