import { useState } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaArrowUp,
} from "react-icons/fa";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return alert("Please enter your email.");
    setSubscribed(true);
    setEmail("");
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12 px-4 relative overflow-hidden">
      {/* Decorative Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-40 h-40 bg-purple-600 rounded-full blur-3xl animate-pulse absolute top-10 left-10"></div>
        <div className="w-60 h-60 bg-blue-600 rounded-full blur-3xl animate-ping absolute bottom-10 right-10"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
        {/* About / Copyright */}
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-xl hover:scale-105 transition-transform duration-300">
            Anoop Grover
          </h3>
          <p>© {currentYear} Anoop Grover. All rights reserved.</p>
        </div>

        {/* Quick Navigation Links */}
        <div className="flex flex-col gap-2">
          <h4 className="font-semibold mb-2">Quick Links</h4>
          {["home", "about", "projects", "services", "contact"].map((link) => (
            <a
              key={link}
              href={`#${link}`}
              className="hover:text-purple-400 transition hover:translate-x-1 duration-200"
            >
              {link.charAt(0).toUpperCase() + link.slice(1)}
            </a>
          ))}
        </div>

        {/* Social Media */}
        <div className="flex flex-col gap-2">
          <h4 className="font-semibold mb-2">Connect with Me</h4>
          <div className="flex gap-4 text-xl">
            <a
              href="https://github.com/anoop-grover"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition hover:scale-125 duration-300"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/anoop-grover"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition hover:scale-125 duration-300"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://twitter.com/anoop"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition hover:scale-125 duration-300"
            >
              <FaTwitter />
            </a>
            <a
              href="mailto:anoop@example.com"
              className="hover:text-purple-400 transition hover:scale-125 duration-300"
            >
              <FaEnvelope />
            </a>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="flex flex-col gap-2">
          <h4 className="font-semibold mb-2">Subscribe</h4>
          {subscribed ? (
            <p className="text-green-400 animate-bounce">
              Thank you for subscribing!
            </p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-2 rounded text-black"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-purple-700 rounded hover:bg-purple-800 transition"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Legal Links */}
      <div className="mt-8 border-t border-white/20 pt-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm relative z-10">
        <div className="flex gap-4">
          <a href="/privacy-policy" className="hover:text-purple-400 transition">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:text-purple-400 transition">
            Terms & Conditions
          </a>
          <a href="/disclaimer" className="hover:text-purple-400 transition">
            Disclaimer
          </a>
        </div>
        <div>
          Support:{" "}
          <a
            href="mailto:anoop@example.com"
            className="hover:text-purple-400 transition"
          >
            anoop@example.com
          </a>{" "}
          |{" "}
          <a
            href="tel:+911234567890"
            className="hover:text-purple-400 transition"
          >
            +91 1234567890
          </a>
        </div>
      </div>

      {/* Back-to-Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 bg-purple-700 text-white p-3 rounded-full hover:bg-purple-800 transition z-50 animate-bounce"
      >
        <FaArrowUp />
      </button>
    </footer>
  );
}
