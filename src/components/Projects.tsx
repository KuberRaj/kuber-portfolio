import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlobeIcon } from "@phosphor-icons/react";

const projectsData = [
  {
    id: 1,
    title: "Agentic Data Quality Platform",
    shortDesc: "Multi-agent system for automated data validation.",
    fullDesc:
      "Designed and developed a multi-agent AI platform using Google ADK and BigQuery to automate data quality checks across large-scale pipelines. Implemented intelligent validation agents that significantly reduced manual intervention and improved overall data reliability.",
    impact: "↑ 40% pipeline reliability | ↓ manual effort",
    tags: ["Google ADK", "BigQuery", "FastAPI", "React", "GCP"],
    color: "from-cyan-500/20 to-blue-500/20",
    image: "/Learning_AI_Agent_Architectures.png",
  },
  {
    id: 2,
    title: "Multi-Agent Workflow Orchestrator",
    shortDesc: "Scalable orchestration system for enterprise workflows.",
    fullDesc:
      "Built a scalable orchestration platform leveraging MCP and Vertex AI to coordinate multiple AI agents for workflow automation. Designed modular agent pipelines to improve system adaptability and enable efficient execution of complex, multi-step processes.",
    impact: "↑ 30% efficiency | scalable multi-agent architecture",
    tags: ["MCP", "Vertex AI", "Python", "Cloud Run", "GCP"],
    color: "from-purple-500/20 to-indigo-500/20",
    image: "/Learning_AI_Agent_Architectures.png",
  },
  {
    id: 3,
    title: "GenAI Conversion Platform",
    shortDesc: "LLM-powered mainframe-to-cloud conversion system.",
    fullDesc:
      "Engineered a high-availability GenAI platform focused on mainframe-to-cloud conversion workflows. Optimized LLM pipelines and system architecture to enhance conversion accuracy while maintaining high reliability in enterprise environments.",
    impact: "↑ 35% accuracy | ↑ 30% uptime",
    tags: ["LLMs", "Prompt Engineering", "Python", "React", "System Design"],
    color: "from-blue-500/20 to-cyan-500/20",
    image: "/Learning_AI_Agent_Architectures.png",
  },
  {
    id: 4,
    title: "Cloud Data Migration PoC",
    shortDesc: "Automated on-prem to cloud migration pipeline.",
    fullDesc:
      "Developed an end-to-end data migration proof-of-concept using AWS S3, Lambda, and Airflow. Designed automated ingestion and orchestration workflows ensuring data integrity and minimizing manual migration effort.",
    impact: "Automated migration | ensured data integrity",
    tags: ["AWS S3", "Lambda", "Airflow", "PostgreSQL"],
    color: "from-orange-500/20 to-yellow-500/20",
    image: "/Learning_AI_Agent_Architectures.png",
  },
];

export default function Projects() {
  const [activeProject, setActiveProject] = useState(projectsData[0]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(projectsData[0]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <section id="projects" className="py-24 px-[7.5%] mx-auto">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-5xl font-bold text-white/70 mb-2">
            Build Registry
          </h2>
          {/* <p className="text-white/50">
            Click a project to feature it on the main stage.
          </p> */}
        </div>

        <button
          onClick={() => {
            setSelectedProject(projectsData[0]);
            setShowModal(true);
          }}
          className="text-cyan-400 text-sm font-bold hover:underline"
        >
          VIEW ALL PROJECTS
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* --- THE STAGE (2/3) --- */}
        <div className="lg:w-2/3 h-[575px] relative group overflow-hidden rounded-[3rem] border border-white/10 bg-slate-900 shadow-2xl m-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              {/* Hover Content (Details) */}
              <div className="absolute inset-0 flex flex-col justify-center items-center p-12 text-center transition-opacity duration-500">
                <h3 className="text-5xl font-bold text-white mb-4 leading-tight">
                  {activeProject.title}
                </h3>
                <div className="flex gap-2">
                  {activeProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="
                        px-4 py-1 mb-4
                        rounded-full
                        text-[14px] text-green-300
                        bg-gradient-to-br from-white/20 to-white/5
                        backdrop-blur-xl
                        border border-white/20
                        shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_4px_12px_rgba(0,0,0,0.2)]
                      "
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-xl text-white/70 max-w-lg mb-8 leading-relaxed">
                  {activeProject.fullDesc}
                </p>
                <p className="text-sm text-cyan-300 font-medium mb-6">
                  {activeProject.impact}
                </p>
                <p
                  className="text-[11px] font-medium tracking-wider text-cyan-300
                bg-slate-950/90 backdrop-blur-lg px-4 rounded-full 
                border-2 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.4)]
                animate-pulse transition-all duration-500
                flex items-center gap-1.5 mb-4"
                >
                  Details limited due to confidentiality
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      console.log("Clicked ✅");
                      setSelectedProject(activeProject);
                      setShowModal(true);
                    }}
                    className="p-4 rounded-full bg-white text-black z-10 cursor-pointer relative hover:scale-110 transition-transform"
                  >
                    <GlobeIcon size={24} weight="bold" />
                  </button>
                  {/* <button className="p-4 rounded-full bg-white/10 text-white backdrop-blur-xl border border-white/10 hover:scale-110 transition-transform">
                    <GithubLogo size={24} weight="bold" />
                  </button> */}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* --- UPDATED GALLERY SIDEBAR --- */}
        <div className="lg:w-1/3 flex flex-col gap-4 overflow-y-auto h-[600px] pr-4 custom-scrollbar">
          {projectsData.map((project) => (
            <motion.div
              key={project.id}
              onClick={() => setActiveProject(project)}
              // Simple lift effect on hover
              whileHover={{ y: -5 }}
              className={`relative cursor-pointer pl-8 pr-8 rounded-[2rem] border transition-all duration-500 group overflow-hidden min-h-[160px] flex flex-col justify-center
        ${
          activeProject.id === project.id
            ? "bg-cyan-500/10 border-cyan-500/40 shadow-[0_0_30px_rgba(6,182,212,0.15)]"
            : "bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/[0.07]"
        }`}
            >
              {/* Project Title - Stays visible */}
              <h4
                className={`text-xl font-bold mb-4 transition-colors duration-300 ${
                  activeProject.id === project.id
                    ? "text-cyan-400"
                    : "text-white group-hover:text-cyan-400"
                }`}
              >
                {project.title}
              </h4>

              {/* Container for the Swap Effect */}
              <div className="relative h-12">
                {/* DEFAULT VIEW: Skills (Fades out on hover) */}
                <div className="absolute inset-0 flex flex-wrap gap-3 group-hover:opacity-0 group-hover:-translate-y-2 transition-all duration-500 ease-in-out">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] uppercase font-black text-sky-400 tracking-[0.15em] border-b border-white/10 pb-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* HOVER VIEW: Short Description (Fades in on hover) */}
                <div className="absolute inset-0 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-in-out">
                  <p className="text-sm text-white/60 leading-relaxed font-medium italic line-clamp-2">
                    {project.shortDesc}
                  </p>
                </div>
              </div>

              {/* Active Indicator Dot */}
              {activeProject.id === project.id && (
                <motion.div
                  layoutId="activeDot"
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
        >
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-xl"
            onClick={() => setShowModal(false)}
          />

          {/* Main Glass Modal Window */}
          {/* Main Glass Modal Window - Fullscreen on Mobile, Floating on Desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative w-full h-full md:h-full max-w-7xl flex flex-col md:flex-row rounded-none md:rounded-2xl overflow-hidden
             bg-slate-900/40 border-0 md:border border-cyan-500/20 backdrop-blur-2xl
             shadow-[0_0_50px_-12px_rgba(34,211,238,0.15)]"
          >
            {/* LEFT: Project List Sidebar - Collapsible Dropdown Accordion on Mobile */}
            <div className="w-full md:w-1/4 md:min-w-[240px] border-b md:border-b-0 md:border-r border-cyan-500/10 bg-slate-950/40 md:bg-slate-950/30 p-4 md:p-6">
              {/* Mobile Toggle Button (Visible ONLY on Mobile) */}
              <div className="flex md:hidden justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-widest text-cyan-400/60">
                  Projects
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs font-medium"
                >
                  {selectedProject ? selectedProject.title : "Select Project"}
                  <svg
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${isMobileMenuOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>

              {/* Project List Wrapper - Hidden on Mobile unless Toggled Open */}
              <div
                className={`${isMobileMenuOpen ? "block mt-4 max-h-[40vh]" : "hidden"} md:block overflow-y-auto space-y-2`}
              >
                <h3 className="hidden md:block text-xs font-bold uppercase tracking-widest text-cyan-400/60 mb-6 px-2">
                  Projects
                </h3>
                {projectsData.map((p) => {
                  const isSelected = selectedProject?.id === p.id;
                  return (
                    <div
                      key={p.id}
                      onClick={() => {
                        setSelectedProject(p);
                        setIsMobileMenuOpen(false); // Auto-close drawer on selection
                      }}
                      className="relative cursor-pointer p-4 rounded-xl transition-all duration-300 group"
                    >
                      {isSelected && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute inset-0 bg-gradient-to-r from-cyan-500/15 to-blue-500/5 
                           border border-cyan-400/30 rounded-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}

                      <p
                        className={`relative z-10 text-sm font-medium transition-colors duration-300
              ${isSelected ? "text-cyan-300" : "text-slate-400 group-hover:text-slate-200"}`}
                      >
                        {p.title}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT: Case Study Content View - Takes up remaining screen area */}
            <div className="flex-1 p-6 md:p-12 overflow-y-auto text-white bg-gradient-to-br from-slate-900/10 via-transparent to-cyan-950/10 flex flex-col justify-between">
              {/* [Keep your remaining internal details, closing buttons, tags, and footer exactly the same here] */}

              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                className="
                  fixed bottom-3 right-5 z-[200] 
                  md:absolute md:top-6 md:right-6 md:bottom-auto

                  p-4 md:p-2
                  cursor-pointer rounded-full

                  border-2 border-cyan-400/20 
                  bg-slate-900/60 backdrop-blur-2xl

                  text-slate-300 md:text-slate-400
                  hover:text-cyan-300 hover:border-cyan-400/40

                  shadow-[0_0_15px_rgba(34,211,238,0.25),0_0_30px_rgba(34,211,238,0.15)] animate-[pulse_2.5s_infinite]
                  hover:shadow-[0_0_20px_rgba(34,211,238,0.45),0_0_40px_rgba(34,211,238,0.25)]

                  transition-all duration-300 hover:scale-110 active:scale-95
                "
              >
                <span className="sr-only">Close</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {selectedProject ? (
                <motion.div
                  key={selectedProject.id}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="space-y-8"
                >
                  <div>
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-cyan-200 mb-4">
                      {selectedProject.title}
                    </h2>

                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold tracking-wide uppercase">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      {selectedProject.impact}
                    </div>
                  </div>

                  <p className="text-slate-300 text-base md:text-lg max-w-3xl leading-relaxed font-light">
                    {selectedProject.fullDesc}
                  </p>

                  {/* Tech Stack */}
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                      Technologies Used
                    </h4>
                    <div className="flex gap-2.5 flex-wrap">
                      {selectedProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3.5 py-1.5 bg-slate-950/40 border border-slate-800 text-slate-300 rounded-lg text-xs font-medium hover:border-cyan-500/30 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-2">
                  <svg
                    className="w-8 h-8 opacity-40"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                  <p className="text-sm">
                    Select a project to explore the case study.
                  </p>
                </div>
              )}

              {/* Footnotes / Confidential Note */}
              <div className="mt-12 pt-6 border-t border-slate-800/60 flex items-center gap-2 text-xs text-slate-500">
                <svg
                  className="w-3.5 h-3.5 text-amber-500/60"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m0-6v2m0-5h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Details limited due to confidentiality.</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
