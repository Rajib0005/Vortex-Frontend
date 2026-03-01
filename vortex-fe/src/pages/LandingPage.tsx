import { Link } from "react-router-dom"
import { ChevronRight, LayoutTemplate, Zap, Shield, Sparkles, Inbox, ListTodo, Disc, Target, Layers } from "lucide-react"

export function LandingPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-indigo-500/30 font-sans">
            {/* Header */}
            <header className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/50 backdrop-blur-md">
                <div className="container mx-auto px-6 h-14 flex items-center justify-between">
                    <div className="flex items-center gap-2">
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
                    <div className="flex items-center gap-4">
                        <Link to="/login" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
                            Log in
                        </Link>
                        <Link to="/login" className="text-sm font-medium bg-white text-black px-4 py-1.5 rounded-full hover:bg-white/90 transition-colors">
                            Sign up
                        </Link>
                    </div>
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
                            <Link to="/login" className="flex items-center justify-center h-12 px-8 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 font-semibold transition-colors w-full sm:w-auto">
                                Get started
                            </Link>
                            <a href="#features" className="flex items-center justify-center h-12 px-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-colors w-full sm:w-auto">
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
                                    <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-white/10 text-white/90">
                                        <ListTodo className="h-4 w-4 text-indigo-400" />
                                        <span className="text-xs font-medium">My Issues</span>
                                    </div>
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
                                <div className="p-6 space-y-2">
                                    {/* Mock Issues */}
                                    <div className="w-full bg-[#161616] hover:bg-[#1a1a1a] transition-colors rounded-lg border border-white/5 flex items-center px-4 py-3 group cursor-pointer">
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
                                    </div>

                                    <div className="w-full bg-[#161616] hover:bg-[#1a1a1a] transition-colors rounded-lg border border-white/5 flex items-center px-4 py-3 group cursor-pointer">
                                        <div className="w-4 h-4 rounded border border-white/20 mr-4" />
                                        <div className="flex-1 flex items-center justify-between">
                                            <span className="text-sm font-medium text-white/90 group-hover:text-white">Redesign authentication onboarding flow</span>
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs text-white/40 font-mono">VOR-139</span>
                                                <div className="h-5 w-5 rounded-full bg-blue-500/20 text-blue-400 text-[10px] flex items-center justify-center font-bold">AL</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-full bg-[#161616] hover:bg-[#1a1a1a] transition-colors rounded-lg border border-white/5 flex items-center px-4 py-3 group cursor-pointer">
                                        <div className="w-4 h-4 rounded border border-white/20 mr-4" />
                                        <div className="flex-1 flex items-center justify-between">
                                            <span className="text-sm font-medium text-white/90 group-hover:text-white">Fix pagination layout jumping in project grid</span>
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs text-white/40 font-mono">VOR-135</span>
                                                <div className="h-5 w-5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] flex items-center justify-center font-bold">JD</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-full bg-[#161616] hover:bg-[#1a1a1a] transition-colors rounded-lg border border-white/5 flex items-center px-4 py-3 group cursor-pointer opacity-50">
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
                                    </div>
                                </div>
                            </div>
                        </div>
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
