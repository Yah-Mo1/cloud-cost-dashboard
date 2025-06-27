import React, { createContext, useContext, useState, useEffect } from "react";

interface SettingsContextType {
  currency: string;
  setCurrency: (currency: string) => void;
  defaultExportFormat: "csv" | "pdf";
  setDefaultExportFormat: (format: "csv" | "pdf") => void;
  isDarkMode: boolean;
  setIsDarkMode: (isDark: boolean) => void;
  notifications: boolean;
  setNotifications: (enabled: boolean) => void;
  email: string;
  setEmail: (email: string) => void;
  saveSettings: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export const SettingsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currency, setCurrency] = useState("USD");
  const [defaultExportFormat, setDefaultExportFormat] = useState<"csv" | "pdf">(
    "csv"
  );
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [email, setEmail] = useState("");

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("dashboard-settings");
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setCurrency(settings.currency || "USD");
      setDefaultExportFormat(settings.defaultExportFormat || "csv");
      setIsDarkMode(settings.isDarkMode || false);
      setNotifications(
        settings.notifications !== undefined ? settings.notifications : true
      );
      setEmail(settings.email || "");
      // Apply dark mode to document
      document.documentElement.classList.toggle(
        "dark",
        settings.isDarkMode || false
      );
    }
  }, []);

  // Also update document class when isDarkMode changes
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const saveSettings = () => {
    const settings = {
      currency,
      defaultExportFormat,
      isDarkMode,
      notifications,
      email,
    };
    localStorage.setItem("dashboard-settings", JSON.stringify(settings));
    console.log("Settings saved:", settings);
  };

  return (
    <SettingsContext.Provider
      value={{
        currency,
        setCurrency,
        defaultExportFormat,
        setDefaultExportFormat,
        isDarkMode,
        setIsDarkMode,
        notifications,
        setNotifications,
        email,
        setEmail,
        saveSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
