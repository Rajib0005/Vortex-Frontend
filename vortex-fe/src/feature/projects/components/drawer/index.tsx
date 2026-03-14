import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProjectDetailsProps {
    projectId: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ProjectDetailsDrawer({ projectId, open, onOpenChange }: ProjectDetailsProps) {
    const isMobile = useIsMobile();

    const content = (
        <div className="flex-1 overflow-y-auto p-4">
            {/* Drawer body — add project details content here */}
        </div>
    );

    if (isMobile) {
        return (
            <Drawer direction="right" open={open} onOpenChange={onOpenChange}>
                <DrawerContent className="sm:max-w-lg">
                    <DrawerHeader className="flex flex-row items-start justify-between gap-4">
                        <div className="flex flex-col gap-1">
                            <DrawerTitle>Project Details</DrawerTitle>
                            <DrawerDescription>Project ID: {projectId}</DrawerDescription>
                        </div>
                        <DrawerClose asChild>
                            <Button variant="ghost" size="icon" className="shrink-0">
                                <X className="h-4 w-4" />
                                <span className="sr-only">Close</span>
                            </Button>
                        </DrawerClose>
                    </DrawerHeader>
                    {content}
                </DrawerContent>
            </Drawer>
        );
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Project Details</DialogTitle>
                    <DialogDescription>Project ID: {projectId}</DialogDescription>
                </DialogHeader>
                {content}
            </DialogContent>
        </Dialog>
    );
}