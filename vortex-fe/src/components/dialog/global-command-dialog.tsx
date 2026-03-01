import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useTheme } from "next-themes"
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandShortcut,
} from "@/components/ui/command"
import {
    LayoutDashboard,
    LayoutTemplate,
    Users,
    Settings,
    Plus,
    Moon
} from "lucide-react"

interface GlobalCommandDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function GlobalCommandDialog({ open, onOpenChange }: GlobalCommandDialogProps) {
    const navigate = useNavigate()
    const { setTheme, theme } = useTheme()

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                onOpenChange(!open)
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [open, onOpenChange])

    const runCommand = (command: () => void) => {
        onOpenChange(false)
        command()
    }

    return (
        <CommandDialog open={open} onOpenChange={onOpenChange}>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="NAVIGATION">
                    <CommandItem onSelect={() => runCommand(() => navigate('/dashboard'))} className="cursor-pointer">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Go to Dashboard</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => navigate('/projects'))} className="cursor-pointer">
                        <LayoutTemplate className="mr-2 h-4 w-4" />
                        <span>Go to Projects</span>
                        <CommandShortcut>⌘P</CommandShortcut>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => navigate('/team'))} className="cursor-pointer">
                        <Users className="mr-2 h-4 w-4" />
                        <span>Go to Team</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => navigate('/settings'))} className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Go to Settings</span>
                    </CommandItem>
                </CommandGroup>

                <CommandGroup heading="ACTIONS">
                    <CommandItem onSelect={() => runCommand(() => navigate('/projects/new'))} className="cursor-pointer">
                        <Plus className="mr-2 h-4 w-4" />
                        <span>Create New Project</span>
                        <CommandShortcut>⌘N</CommandShortcut>
                    </CommandItem>
                </CommandGroup>

                <CommandGroup heading="SETTINGS">
                    <CommandItem onSelect={() => runCommand(() => setTheme(theme === "dark" ? "light" : "dark"))} className="cursor-pointer">
                        <Moon className="mr-2 h-4 w-4" />
                        <span>Switch to {theme === "dark" ? "Light" : "Dark"} Mode</span>
                    </CommandItem>
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    )
}
