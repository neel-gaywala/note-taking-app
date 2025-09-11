"use client";

import { StickyNote, BarChart3 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "./ui/Button";

const Navigation: React.FC = () => {
  const pathname = usePathname();
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <StickyNote className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{"Notes"}</h1>
            </div>
          </div>

          <nav className="flex items-center space-x-1">
            <Link href="/">
              <Button
                variant={pathname === "/" ? "primary" : "ghost"}
                size="sm"
                className="flex items-center space-x-2"
              >
                <StickyNote className="w-4 h-4" />
                <span>{"Notes"}</span>
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button
                variant={pathname === "/dashboard" ? "primary" : "ghost"}
                size="sm"
                className="flex items-center space-x-2"
              >
                <BarChart3 className="w-4 h-4" />
                <span>{"Dashboard"}</span>
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
