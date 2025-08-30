import { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function Navbar({ darkMode, setDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    "home",
    "about",
    "projects",
    "services",
    "certifications",
    "testimonials",
    "contact",
  ];

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md z-50 transition-colors duration-500">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <div
          className="font-extrabold text-2xl cursor-pointer text-purple-600 dark:text-purple-400"
          onClick={() => handleScroll("home")}
        >
          Anoop Grover
        </div>

        {/* Links for Desktop */}
        <div className="hidden md:flex gap-6 items-center">
          {links.map((link, idx) => (
            <button
              key={idx}
              onClick={() => handleScroll(link)}
              className="relative capitalize text-gray-700 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 transition"
            >
              {link}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-purple-500 dark:bg-purple-400 transition-all group-hover:w-full"></span>
            </button>
          ))}

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="ml-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="px-3 py-2 border rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 flex flex-col gap-4 px-4 py-4 border-t border-gray-200 dark:border-gray-700">
          {links.map((link, idx) => (
            <button
              key={idx}
              onClick={() => handleScroll(link)}
              className="capitalize text-gray-700 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 transition text-left"
            >
              {link}
            </button>
          ))}

          {/* Dark Mode Toggle Mobile */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="mt-2 flex items-center gap-2 p-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon />}
            <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
          </button>
        </div>
      )}
    </nav>
  );
}
