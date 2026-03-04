import { Link, useNavigate } from "react-router-dom"
import { ChevronRight, LayoutTemplate, Zap, Shield, Sparkles, Inbox, ListTodo, Disc, Target, Layers, Users, MessageSquare } from "lucide-react"
import { useRef, useState } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useAuth } from "@/context/AuthContext";

export function LandingPage() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [isHovered, setIsHovered] = useState(false);
    const methodologyRef = useRef<HTMLDivElement>(null);

    const COMPANIES = [
        { name: "Linear", color: "bg-white", text: "text-black", icon: "L", shape: "rounded" },
        { name: "Vercel", color: "bg-blue-500", text: "text-white", icon: "V", shape: "rounded-full" },
        { name: "Supabase", color: "bg-emerald-500", text: "text-white", icon: "S", shape: "rounded-sm" },
        { name: "Raycast", color: "bg-purple-500", text: "text-white", icon: "R", shape: "rounded" },
        { name: "GitHub", color: "bg-orange-500", text: "text-white", icon: "G", shape: "rounded-full" },
        { name: "Sentry", color: "bg-red-500", text: "text-white", icon: "S", shape: "rounded-md" },
        { name: "Notion", color: "bg-white", text: "text-black", icon: "N", shape: "rounded-lg" },
    ];

    const { scrollYProgress } = useScroll({
        target: methodologyRef,
        offset: ["start center", "end center"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const clipPath = useTransform(smoothProgress, (v) => `inset(0 0 ${100 - v * 100}% 0)`);
    const getStartedPath = isAuthenticated ? "/projects" : "/login";
    return (
        <div className="min-h-screen bg-black text-white selection:bg-indigo-500/30 font-sans">
            {/* Header */}
            <header className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/50 backdrop-blur-md">
                <div className="container mx-auto px-6 h-14 flex items-center justify-between">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
                        <div className="flex h-6 w-6 items-center justify-center rounded bg-indigo-500 text-white font-bold text-xs">
                            V
                        </div>
                        <span className="font-semibold tracking-tight text-white">Vortex</span>
                    </div>
                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
                        <a href="#features" className="hover:text-white transition-colors">Features</a>
                        <a href="#methodology" className="hover:text-white transition-colors">Methodology</a>
                        <a href="#customers" className="hover:text-white transition-colors">Customers</a>
                        <a href="#changelog" className="hover:text-white transition-colors">Changelog</a>
                    </nav>
                    {!isAuthenticated && (
                        <div className="flex items-center gap-4">
                            <Link to="/login" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
                                Log in
                            </Link>
                            <Link to="/login" className="text-sm font-medium bg-white text-black px-4 py-1.5 rounded-full hover:bg-white/90 transition-colors">
                                Sign up
                            </Link>
                        </div>
                    )}
                </div>
            </header>

            {/* Hero Section */}
            <main>
                <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 overflow-hidden">
                    {/* Glowing background */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none" />

                    <div className="container mx-auto px-6 relative z-10 text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-white/80 mb-8 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-pointer">
                            <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
                            <span>Vortex is now available</span>
                            <ChevronRight className="h-3 w-3" />
                        </div>

                        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-8 max-w-4xl mx-auto leading-[1.1] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
                            Vortex is a better way <br className="hidden sm:block" />
                            to build products
                        </h1>

                        <p className="text-lg sm:text-xl text-white/60 mb-10 max-w-2xl mx-auto font-medium">
                            Meet the new standard for modern software development. Streamline issues, projects, and product roadmaps in a hyper-fast, gorgeous workspace.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to={getStartedPath} className="flex items-center justify-center h-12 px-8 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 font-semibold transition-colors w-full sm:w-auto">
                                Get started
                            </Link>
                            <a href="#methodology" className="flex items-center justify-center h-12 px-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-colors w-full sm:w-auto">
                                Introducing Methodology
                            </a>
                        </div>
                    </div>
                </div>

                {/* Dashboard Preview Image using mock CSS layout */}
                <div className="container mx-auto px-6 pb-32">
                    <div className="relative rounded-xl border border-white/10 bg-[#0a0a0a] overflow-hidden shadow-2xl shadow-indigo-500/10 backdrop-blur-3xl mx-auto max-w-5xl">
                        {/* Fake Browser Chrome */}
                        <div className="h-10 border-b border-white/10 flex items-center px-4 gap-2 bg-[#111]">
                            <div className="w-3 h-3 rounded-full bg-red-500/80" />
                            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                        </div>
                        {/* Fake content */}
                        <div className="h-[400px] sm:h-[600px] flex">
                            {/* Fake Sidebar */}
                            <div className="w-56 border-r border-white/10 p-4 flex flex-col gap-6 hidden sm:flex bg-[#0a0a0a]">
                                {/* Workspace mock */}
                                <div className="flex items-center gap-2 px-2">
                                    <div className="flex h-5 w-5 items-center justify-center rounded bg-indigo-500 text-white font-bold text-[10px]">
                                        V
                                    </div>
                                    <span className="font-semibold text-xs tracking-tight text-white/90">Vortex</span>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-white/5 text-white/60">
                                        <Inbox className="h-4 w-4" />
                                        <span className="text-xs font-medium">Inbox</span>
                                    </div>
                                    <motion.div
                                        initial={{ x: -10, opacity: 0, scale: 0.95 }}
                                        animate={{ x: 0, opacity: 1, scale: 1.05 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 150,
                                            damping: 20,
                                            delay: 0.5
                                        }}
                                        className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-indigo-500/10 text-white shadow-[0_0_10px_rgba(99,102,241,0.2)] border border-indigo-500/20 relative z-20"
                                    >
                                        <ListTodo className="h-4 w-4 text-indigo-400" />
                                        <span className="text-xs font-semibold">My Issues</span>
                                    </motion.div>
                                    <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-white/5 text-white/60">
                                        <Disc className="h-4 w-4" />
                                        <span className="text-xs font-medium">Views</span>
                                    </div>
                                    <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-white/5 text-white/60">
                                        <Target className="h-4 w-4" />
                                        <span className="text-xs font-medium">Roadmap</span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <span className="px-2 text-[10px] font-semibold text-white/40 uppercase tracking-wider mb-1">Development</span>
                                    <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-white/5 text-white/60">
                                        <LayoutTemplate className="h-4 w-4" />
                                        <span className="text-xs font-medium">Projects</span>
                                    </div>
                                    <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-white/5 text-white/60">
                                        <Layers className="h-4 w-4" />
                                        <span className="text-xs font-medium">Hierarchy</span>
                                    </div>
                                </div>
                            </div>
                            {/* Fake Main Content */}
                            <div className="flex-1 bg-[#111] overflow-hidden flex flex-col">
                                <div className="h-14 border-b border-white/10 flex items-center px-6">
                                    <span className="text-sm font-semibold">My Issues</span>
                                </div>
                                <motion.div
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={{
                                        hidden: { opacity: 0 },
                                        visible: {
                                            opacity: 1,
                                            transition: {
                                                staggerChildren: 0.2,
                                                delayChildren: 0.6
                                            }
                                        }
                                    }}
                                    className="p-6 space-y-2"
                                >
                                    {/* Mock Issues */}
                                    <motion.div
                                        variants={{
                                            hidden: { scale: 0.6, opacity: 0, y: 10 },
                                            visible: { scale: 1, opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 18 } }
                                        }}
                                        className="w-full bg-[#161616] hover:bg-[#1a1a1a] transition-colors rounded-lg border border-white/5 flex items-center px-4 py-3 group cursor-pointer"
                                    >
                                        <div className="w-4 h-4 rounded border border-indigo-500 mr-4 flex items-center justify-center">
                                            <div className="w-2 h-2 rounded-sm bg-indigo-500" />
                                        </div>
                                        <div className="flex-1 flex items-center justify-between">
                                            <span className="text-sm font-medium text-white/90 group-hover:text-white">Implement dark mode across all components</span>
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs text-white/40 font-mono">VOR-142</span>
                                                <div className="h-5 w-5 rounded-full bg-orange-500/20 text-orange-400 text-[10px] flex items-center justify-center font-bold">JD</div>
                                            </div>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        variants={{
                                            hidden: { scale: 0.6, opacity: 0, y: 10 },
                                            visible: { scale: 1, opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 18 } }
                                        }}
                                        className="w-full bg-[#161616] hover:bg-[#1a1a1a] transition-colors rounded-lg border border-white/5 flex items-center px-4 py-3 group cursor-pointer"
                                    >
                                        <div className="w-4 h-4 rounded border border-white/20 mr-4" />
                                        <div className="flex-1 flex items-center justify-between">
                                            <span className="text-sm font-medium text-white/90 group-hover:text-white">Redesign authentication onboarding flow</span>
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs text-white/40 font-mono">VOR-139</span>
                                                <div className="h-5 w-5 rounded-full bg-blue-500/20 text-blue-400 text-[10px] flex items-center justify-center font-bold">AL</div>
                                            </div>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        variants={{
                                            hidden: { scale: 0.6, opacity: 0, y: 10 },
                                            visible: { scale: 1, opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 18 } }
                                        }}
                                        className="w-full bg-[#161616] hover:bg-[#1a1a1a] transition-colors rounded-lg border border-white/5 flex items-center px-4 py-3 group cursor-pointer"
                                    >
                                        <div className="w-4 h-4 rounded border border-white/20 mr-4" />
                                        <div className="flex-1 flex items-center justify-between">
                                            <span className="text-sm font-medium text-white/90 group-hover:text-white">Fix pagination layout jumping in project grid</span>
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs text-white/40 font-mono">VOR-135</span>
                                                <div className="h-5 w-5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] flex items-center justify-center font-bold">JD</div>
                                            </div>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        variants={{
                                            hidden: { scale: 0.6, opacity: 0, y: 10 },
                                            visible: { scale: 1, opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 18 } }
                                        }}
                                        className="w-full bg-[#161616] hover:bg-[#1a1a1a] transition-colors rounded-lg border border-white/5 flex items-center px-4 py-3 group cursor-pointer opacity-50"
                                    >
                                        <div className="w-4 h-4 rounded border border-white/20 mr-4 flex items-center justify-center">
                                            <div className="w-2 h-2 rounded-sm bg-white/20" />
                                        </div>
                                        <div className="flex-1 flex items-center justify-between">
                                            <span className="text-sm font-medium text-white/40 line-through">Set up PostgreSQL indexing for analytics queries</span>
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs text-white/40 font-mono">VOR-110</span>
                                                <div className="h-5 w-5 rounded-full bg-purple-500/20 text-purple-400 text-[10px] flex items-center justify-center font-bold">RK</div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Roadmap / Methodology Section */}
                <div id="methodology" ref={methodologyRef} className="container mx-auto px-6 py-32 border-t border-white/10 relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-[600px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

                    <div className="text-center mb-20 relative z-10">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">Built for product teams</h2>
                        <p className="text-lg text-white/50 max-w-2xl mx-auto">
                            A seamless flow from high-level planning down to daily execution. Vortex adapts to your workflow.
                        </p>
                    </div>

                    <div
                        className="relative max-w-4xl mx-auto z-10 group"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        {/* High-fidelity glowing S-curve neon light-trail */}
                        <div className="absolute inset-0 pointer-events-none hidden md:block z-0 overflow-visible">
                            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100" fill="none">
                                <defs>
                                    <linearGradient id="neonGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="rgba(99, 102, 241, 0)" />
                                        <stop offset="20%" stopColor="rgba(99, 102, 241, 0.8)" />
                                        <stop offset="50%" stopColor="rgba(168, 85, 247, 0.8)" />
                                        <stop offset="80%" stopColor="rgba(99, 102, 241, 0.8)" />
                                        <stop offset="100%" stopColor="rgba(99, 102, 241, 0)" />
                                    </linearGradient>
                                    <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
                                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                        <feMerge>
                                            <feMergeNode in="coloredBlur" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                </defs>
                                {/* Dotted track bg */}
                                <path
                                    d="M 75 5 L 75 15 Q 75 20, 65 20 L 35 20 Q 25 20, 25 25 L 25 35 Q 25 40, 35 40 L 65 40 Q 75 40, 75 45 L 75 55 Q 75 60, 65 60 L 35 60 Q 25 60, 25 65 L 25 75 Q 25 80, 35 80 L 65 80 Q 75 80, 75 85 L 75 95"
                                    fill="none"
                                    stroke="white"
                                    strokeWidth="1.5"
                                    strokeDasharray="1 15"
                                    strokeLinecap="round"
                                    className="opacity-[0.05]"
                                    vectorEffect="non-scaling-stroke"
                                />
                                {/* Glowing dotted animated path overlay on hover or scroll */}
                                <motion.path
                                    d="M 75 5 L 75 15 Q 75 20, 65 20 L 35 20 Q 25 20, 25 25 L 25 35 Q 25 40, 35 40 L 65 40 Q 75 40, 75 45 L 75 55 Q 75 60, 65 60 L 35 60 Q 25 60, 25 65 L 25 75 Q 25 80, 35 80 L 65 80 Q 75 80, 75 85 L 75 95"
                                    className="stroke-indigo-400 opacity-100"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeDasharray="1 10"
                                    vectorEffect="non-scaling-stroke"
                                    filter="url(#neonGlow)"
                                    style={{ clipPath: isHovered ? "inset(0 0 0% 0)" : clipPath }}
                                />
                                {/* Extra highlight dot that follows scroll */}
                                <motion.path
                                    d="M 75 5 L 75 15 Q 75 20, 65 20 L 35 20 Q 25 20, 25 25 L 25 35 Q 25 40, 35 40 L 65 40 Q 75 40, 75 45 L 75 55 Q 75 60, 65 60 L 35 60 Q 25 60, 25 65 L 25 75 Q 25 80, 35 80 L 65 80 Q 75 80, 75 85 L 75 95"
                                    className="stroke-white opacity-40"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    strokeDasharray="1 1000"
                                    vectorEffect="non-scaling-stroke"
                                    style={{
                                        pathLength: 0.01,
                                        pathOffset: smoothProgress,
                                        filter: "blur(4px)"
                                    }}
                                />
                            </svg>
                        </div>

                        <div className="space-y-32">
                            {/* Step 1 */}
                            <motion.div
                                initial={{ opacity: 0, y: 60 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                                className="relative flex flex-col md:flex-row items-center justify-between group"
                            >
                                <div className="w-full md:w-[45%] text-left md:text-right pr-0 md:pr-12 opacity-80 group-hover:opacity-100 transition-opacity z-10 mb-8 md:mb-0">
                                    <div className="text-sm font-mono text-indigo-400 mb-2">Step 1</div>
                                    <h3 className="text-3xl font-bold mb-3 text-white">Define Roadmap</h3>
                                    <p className="text-white/60 text-lg">Set company-wide goals and connect them to actual work. Track progress automatically.</p>
                                </div>
                                <div className="hidden md:block w-[45%] pl-12 relative z-10">
                                    <div className="h-36 rounded-xl bg-[#0a0a0a] border border-white/10 p-4 shadow-lg flex flex-col items-center justify-center backdrop-blur-sm group-hover:border-indigo-500/50 group-hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] transition-all">
                                        <div className="w-full max-w-[200px] space-y-3 transition-transform duration-500 group-hover:-translate-y-2">
                                            <div className="flex justify-between text-[10px] font-mono text-white/40">
                                                <span>2026 ROADMAP</span>
                                                <span className="text-indigo-400">45%</span>
                                            </div>
                                            <div className="h-2 w-full bg-indigo-500/20 rounded-full">
                                                <div className="h-full w-[45%] bg-indigo-500 rounded-full" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Step 2 */}
                            <motion.div
                                initial={{ opacity: 0, y: 60 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                                className="relative flex flex-col md:flex-row items-center justify-between group"
                            >
                                <div className="hidden md:block w-[45%] pr-12 relative z-10">
                                    <div className="h-36 rounded-xl bg-[#0a0a0a] border border-white/10 p-6 shadow-lg flex items-center gap-4 backdrop-blur-sm group-hover:border-indigo-500/50 group-hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] transition-all">
                                        <div className="h-10 w-10 rounded-lg bg-indigo-500 flex items-center justify-center text-white font-bold">V</div>
                                        <div className="flex-1 space-y-2">
                                            <div className="h-3 w-full bg-white/10 rounded" />
                                            <div className="h-3 w-2/3 bg-white/5 rounded" />
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full md:w-[45%] pl-0 md:pl-12 opacity-80 group-hover:opacity-100 transition-opacity z-10">
                                    <div className="text-sm font-mono text-indigo-400 mb-2">Step 2</div>
                                    <h3 className="text-3xl font-bold mb-3 text-white">Project Setup</h3>
                                    <p className="text-white/60 text-lg">Initialize your projects with custom workflows, labels, and cycle tracking tailored to your team.</p>
                                </div>
                            </motion.div>

                            {/* Step 3 */}
                            <motion.div
                                initial={{ opacity: 0, y: 60 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                                className="relative flex flex-col md:flex-row items-center justify-between group"
                            >
                                <div className="w-full md:w-[45%] text-left md:text-right pr-0 md:pr-12 opacity-80 group-hover:opacity-100 transition-opacity z-10">
                                    <div className="text-sm font-mono text-indigo-400 mb-2">Step 3</div>
                                    <h3 className="text-3xl font-bold mb-3 text-white">Assign Tasks</h3>
                                    <p className="text-white/60 text-lg">Delegate responsibilities instantly. Assign tasks to leads and contributors with a single click.</p>
                                </div>
                                <div className="hidden md:block w-[45%] pl-12 relative z-10">
                                    <div className="h-36 rounded-xl bg-[#0a0a0a] border border-white/10 p-4 shadow-lg flex items-center justify-center backdrop-blur-sm group-hover:border-indigo-500/50 group-hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] transition-all">
                                        <div className="bg-[#111] border border-white/10 rounded-lg p-3 w-full max-w-[220px] shadow-xl group-hover:border-indigo-500/30 transition-colors">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-[10px] text-white font-bold">JD</div>
                                                <span className="text-xs text-white/90">John Doe</span>
                                                <span className="ml-auto text-[10px] text-indigo-400 font-mono">Owner</span>
                                            </div>
                                            <div className="h-px bg-white/5 mb-2" />
                                            <div className="flex -space-x-2">
                                                {[1, 2, 3].map(i => <div key={i} className="w-6 h-6 rounded-full bg-white/10 border-2 border-black" />)}
                                                <div className="w-6 h-6 rounded-full bg-indigo-500/20 border-2 border-black flex items-center justify-center text-[8px] text-indigo-400">+4</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Step 4 */}
                            <motion.div
                                initial={{ opacity: 0, y: 60 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                                className="relative flex flex-col md:flex-row items-center justify-between group"
                            >
                                <div className="hidden md:block w-[45%] pr-12 relative z-10">
                                    <div className="h-36 rounded-xl bg-[#0a0a0a] border border-white/10 p-4 shadow-lg flex items-center justify-center backdrop-blur-sm group-hover:border-indigo-500/50 group-hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] transition-all">
                                        <div className="space-y-2 w-full max-w-[200px]">
                                            <div className="flex items-start gap-2 bg-white/5 p-2 rounded-lg border border-white/5">
                                                <div className="w-4 h-4 rounded-full bg-emerald-500 flex-shrink-0" />
                                                <div className="h-2 w-full bg-white/10 rounded mt-1" />
                                            </div>
                                            <div className="flex items-start gap-2 bg-indigo-500/10 p-2 rounded-lg border border-indigo-500/10 ml-4">
                                                <div className="w-4 h-4 rounded-full bg-indigo-500 flex-shrink-0" />
                                                <div className="h-2 w-2/3 bg-white/10 rounded mt-1" />
                                                <div className="flex items-center gap-2 pt-1 border-t border-white/5 mt-2">
                                                    <MessageSquare className="w-2.5 h-2.5 text-indigo-400" />
                                                    <span className="text-[8px] text-white/30 italic">2 replies</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full md:w-[45%] pl-0 md:pl-12 opacity-80 group-hover:opacity-100 transition-opacity z-10">
                                    <div className="text-sm font-mono text-indigo-400 mb-2">Step 4</div>
                                    <h3 className="text-3xl font-bold mb-3 text-white">Comment Threads</h3>
                                    <p className="text-white/60 text-lg">Discuss progress in real-time. Nested threads and rich text support keep the conversation focused and organized.</p>
                                </div>
                            </motion.div>

                            {/* Step 5 */}
                            <motion.div
                                initial={{ opacity: 0, y: 60 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                                className="relative flex flex-col md:flex-row items-center justify-between group"
                            >
                                <div className="w-full md:w-[45%] text-left md:text-right pr-0 md:pr-12 opacity-80 group-hover:opacity-100 transition-opacity z-10">
                                    <div className="text-sm font-mono text-indigo-400 mb-2">Step 5</div>
                                    <h3 className="text-3xl font-bold mb-3 text-white">Collaborate & Grow</h3>
                                    <p className="text-white/60 text-lg">Invite team members, set precise roles, and scale your workspace with fine-grained permissions and security.</p>
                                </div>
                                <div className="hidden md:block w-[45%] pl-12 relative z-10">
                                    <div className="h-36 rounded-xl bg-[#0a0a0a] border border-white/10 p-4 shadow-lg flex flex-col justify-center items-center backdrop-blur-sm group-hover:border-indigo-500/50 group-hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] transition-all">
                                        <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10 group-hover:border-indigo-500/30 transition-colors">
                                            <Users className="w-4 h-4 text-indigo-400" />
                                            <span className="text-xs text-white/50">Invite team members...</span>
                                            <div className="h-5 w-12 bg-indigo-500 rounded text-[10px] flex items-center justify-center font-bold">SEND</div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Customers Section */}
                <div id="customers" className="container mx-auto px-6 py-32 border-t border-white/10 overflow-hidden">
                    <div className="text-center mb-16">
                        <h2 className="text-white/40 text-sm font-mono uppercase tracking-[0.2em]">Trusted by teams at</h2>
                    </div>

                    <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
                        <motion.div
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{
                                duration: 30,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            className="flex items-center gap-16 whitespace-nowrap opacity-40 grayscale hover:grayscale-0 transition-grayscale duration-500 w-fit"
                        >
                            {[...COMPANIES, ...COMPANIES].map((company, i) => (
                                <div key={i} className="flex items-center gap-2 text-xl font-bold tracking-tighter shrink-0">
                                    <div className={`w-8 h-8 ${company.color} ${company.text} flex items-center justify-center ${company.shape}`}>
                                        {company.icon}
                                    </div>
                                    {company.name}
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Features Section */}
                <div id="features" className="container mx-auto px-6 py-32 border-t border-white/10">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">Designed for velocity</h2>
                        <p className="text-lg text-white/50 max-w-2xl mx-auto">
                            Built from the ground up to be the fastest issue tracking tool you've ever used.
                            Optimized for keyboard navigation and blazingly fast syncing.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-colors">
                            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                                <Zap className="text-white/80 h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Keyboard first</h3>
                            <p className="text-white/50 leading-relaxed font-medium">
                                Fly through your tasks with extensive keyboard shortcuts. Keep your hands on the keyboard and out of the way.
                            </p>
                        </div>
                        <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-colors">
                            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                                <LayoutTemplate className="text-white/80 h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Beautiful design</h3>
                            <p className="text-white/50 leading-relaxed font-medium">
                                A clean, gorgeous interface that gets out of your way. Carefully crafted to reduce cognitive load.
                            </p>
                        </div>
                        <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-colors">
                            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                                <Shield className="text-white/80 h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Built to scale</h3>
                            <p className="text-white/50 leading-relaxed font-medium">
                                Whether you're a team of 4 or 4000, Vortex handles your thousands of issues with zero lag whatsoever.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-white/10 bg-black pt-16 pb-8">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-2">
                            <div className="flex h-5 w-5 items-center justify-center rounded bg-indigo-500 text-white font-bold text-[10px]">
                                V
                            </div>
                            <span className="font-medium text-white/80 text-sm">Vortex Inc.</span>
                        </div>
                        <div className="flex gap-6 text-sm text-white/50">
                            <a href="#" className="hover:text-white transition-colors">Twitter</a>
                            <a href="#" className="hover:text-white transition-colors">GitHub</a>
                            <a href="#" className="hover:text-white transition-colors">System Status</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
