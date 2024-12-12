"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import {
  DropdownMenuItem,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";

export default function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenuSubContent>
      <DropdownMenuItem onClick={() => setTheme("light")}>
        <Sun className="size-5" /> Light
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme("dark")}>
        <Moon className="size-5" />
        Dark
      </DropdownMenuItem>
    </DropdownMenuSubContent>
  );
}
