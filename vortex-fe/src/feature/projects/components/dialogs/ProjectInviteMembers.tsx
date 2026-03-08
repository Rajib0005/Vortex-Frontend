import * as React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { UserPlus2, Plus, X, ChevronsUpDown } from "lucide-react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import type { UserToInvite } from "@/feature/auth/types";
import { useFormContext, useWatch } from "react-hook-form";
import { useGetUsersToInviteQuery } from "../../services/api";
import type { ProjectFormData } from "./CreateProjectModal";

export function ProjectInviteMembers() {
    const form = useFormContext<ProjectFormData>();
    const { data: usersToInvite, isLoading } = useGetUsersToInviteQuery(null);
    const [searchQuery, setSearchQuery] = React.useState("");
    const [isSearching, setIsSearching] = React.useState(false);

    const selectedMembers = (useWatch({
        control: form.control,
        name: "inviteUsers",
    }) || []) as UserToInvite[];

    const filteredUsers = usersToInvite?.data?.filter(user =>
        (user.userEmail?.toLowerCase().includes(searchQuery.toLowerCase())) &&
        !selectedMembers.find(m => m.userId === user.userId)
    ) || [];

    const addMember = (user: UserToInvite) => {
        form.setValue("inviteUsers", [...selectedMembers, user], { shouldValidate: true, shouldDirty: true });
        setSearchQuery("");
        setIsSearching(false);
    };

    const removeMember = (userId: string) => {
        form.setValue("inviteUsers", selectedMembers.filter(m => m.userId !== userId), { shouldValidate: true, shouldDirty: true });
    };

    return (
        <FormField
            control={form.control}
            name="inviteUsers"
            render={({ field }) => (
                <FormItem className="flex flex-col">
                    <FormLabel className="flex items-center gap-2 text-[10px] font-black tracking-[0.2em] text-muted-foreground uppercase mb-4 after:content-['*'] after:ml-1 after:text-red-500 after:text-sm after:leading-none">
                        <UserPlus2 className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                        Invite Team Members
                    </FormLabel>
                    <Popover open={isSearching} onOpenChange={setIsSearching}>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    type="button"
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                        "bg-secondary/30 border-border/40 h-12 px-5 text-base justify-between hover:bg-secondary/50 rounded-xl transition-all duration-200 border-dashed hover:border-solid hover:border-indigo-500/50",
                                        !field.value?.length && "text-muted-foreground"
                                    )}
                                >
                                    {searchQuery || "Search by name or email..."}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="p-0 md:max-w-3xl w-(--radix-popover-trigger-width) bg-popover border-border overflow-hidden" align="start">
                            <Command shouldFilter={false}>
                                <CommandInput
                                    placeholder="Search by name or email..."
                                    value={searchQuery}
                                    onValueChange={(val) => {
                                        setSearchQuery(val);
                                        setIsSearching(true);
                                    }}
                                    className="h-12 border-none focus:ring-0"
                                />
                                <CommandList>
                                    {isLoading ? (
                                        <div className="p-4 text-center text-sm text-muted-foreground">Loading...</div>
                                    ) : filteredUsers.length === 0 ? (
                                        <CommandEmpty>No users found.</CommandEmpty>
                                    ) : (
                                        <CommandGroup>
                                            {filteredUsers.map((user) => (
                                                <CommandItem
                                                    key={user.userId}
                                                    onSelect={() => addMember(user)}
                                                    className="flex items-center justify-between p-4 hover:bg-secondary/20 cursor-pointer transition-colors group"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <Avatar className="h-10 w-10 border-2 border-border/20">
                                                            <AvatarImage src={`https://avatar.iran.liara.run/username?username=${user.userEmail}`} />
                                                            <AvatarFallback>{user.userEmail?.charAt(0)}</AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <div className="text-base font-bold">{user.userEmail.split('@')[0]}</div>
                                                            <div className="text-sm text-muted-foreground">{user.userEmail}</div>
                                                        </div>
                                                    </div>
                                                    <Plus className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-600 dark:text-indigo-400" />
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    )}
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>

                    {selectedMembers.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-3">
                            {selectedMembers.map((member) => (
                                <Badge
                                    key={member.userId}
                                    variant="secondary"
                                    className="bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-500/20 px-3 py-1.5 gap-2 text-xs rounded-lg"
                                >
                                    {member.userEmail}
                                    <button
                                        className="hover:bg-indigo-500/20 p-0.5 rounded-full outline-none focus:ring-2 focus:ring-indigo-500/50"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            removeMember(member.userId);
                                        }}
                                    >
                                        <X className="h-3 w-3 cursor-pointer hover:text-indigo-100 transition-colors" />
                                    </button>
                                </Badge>
                            ))}
                        </div>
                    )}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
