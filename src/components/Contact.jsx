import { useState, useEffect } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaArrowUp } from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [success, setSuccess] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill all required fields.");
      return;
    }
    // Open default mail client for demo
    window.location.href = `mailto:anoop@example.com?subject=${encodeURIComponent(formData.subject || "New Contact Message")}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
    setSuccess(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const downloadVCard = () => {
    const vCardData = `
BEGIN:VCARD
VERSION:3.0
FN:Anoop Grover
ORG:Personal Portfolio
TEL;TYPE=WORK,VOICE:+911234567890
EMAIL:anoop@example.com
ADR;TYPE=WORK:;;Punjab, India
END:VCARD
    `;
    const blob = new Blob([vCardData], { type: "text/vcard" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Anoop_Grover.vcf";
    link.click();
  };

  return (
    <section className={`${darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-b from-indigo-900 to-purple-800 text-white"} py-20 px-4 relative transition-colors duration-500`}>
      <div className="flex justify-between max-w-6xl mx-auto items-center mb-8">
        <h2 className="text-4xl font-bold">Contact Me</h2>
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Contact Info Cards */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4 bg-white/10 p-6 rounded-xl hover:shadow-lg transition">
            <FaEnvelope className="text-purple-400 text-2xl" />
            <div>
              <p className="font-semibold">Email</p>
              <p>anoop@example.com</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white/10 p-6 rounded-xl hover:shadow-lg transition">
            <FaPhone className="text-purple-400 text-2xl" />
            <div>
              <p className="font-semibold">Phone</p>
              <p>+91 1234567890</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white/10 p-6 rounded-xl hover:shadow-lg transition">
            <FaMapMarkerAlt className="text-purple-400 text-2xl" />
            <div>
              <p className="font-semibold">Location</p>
              <p>Punjab, India</p>
            </div>
          </div>

          {/* Quick Links & Buttons */}
          <div className="flex gap-4 flex-wrap">
            <a href="https://www.topmate.io/your-profile" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-purple-700 rounded-lg hover:bg-purple-800 transition">
              Schedule a Meeting
            </a>
            <button onClick={downloadVCard} className="px-4 py-2 bg-purple-700 rounded-lg hover:bg-purple-800 transition">
              Download vCard
            </button>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white/10 p-6 rounded-xl shadow-lg">
          {success && (
            <div className="bg-green-500 text-white p-4 rounded mb-4">
              Thank you! Your message has been sent.
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" className="px-4 py-2 rounded border text-black" required />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" className="px-4 py-2 rounded border text-black" required />
            <input name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject" className="px-4 py-2 rounded border text-black" />
            <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your Message" className="px-4 py-2 rounded border text-black" rows="5" required />
            
            {/* Placeholder for Captcha */}
            <div className="bg-white/20 p-2 rounded text-black text-center mb-2">[Captcha Placeholder]</div>

            <button type="submit" className="px-6 py-3 bg-purple-700 rounded-lg hover:bg-purple-800 transition flex items-center gap-2 justify-center">
              <FaPaperPlane /> Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Map Integration */}
      <div className="mt-12 max-w-6xl mx-auto rounded-lg overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3491.232894153932!2d75.6740!3d30.9000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a989f6f0234ab%3A0x123456789abcdef!2sLovely%20Professional%20University!5e0!3m2!1sen!2sin!4v1693123456789!5m2!1sen!2sin"
          width="100%" height="350" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
          title="Location Map"
        ></iframe>
      </div>

      {/* Scroll to Top */}
      {scrollY > 300 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 bg-purple-700 text-white p-3 rounded-full hover:bg-purple-800 transition z-50"
        >
          <FaArrowUp />
        </button>
      )}
    </section>
  );
}
