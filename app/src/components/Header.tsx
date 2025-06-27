import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { Download, Menu, X } from "lucide-react";
import { exportReport } from "../utils/exportUtils";
import { useSettings } from "../contexts/SettingsContext";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { defaultExportFormat } = useSettings();

  const navItems = [
    { path: "/", label: "Dashboard" },
    { path: "/reports", label: "Reports" },
    { path: "/settings", label: "Settings" },
  ];

  const handleExportReport = () => {
    exportReport(defaultExportFormat);
  };

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and App Name */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CC</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                Cloud Cost Dashboard
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Your cloud spend at a glance
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Export CTA and Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <Button
              size="sm"
              className="hidden md:flex bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
              onClick={handleExportReport}
            >
              <Download size={16} className="mr-2" />
              Export Report
            </Button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 dark:text-slate-400"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-slate-200 dark:border-slate-700">
            <nav className="flex flex-col space-y-3 mt-4">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-slate-600 dark:text-slate-400"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <Button
                size="sm"
                className="mt-3 w-full bg-gradient-to-r from-blue-600 to-teal-600"
                onClick={handleExportReport}
              >
                <Download size={16} className="mr-2" />
                Export Report
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
