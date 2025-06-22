import { useEffect, useRef, useState } from "react";
import { FaLinkedin, FaGithub, FaEnvelope, FaSun, FaMoon, FaBars } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Portfolio() {
    const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
    const [activeSection, setActiveSection] = useState("about");
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const sectionRefs = useRef({});

    useEffect(() => {
        document.title = "Santhosh Kumar K | SDET Portfolio";
        document.documentElement.classList.add(theme);

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                if (visible.length > 0) {
                    setActiveSection(visible[0].target.id);
                }
            },
            {
                rootMargin: "0px 0px -50% 0px", // improved accuracy
                threshold: 0.4,
            }
        );

        ["about", "skills", "projects", "experience", "contact"].forEach((id) => {
            const el = document.getElementById(id);
            if (el && !sectionRefs.current[id]) {
                observer.observe(el);
                sectionRefs.current[id] = true;
            }
        });

        return () => observer.disconnect();
    }, [theme]);

    useEffect(() => {
        const handleScroll = () => {
            const total = document.documentElement.scrollHeight - window.innerHeight;
            const current = window.scrollY;
            setScrollProgress((current / total) * 100);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    const scrollToSection = (id) => {
        setMenuOpen(false);
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <div
                className="fixed top-0 left-0 h-1 bg-indigo-400 z-50 transition-all duration-300"
                style={{ width: `${scrollProgress}%` }}
            />
            <main className="relative bg-gradient-to-br from-slate-900 via-zinc-900 to-slate-950 text-white min-h-screen font-sans px-4 sm:px-8 md:px-16 transition-colors duration-500">
                {/* Navbar */}
                <nav className="fixed top-0 left-0 right-0 bg-zinc-900/80 backdrop-blur-sm border-b border-white/10 z-50 py-3 px-6 flex justify-between items-center shadow-sm">
                    <h1 className="text-lg font-bold text-indigo-400">Santhosh</h1>
                    <ul className="hidden sm:flex gap-6 text-sm font-medium text-white">
                        {["about", "skills", "projects", "experience", "contact"].map((id) => (
                            <li
                                key={id}
                                className={`cursor-pointer hover:text-indigo-300 ${
                                    activeSection === id ? "text-indigo-400" : "text-white"
                                }`}
                                onClick={() => scrollToSection(id)}
                            >
                                {id.charAt(0).toUpperCase() + id.slice(1)}
                            </li>
                        ))}
                    </ul>
                    <div className="flex items-center gap-4">
                        <button onClick={toggleTheme} className="p-2 rounded-full bg-zinc-700 text-white hover:bg-zinc-600 shadow-md" aria-label="Toggle Theme">
                            {theme === "dark" ? <FaSun /> : <FaMoon />}
                        </button>
                        <button className="sm:hidden text-white" onClick={() => setMenuOpen(!isMenuOpen)}>
                            <FaBars size={20} />
                        </button>
                    </div>
                    {isMenuOpen && (
                        <div className="absolute top-14 right-4 bg-zinc-800 text-white p-4 rounded-xl shadow-md sm:hidden">
                            {["about", "skills", "projects", "experience", "contact"].map((id) => (
                                <div
                                    key={id}
                                    onClick={() => scrollToSection(id)}
                                    className="py-1 cursor-pointer hover:text-indigo-300"
                                >
                                    {id.charAt(0).toUpperCase() + id.slice(1)}
                                </div>
                            ))}
                        </div>
                    )}
                </nav>

                {/* About section with updated email */}
                <section id="about" className="pt-32 pb-24 text-center scroll-mt-20">
                    <img
                        src="/profile.png"
                        alt="Santhosh Kumar"
                        className="w-24 h-24 mx-auto mb-6 rounded-full border-4 border-indigo-400 shadow-md hover:scale-105 transition"
                    />
                    <motion.h1
                        className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent animate-pulse"
                        initial={{ y: -30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        Santhosh Kumar K
                    </motion.h1>
                    <p className="mt-4 text-base sm:text-lg text-gray-400">SDET | QA Automation Engineer</p>
                    <motion.div className="mt-6 flex justify-center gap-6 text-2xl text-white" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }}>
                        <a href="https://www.linkedin.com/in/santhoshkumark18/" target="_blank" rel="noreferrer" className="hover:text-indigo-300">
                            <FaLinkedin />
                        </a>
                        <a href="https://github.com/santhoshkumark18" target="_blank" rel="noreferrer" className="hover:text-indigo-300">
                            <FaGithub />
                        </a>
                        <a
                            href="https://mail.google.com/mail/?view=cm&fs=1&to=santhoshkumark1801@gmail.com"
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-indigo-300"
                            aria-label="Email"
                        >
                            <FaEnvelope />
                        </a>
                    </motion.div>
                </section>

                {/* Skills Section */}
                <section id="skills" className="py-16 max-w-5xl mx-auto">
                    <h2 className="text-4xl font-bold text-center text-indigo-300 mb-8">Skills</h2>
                    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 text-center">
                        {["Java", "Selenium", "TestNG", "Cucumber", "UiPath", "Azure DevOps", "Git", "MySQL", "Postman", "Playwright"].map((skill, index) => (
                            <motion.li
                                key={skill}
                                className="bg-white/10 backdrop-blur-md py-4 rounded-xl shadow-md hover:bg-white/20 transition border border-white/20"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                {skill}
                            </motion.li>
                        ))}
                    </ul>
                </section>

                {/* Projects Section */}
                <section id="projects" className="py-16 max-w-5xl mx-auto">
                    <h2 className="text-4xl font-bold text-center text-indigo-300 mb-8">Projects</h2>
                    <div className="space-y-8">
                        <motion.div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-md hover:shadow-xl transition hover:bg-gradient-to-br hover:from-indigo-500/10 hover:to-purple-500/10" whileHover={{ scale: 1.02 }}>
                            <h3 className="text-xl font-semibold mb-2 text-white">Selenium + GenAI Analyzer</h3>
                            <p className="text-gray-400 mb-2">Java utility to analyze Selenium test failures using GenAI APIs. Provides contextual root cause analysis and fix suggestions.</p>
                            <a href="https://github.com/santhoshkumark18/ErrorSage-Ai" target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline">View Project</a>
                        </motion.div>
                        <motion.div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-md hover:shadow-xl transition hover:bg-gradient-to-br hover:from-indigo-500/10 hover:to-purple-500/10" whileHover={{ scale: 1.02 }}>
                            <h3 className="text-xl font-semibold mb-2 text-white">Self-Healing Automation</h3>
                            <p className="text-gray-400 mb-2">Enhanced Selenium automation by integrating Healenium for DOM recovery, reducing maintenance.</p>
                            <a href="https://github.com/santhoshkumark18" target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline">View Project</a>
                        </motion.div>
                    </div>
                </section>

                {/* Experience Section */}
                <section id="experience" className="py-16 max-w-5xl mx-auto">
                    <h2 className="text-4xl font-bold text-center text-indigo-300 mb-8">Experience</h2>
                    <motion.div className="border-l-4 border-indigo-400 pl-6 ml-2 mb-10">
                        <h3 className="text-xl font-bold text-white">Programmer Analyst – Quality Engineering</h3>
                        <p className="text-gray-300">Cognizant Technology Solutions</p>
                        <p className="text-gray-500 mb-2">Feb 2023 – Present</p>
                        <p className="text-gray-400 text-sm leading-relaxed">Automated 90% of test cases in a Qlik-based logistics platform. Built GenAI-powered log analyzer and UiPath bots to reduce manual QA.</p>
                    </motion.div>
                    <motion.div className="border-l-4 border-indigo-400 pl-6 ml-2 mb-10">
                        <h3 className="text-xl font-bold text-white">Java Full Stack Developer Intern</h3>
                        <p className="text-gray-300">Integrin Enterprise Solutions</p>
                        <p className="text-gray-500 mb-2">Nov 2022 – Feb 2023</p>
                        <p className="text-gray-400 text-sm leading-relaxed">Built features using Moqui framework and Adobe Sign APIs for automation. Contributed to frontend and backend modules in agile teams.</p>
                    </motion.div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="py-20 text-center bg-zinc-950 rounded-t-3xl shadow-inner">
                    <h2 className="text-4xl font-bold text-indigo-300 mb-4">Let's Connect</h2>
                    <p className="text-gray-400">santhoshkumark1801@gmail.com</p>
                    <div className="mt-6">
                        <a
                            href="/Santhosh_Kumar_K_Resume_SDET_2_Years.pdf"
                            download
                            className="inline-block px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition"
                        >
                            Download Resume
                        </a>
                    </div>
                </section>

                {/* Footer */}
                <footer className="text-center text-gray-500 text-sm py-4">
                    © 2025 Santhosh Kumar K. All rights reserved.
                </footer>

            </main>
        </>
    );
}
