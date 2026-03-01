import type { LucideIcon } from "lucide-react";

interface ComingSoonProps {
    title: string;
    icon: LucideIcon;
}

export function ComingSoon({ title, icon: Icon }: ComingSoonProps) {
    return (
        <div className="flex h-full min-h-[500px] w-full items-center justify-center p-6 bg-transparent">
            <div className="flex flex-col items-center justify-center rounded-xl bg-card border border-border p-12 text-center shadow-sm w-full max-w-lg aspect-auto">
                <div className="flex h-16 w-16 mb-4 items-center justify-center rounded-full bg-indigo-500/10">
                    <Icon className="h-8 w-8 text-indigo-400 stroke-[1.5]" />
                </div>
                <h3 className="mb-4 text-xs font-bold tracking-[0.15em] text-indigo-400/80 uppercase">Coming Soon</h3>
                <h2 className="mb-4 text-2xl font-bold tracking-tight text-foreground lowercase">{title}</h2>
                <p className="max-w-[300px] text-[15px] font-medium text-muted-foreground/80 leading-relaxed">
                    This view is currently being implemented as part<br />of the Vortex UI refactor.
                </p>
            </div>
        </div>
    );
}
