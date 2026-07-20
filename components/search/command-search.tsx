"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { FileText, BookOpen, FolderGit2 } from "lucide-react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useSearch } from "@/components/search/search-provider";
import type { SearchItem } from "@/lib/search";

const ICONS: Record<SearchItem["type"], React.ElementType> = {
  Post: FileText,
  Book: BookOpen,
  Project: FolderGit2,
};

export function CommandSearch({ items }: { items: SearchItem[] }) {
  const { open, setOpen } = useSearch();
  const router = useRouter();

  const onSelect = useCallback(
    (url: string) => {
      setOpen(false);
      router.push(url);
    },
    [router, setOpen]
  );

  const groups: { type: SearchItem["type"]; label: string }[] = [
    { type: "Post", label: "Blog Posts" },
    { type: "Book", label: "Books" },
    { type: "Project", label: "Projects" },
  ];

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title="Search"
      description="Search posts, books, and projects"
    >
      <Command>
        <CommandInput placeholder="Search articles, books, projects…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {groups.map((group) => {
            const groupItems = items.filter((i) => i.type === group.type);
            if (!groupItems.length) return null;
            const Icon = ICONS[group.type];
            return (
              <CommandGroup key={group.type} heading={group.label}>
                {groupItems.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={`${item.title} ${item.description} ${item.category ?? ""}`}
                    onSelect={() => onSelect(item.url)}
                  >
                    <Icon className="text-muted-foreground" />
                    <div className="flex min-w-0 flex-col">
                      <span className="truncate">{item.title}</span>
                      <span className="truncate text-xs text-muted-foreground">
                        {item.description}
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            );
          })}
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
