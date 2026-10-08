"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type ThemeLabels = {
  label: string
  light: string
  dark: string
  system: string
}

type ModeToggleProps = {
  labels: ThemeLabels
}

export function ModeToggle({ labels }: ModeToggleProps) {
  const { setTheme, theme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={labels.label}>
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-[transform,opacity] dark:-rotate-90 dark:scale-0" aria-hidden="true" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-[transform,opacity] dark:rotate-0 dark:scale-100" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")} aria-checked={theme === "light"}>
          {labels.light}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} aria-checked={theme === "dark"}>
          {labels.dark}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} aria-checked={theme === "system"}>
          {labels.system}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
