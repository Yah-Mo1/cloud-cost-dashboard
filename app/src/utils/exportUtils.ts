import {
  mockCostData,
  serviceBreakdown,
  monthlyTrend,
  costSummary,
} from "./mockData";

export const exportReport = (format: "csv" | "pdf" = "csv") => {
  console.log("Exporting comprehensive report as", format);

  if (format === "csv") {
    exportAsCSV();
  } else {
    exportAsPDF();
  }
};

const exportAsCSV = () => {
  const reportDate = new Date().toLocaleDateString();

  // Create separate CSV sections for better organization
  const sections = [
    {
      title: "COST SUMMARY",
      data: [
        {
          "Report Date": reportDate,
          "Total Cost This Month": `$${costSummary.totalCostThisMonth.toLocaleString()}`,
          "Percentage Change": `${costSummary.percentageChange}%`,
          "Top Service": costSummary.topService,
          "Top Service Cost": `$${costSummary.topServiceCost.toLocaleString()}`,
        },
      ],
    },
    {
      title: "SERVICE BREAKDOWN",
      data: serviceBreakdown.map((item) => ({
        Service: item.service,
        Cost: `$${item.cost.toLocaleString()}`,
        Percentage: `${item.percentage}%`,
      })),
    },
    {
      title: "MONTHLY TREND (Last 12 Months)",
      data: monthlyTrend.slice(-12).map((item) => ({
        Month: item.month,
        Cost: `$${item.cost.toLocaleString()}`,
      })),
    },
    {
      title: "RECENT COST ENTRIES (Last 30)",
      data: mockCostData.slice(-30).map((item) => ({
        Date: new Date(item.date).toLocaleDateString(),
        Service: item.service,
        Region: item.region,
        Cost: `$${item.cost.toLocaleString()}`,
      })),
    },
  ];

  // Combine all sections into one CSV
  let csvContent = "";

  sections.forEach((section, index) => {
    if (index > 0) csvContent += "\n\n";
    csvContent += `# ${section.title}\n`;

    if (section.data.length > 0) {
      const headers = Object.keys(section.data[0]);
      csvContent += headers.join(",") + "\n";

      section.data.forEach((row) => {
        const values = headers.map((header) => {
          const value = row[header];
          // Escape commas and quotes in CSV values
          if (
            typeof value === "string" &&
            (value.includes(",") || value.includes('"'))
          ) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        });
        csvContent += values.join(",") + "\n";
      });
    }
  });

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `cloud-cost-report-${
    new Date().toISOString().split("T")[0]
  }.csv`;
  link.click();
  window.URL.revokeObjectURL(url);
};

const exportAsPDF = () => {
  const printWindow = window.open("", "_blank");
  if (printWindow) {
    const reportDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();

    // Get the last 12 months for the chart
    const chartData = monthlyTrend.slice(-12);
    const maxCost = Math.max(...chartData.map((item) => item.cost));
    const minCost = Math.min(...chartData.map((item) => item.cost));
    const costRange = maxCost - minCost;

    printWindow.document.write(`
      <html>
        <head>
          <title>Cloud Cost Report - ${reportDate}</title>
          <style>
            @media print {
              body { margin: 0; }
              .page-break { page-break-before: always; }
            }
            
            body { 
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
              margin: 20px; 
              line-height: 1.6;
              color: #333;
            }
            
            .header {
              text-align: center;
              border-bottom: 3px solid #1e40af;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            
            .header h1 { 
              color: #1e40af; 
              margin: 0;
              font-size: 2.5em;
              font-weight: 300;
            }
            
            .header p {
              color: #6b7280;
              margin: 5px 0 0 0;
              font-size: 1.1em;
            }
            
            .summary-card {
              background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
              border: 1px solid #bae6fd;
              border-radius: 12px;
              padding: 25px;
              margin: 30px 0;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            }
            
            .summary-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
              gap: 20px;
              margin-top: 20px;
            }
            
            .summary-item {
              text-align: center;
              padding: 15px;
              background: white;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            
            .summary-item h3 {
              margin: 0 0 10px 0;
              color: #374151;
              font-size: 0.9em;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            
            .summary-item .value {
              font-size: 1.8em;
              font-weight: bold;
              color: #059669;
            }
            
            .summary-item .subtitle {
              font-size: 0.9em;
              color: #6b7280;
              margin-top: 5px;
            }
            
            h2 { 
              color: #1e40af; 
              margin: 40px 0 20px 0;
              font-size: 1.5em;
              border-bottom: 2px solid #e5e7eb;
              padding-bottom: 10px;
            }
            
            table { 
              width: 100%; 
              border-collapse: collapse; 
              margin: 20px 0;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              border-radius: 8px;
              overflow: hidden;
            }
            
            th, td { 
              padding: 12px 15px; 
              text-align: left; 
              border-bottom: 1px solid #e5e7eb;
            }
            
            th { 
              background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
              color: white;
              font-weight: 600;
              text-transform: uppercase;
              font-size: 0.85em;
              letter-spacing: 0.5px;
            }
            
            tr:nth-child(even) {
              background-color: #f9fafb;
            }
            
            tr:hover {
              background-color: #f3f4f6;
            }
            
            .cost { 
              font-weight: bold; 
              color: #059669; 
            }
            
            .percentage {
              color: #6b7280;
              font-size: 0.9em;
            }
            
            .service-name {
              font-weight: 600;
              color: #374151;
            }
            
            .footer {
              margin-top: 50px;
              padding-top: 20px;
              border-top: 1px solid #e5e7eb;
              text-align: center;
              color: #6b7280;
              font-size: 0.9em;
            }
            
            .chart-container {
              background: white;
              border: 1px solid #e5e7eb;
              border-radius: 12px;
              padding: 25px;
              margin: 20px 0;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            
            .chart-title {
              text-align: center;
              color: #1e40af;
              font-size: 1.2em;
              font-weight: 600;
              margin-bottom: 20px;
            }
            
            .chart {
              display: flex;
              align-items: end;
              justify-content: space-between;
              height: 200px;
              margin: 20px 0;
              padding: 20px 0;
              border-bottom: 2px solid #e5e7eb;
              position: relative;
            }
            
            .chart-bar {
              flex: 1;
              margin: 0 2px;
              background: linear-gradient(180deg, #3b82f6 0%, #1e40af 100%);
              border-radius: 4px 4px 0 0;
              position: relative;
              min-width: 20px;
            }
            
            .chart-bar:hover {
              background: linear-gradient(180deg, #1e40af 0%, #1e3a8a 100%);
            }
            
            .chart-labels {
              display: flex;
              justify-content: space-between;
              margin-top: 10px;
              font-size: 0.8em;
              color: #6b7280;
            }
            
            .chart-label {
              text-align: center;
              transform: rotate(-45deg);
              transform-origin: top left;
              white-space: nowrap;
              max-width: 60px;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            
            .chart-value {
              position: absolute;
              top: -25px;
              left: 50%;
              transform: translateX(-50%);
              background: #1e40af;
              color: white;
              padding: 2px 6px;
              border-radius: 4px;
              font-size: 0.7em;
              font-weight: 600;
              white-space: nowrap;
            }
            
            .chart-stats {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 15px;
              margin-top: 20px;
              text-align: center;
            }
            
            .chart-stat {
              padding: 10px;
              background: #f8fafc;
              border-radius: 8px;
              border: 1px solid #e2e8f0;
            }
            
            .chart-stat-value {
              font-size: 1.2em;
              font-weight: bold;
              color: #1e40af;
            }
            
            .chart-stat-label {
              font-size: 0.8em;
              color: #6b7280;
              margin-top: 5px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Cloud Cost Report</h1>
            <p>Comprehensive analysis of your cloud infrastructure spending</p>
            <p><strong>Generated:</strong> ${reportDate} at ${currentTime}</p>
          </div>
          
          <div class="summary-card">
            <h2 style="margin-top: 0; border: none; color: #1e40af;">Executive Summary</h2>
            <div class="summary-grid">
              <div class="summary-item">
                <h3>Total Monthly Cost</h3>
                <div class="value">$${costSummary.totalCostThisMonth.toLocaleString()}</div>
                <div class="subtitle">Current month spending</div>
              </div>
              <div class="summary-item">
                <h3>Cost Change</h3>
                <div class="value" style="color: ${
                  costSummary.percentageChange >= 0 ? "#dc2626" : "#059669"
                }">
                  ${costSummary.percentageChange >= 0 ? "+" : ""}${
      costSummary.percentageChange
    }%
                </div>
                <div class="subtitle">vs previous month</div>
              </div>
              <div class="summary-item">
                <h3>Top Service</h3>
                <div class="value" style="color: #1e40af">${
                  costSummary.topService
                }</div>
                <div class="subtitle">$${costSummary.topServiceCost.toLocaleString()}</div>
              </div>
              <div class="summary-item">
                <h3>Active Services</h3>
                <div class="value" style="color: #7c3aed">${
                  serviceBreakdown.length
                }</div>
                <div class="subtitle">Different services used</div>
              </div>
            </div>
          </div>

          <h2>Service Cost Breakdown</h2>
          <table>
            <thead>
              <tr>
                <th>Service</th>
                <th>Cost</th>
                <th>Percentage</th>
                <th>Trend</th>
              </tr>
            </thead>
            <tbody>
              ${serviceBreakdown
                .map(
                  (item, index) => `
                <tr>
                  <td class="service-name">${item.service}</td>
                  <td class="cost">$${item.cost.toLocaleString()}</td>
                  <td class="percentage">${item.percentage}%</td>
                  <td>
                    <div style="width: 100px; height: 8px; background: #e5e7eb; border-radius: 4px; overflow: hidden;">
                      <div style="width: ${
                        item.percentage
                      }%; height: 100%; background: linear-gradient(90deg, #3b82f6, #1e40af);"></div>
                    </div>
                  </td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>

          <h2>Monthly Spending Trend</h2>
          <div class="chart-container">
            <div class="chart-title">Monthly Cost Trend (Last 12 Months)</div>
            <div class="chart">
              ${chartData
                .map((item, index) => {
                  const height =
                    costRange > 0
                      ? ((item.cost - minCost) / costRange) * 100
                      : 50;
                  return `
                      <div class="chart-bar" style="height: ${height}%;">
                        <div class="chart-value">$${(item.cost / 1000).toFixed(
                          1
                        )}k</div>
                      </div>
                    `;
                })
                .join("")}
            </div>
            <div class="chart-labels">
              ${chartData
                .map(
                  (item) => `
                    <div class="chart-label">${item.month}</div>
                  `
                )
                .join("")}
            </div>
            <div class="chart-stats">
              <div class="chart-stat">
                <div class="chart-stat-value">$${maxCost.toLocaleString()}</div>
                <div class="chart-stat-label">Highest Month</div>
              </div>
              <div class="chart-stat">
                <div class="chart-stat-value">$${minCost.toLocaleString()}</div>
                <div class="chart-stat-label">Lowest Month</div>
              </div>
              <div class="chart-stat">
                <div class="chart-stat-value">$${(
                  chartData.reduce((sum, item) => sum + item.cost, 0) /
                  chartData.length
                ).toLocaleString()}</div>
                <div class="chart-stat-label">Average Monthly</div>
              </div>
            </div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>Month</th>
                <th>Cost</th>
                <th>Change</th>
              </tr>
            </thead>
            <tbody>
              ${monthlyTrend
                .slice(-12)
                .map((item, index, array) => {
                  const prevCost =
                    index > 0 ? array[index - 1].cost : item.cost;
                  const change = item.cost - prevCost;
                  const changePercent =
                    prevCost > 0 ? ((change / prevCost) * 100).toFixed(1) : 0;
                  return `
                      <tr>
                        <td class="service-name">${item.month}</td>
                        <td class="cost">$${item.cost.toLocaleString()}</td>
                        <td style="color: ${
                          change >= 0 ? "#dc2626" : "#059669"
                        }">
                          ${change >= 0 ? "+" : ""}${changePercent}%
                        </td>
                      </tr>
                    `;
                })
                .join("")}
            </tbody>
          </table>

          <h2>Recent Cost Entries</h2>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Service</th>
                <th>Region</th>
                <th>Cost</th>
              </tr>
            </thead>
            <tbody>
              ${mockCostData
                .slice(-20)
                .map(
                  (item) => `
                <tr>
                  <td>${new Date(item.date).toLocaleDateString()}</td>
                  <td class="service-name">${item.service}</td>
                  <td>${item.region}</td>
                  <td class="cost">$${item.cost.toLocaleString()}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>

          <div class="footer">
            <p>This report was generated automatically by Cloud Cost Dashboard</p>
            <p>For questions or support, please contact your cloud administrator</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();

    // Wait a moment for the content to load, then print
    setTimeout(() => {
      printWindow.print();
    }, 500);
  }
};
