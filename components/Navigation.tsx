"use client";

import { StickyNote, BarChart3 } from "lucide-react";
import { ViewMode } from "@/types";
import Button from "./ui/Button";

interface NavigationProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

const Navigation: React.FC<NavigationProps> = ({
  currentView,
  onViewChange,
}) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <StickyNote className="w-8 h-8 text-blue-600" />
              <h1 className="text-xl font-semibold text-gray-900">{"Notes"}</h1>
            </div>
          </div>

          <nav className="flex items-center space-x-1">
            <Button
              variant={currentView === "list" ? "primary" : "ghost"}
              size="sm"
              onClick={() => onViewChange("list")}
              className="flex items-center space-x-2"
            >
              <StickyNote className="w-4 h-4" />
              <span>{"Notes"}</span>
            </Button>
            <Button
              variant={currentView === "dashboard" ? "primary" : "ghost"}
              size="sm"
              onClick={() => onViewChange("dashboard")}
              className="flex items-center space-x-2"
            >
              <BarChart3 className="w-4 h-4" />
              <span>{"Dashboard"}</span>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
