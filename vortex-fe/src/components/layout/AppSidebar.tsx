import { useState } from "react"
import { useTheme } from "next-themes"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import { GlobalCommandDialog } from "@/components/dialog/global-command-dialog"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuBadge,
} from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
    ChevronDown,
    Search,
    Inbox,
    ListTodo,
    Disc,
    Target,
    LayoutTemplate,
    Users,
    Star,
    Sun,
    Settings,
    Bell,
    MoreHorizontal,
    Plus,
    Moon,
    User,
    LogOut,
    Network
} from "lucide-react"
import { CreateProjectModal } from "@/feature/projects/components/dialogs/CreateProjectModal"

export function AppSidebar() {
    const [openCommand, setOpenCommand] = useState(false)
    const { theme, setTheme } = useTheme()
    const { logout, userEmail } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

    return (
        <Sidebar className="border-r border-sidebar-border" variant="sidebar">
            <SidebarHeader className="p-4">
                {/* Workspace Switcher */}
                <div
                    className="flex items-center justify-between gap-2 mb-4 cursor-pointer rounded-md p-1 hover:bg-sidebar-accent transition-colors"
                    onClick={() => navigate("/")}
                >
                    <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded bg-indigo-500 text-white font-bold text-xs">
                            V
                        </div>
                        <span className="font-semibold text-sm">Vortex</span>
                    </div>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </div>

                {/* Search */}
                <div className="relative cursor-pointer" onClick={() => setOpenCommand(true)}>
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <Input
                        placeholder="Search..."
                        className="pl-9 h-9 bg-sidebar-accent/50 border-sidebar-border/50 text-sm focus-visible:ring-1 pointer-events-none"
                        readOnly
                    />
                </div>
            </SidebarHeader>

            <SidebarContent className="px-2">
                {/* Top Level Menu */}
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    onClick={() => navigate('/inbox')}
                                    isActive={location.pathname === '/inbox'}
                                >
                                    <Inbox className="h-4 w-4 text-indigo-400" />
                                    <span>Inbox</span>
                                </SidebarMenuButton>
                                <SidebarMenuBadge className="bg-sidebar-accent text-muted-foreground rounded text-[10px] px-1.5 min-w-0">3</SidebarMenuBadge>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    onClick={() => navigate('/my-issues')}
                                    isActive={location.pathname === '/my-issues'}
                                >
                                    <ListTodo className="h-4 w-4 text-indigo-400" />
                                    <span>My Issues</span>
                                </SidebarMenuButton>
                                <SidebarMenuBadge className="bg-sidebar-accent text-muted-foreground rounded text-[10px] px-1.5 min-w-0">12</SidebarMenuBadge>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    onClick={() => navigate('/views')}
                                    isActive={location.pathname === '/views'}
                                >
                                    <Disc className="h-4 w-4 text-indigo-400" />
                                    <span>Views</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    onClick={() => navigate('/roadmap')}
                                    isActive={location.pathname === '/roadmap'}
                                >
                                    <Target className="h-4 w-4 text-indigo-400" />
                                    <span>Roadmap</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* DEVELOPMENT */}
                <SidebarGroup>
                    <SidebarGroupLabel className="flex items-center justify-between w-full uppercase text-xs font-semibold text-muted-foreground">
                        Development
                        <Plus
                            className="h-3 w-3 cursor-pointer hover:text-foreground"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsCreateModalOpen(true);
                            }}
                        />
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    onClick={() => navigate('/projects')}
                                    isActive={location.pathname === '/projects'}
                                >
                                    <LayoutTemplate className="h-4 w-4 text-indigo-400" />
                                    <span>Projects</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    onClick={() => navigate('/hierarchy')}
                                    isActive={location.pathname === '/hierarchy'}
                                >
                                    <Network className="h-4 w-4 text-indigo-400" />
                                    <span>Hierarchy</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    onClick={() => navigate('/team')}
                                    isActive={location.pathname === '/team'}
                                >
                                    <Users className="h-4 w-4 text-indigo-400" />
                                    <span>Team</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* FAVORITES */}
                <SidebarGroup>
                    <SidebarGroupLabel className="uppercase text-[10px] tracking-wider font-bold text-muted-foreground">
                        Favorites
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                                    <span>Linear UI Refactor</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                                    <span>Backend Persistence</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* Footer */}
            <SidebarFooter className="p-4">
                <div className="flex items-center justify-between px-2 text-muted-foreground mb-4">
                    <button
                        className="p-0 border-none bg-transparent"
                        onClick={(e) => {
                            const isDark = theme === 'dark';
                            const newTheme = isDark ? 'light' : 'dark';

                            // @ts-ignore - View Transitions API
                            if (!document.startViewTransition) {
                                setTheme(newTheme);
                                return;
                            }

                            const x = e.clientX;
                            const y = e.clientY;
                            const endRadius = Math.hypot(
                                Math.max(x, window.innerWidth - x),
                                Math.max(y, window.innerHeight - y)
                            );

                            // @ts-ignore
                            const transition = document.startViewTransition(() => {
                                setTheme(newTheme);
                            });

                            transition.ready.then(() => {
                                document.documentElement.animate(
                                    {
                                        clipPath: isDark
                                            ? [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`]
                                            : [`circle(${endRadius}px at ${x}px ${y}px)`, `circle(0px at ${x}px ${y}px)`],
                                    },
                                    {
                                        duration: 500,
                                        easing: "ease-in-out",
                                        pseudoElement: isDark
                                            ? "::view-transition-new(root)"
                                            : "::view-transition-old(root)",
                                    }
                                );
                            });
                        }}
                    >
                        {theme === 'dark' ? (
                            <Moon className="h-4 w-4 cursor-pointer hover:text-foreground transition-all duration-300" />
                        ) : (
                            <Sun className="h-4 w-4 cursor-pointer hover:text-foreground transition-all duration-300" />
                        )}
                    </button>
                    <Settings
                        className="h-4 w-4 cursor-pointer hover:text-foreground transition-colors"
                        onClick={() => navigate('/settings')}
                    />
                    <Bell className="h-4 w-4 cursor-pointer hover:text-foreground transition-colors" />
                </div>

                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton size="lg" className="w-full justify-between hover:bg-sidebar-accent rounded-md">
                                    <div className="flex items-center gap-2">
                                        <Avatar className="h-6 w-6 rounded bg-indigo-500 text-white font-medium text-xs flex items-center justify-center">
                                            <span className="text-[10px] uppercase">
                                                {userEmail ? userEmail.slice(0, 2) : "JD"}
                                            </span>
                                        </Avatar>
                                        <div className="flex flex-col text-left text-sm leading-tight">
                                            <span className="font-semibold text-foreground truncate max-w-[140px]">
                                                {userEmail || "John Doe"}
                                            </span>
                                        </div>
                                    </div>
                                    <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[200px]">
                                <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer">
                                    <User className="mr-2 h-4 w-4" />
                                    <span>Profile</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive focus:bg-destructive/15 focus:text-destructive">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <GlobalCommandDialog open={openCommand} onOpenChange={setOpenCommand} />
            <CreateProjectModal open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen} />
        </Sidebar>
    )
}
