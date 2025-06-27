import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { exportReport } from "../utils/exportUtils";

interface ExportButtonProps {
  data: any[];
  filename: string;
  type: "csv" | "pdf";
}

const ExportButton = ({ data, filename, type }: ExportButtonProps) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      // Use the new export utility for consistent formatting
      exportReport(type);
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      onClick={handleExport}
      disabled={isExporting}
      variant="outline"
      size="sm"
      className="flex items-center space-x-2"
    >
      <Download size={16} />
      <span>
        {isExporting ? "Exporting..." : `Export ${type.toUpperCase()}`}
      </span>
    </Button>
  );
};

export default ExportButton;
