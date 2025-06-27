import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useSettings } from "../contexts/SettingsContext";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { getWeeklyCostSummary } from "../utils/mockData";

const Settings = () => {
  const {
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
  } = useSettings();

  const [testEmailStatus, setTestEmailStatus] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [weeklyReportStatus, setWeeklyReportStatus] = useState<string | null>(
    null
  );
  const [isSendingWeekly, setIsSendingWeekly] = useState(false);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    document.documentElement.classList.toggle("dark", newDarkMode);
  };

  const handleSaveSettings = () => {
    saveSettings();
    // Show a success message
    console.log("Settings saved successfully!");
  };

  const handleTestEmail = async () => {
    if (!email) {
      setTestEmailStatus("Please enter your email address.");
      return;
    }
    setIsSending(true);
    setTestEmailStatus(null);
    try {
      await emailjs.send(
        "service_j6ujtc9",
        "template_ywfj4zm",
        {
          // name: email,
          email: email,
          // You can add more variables here if your template uses them
        },
        "k7LAFjuYv9J_N50oC"
      );
      setTestEmailStatus("Test email sent to " + email + "!");
    } catch (error) {
      setTestEmailStatus("Failed to send test email. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  const handleSendWeeklyReport = async () => {
    if (!email) {
      setWeeklyReportStatus("Please enter your email address.");
      return;
    }
    setIsSendingWeekly(true);
    setWeeklyReportStatus(null);
    try {
      const weeklySummary = getWeeklyCostSummary();
      console.log("Weekly Summary Data:", weeklySummary);

      // Format service breakdown for email
      const serviceBreakdownHtml = weeklySummary.serviceBreakdown
        .map(
          (service) =>
            `<div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
            <span style="color: #475569;">${service.service}</span>
            <span style="color: #1e293b; font-weight: 600;">$${service.cost.toFixed(
              2
            )} (${service.percentage}%)</span>
          </div>`
        )
        .join("");

      const templateParams = {
        name: email,
        email: email,
        week_period: weeklySummary.weekPeriod,
        total_cost: weeklySummary.totalCost,
        cost_change: weeklySummary.costChange,
        service_breakdown: serviceBreakdownHtml,
        report_date: weeklySummary.reportDate,
      };

      console.log("EmailJS Template Parameters:", templateParams);

      await emailjs.send(
        "service_j6ujtc9",
        "template_bzffia5",
        templateParams,
        "k7LAFjuYv9J_N50oC"
      );
      setWeeklyReportStatus("Weekly report sent to " + email + "!");
    } catch (error) {
      console.error("EmailJS Error:", error);
      if (error.text) {
        console.error("Error details:", error.text);
        setWeeklyReportStatus("Error: " + error.text);
      } else {
        setWeeklyReportStatus(
          "Failed to send weekly report. Please try again."
        );
      }
    } finally {
      setIsSendingWeekly(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Settings
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Customize your dashboard preferences
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Appearance Settings */}
        <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-slate-700 dark:text-slate-300">
                Dark Mode
              </Label>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleDarkMode}
                className={`${isDarkMode ? "bg-blue-600 text-white" : ""}`}
              >
                {isDarkMode ? "Enabled" : "Disabled"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Currency Settings */}
        <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">
              Currency
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-slate-700 dark:text-slate-300">
                Currency Preference
              </Label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="px-3 py-1 text-sm border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="JPY">JPY (¥)</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-slate-700 dark:text-slate-300">
                Email Notifications
              </Label>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setNotifications(!notifications)}
                className={`${notifications ? "bg-green-600 text-white" : ""}`}
              >
                {notifications ? "Enabled" : "Disabled"}
              </Button>
            </div>
            {notifications && (
              <div className="flex flex-col gap-2 mt-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="px-3 py-1 text-sm border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleTestEmail}
                  disabled={isSending}
                >
                  {isSending ? "Sending..." : "Send Test Email"}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleSendWeeklyReport}
                  disabled={isSendingWeekly}
                >
                  {isSendingWeekly ? "Sending..." : "Send Weekly Report"}
                </Button>
                {testEmailStatus && (
                  <span className="text-xs text-blue-600 dark:text-blue-400">
                    {testEmailStatus}
                  </span>
                )}
                {weeklyReportStatus && (
                  <span className="text-xs text-green-600 dark:text-green-400">
                    {weeklyReportStatus}
                  </span>
                )}
              </div>
            )}
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Receive weekly cost summary reports and budget alerts
            </p>
          </CardContent>
        </Card>

        {/* Export Settings */}
        <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">
              Export Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-slate-700 dark:text-slate-300">
                Default Export Format
              </Label>
              <div className="flex space-x-2">
                <Button
                  variant={
                    defaultExportFormat === "csv" ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setDefaultExportFormat("csv")}
                >
                  CSV
                </Button>
                <Button
                  variant={
                    defaultExportFormat === "pdf" ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setDefaultExportFormat("pdf")}
                >
                  PDF
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <div className="flex justify-center">
        <Button
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-8"
          onClick={handleSaveSettings}
        >
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default Settings;
