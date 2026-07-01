"use client";

import { useEffect, useSyncExternalStore } from "react";

function getTheme(): "light" | "dark" {
  if (typeof document === "undefined") return "dark";
  return (
    (document.documentElement.getAttribute("data-theme") as "light" | "dark") ||
    "dark"
  );
}

function subscribe(onStoreChange: () => void) {
  const observer = new MutationObserver(onStoreChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "dark");

  useEffect(() => {
    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    if (stored) {
      document.documentElement.setAttribute("data-theme", stored);
      return;
    }
    const initial = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-theme", next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="h-9 w-9 rounded-full border border-border bg-surface text-sm hover:border-accent/50 transition-colors"
    >
      {theme === "dark" ? "☀" : "☾"}
    </button>
  );
}
