import React, { useState, useMemo } from "react";
import HealthScoreChart from "./components/HealthScoreChart";
import IssuesBarChart from "./components/IssuesBarChart";
import StatsDisplay from "./components/StatsDisplay";
import DateRangeFilter from "./components/DateRangeFilter";
import "./Dashboard.css";

const mockData = [
  {
    timestamp: "1730238145043",
    healthScore: "90",
    pestPresence: "true",
    diseasePresence: "true",
  },
  {
    timestamp: "1729983673431",
    healthScore: "85",
    pestPresence: "true",
    diseasePresence: "false",
  },
  {
    timestamp: "1729983673231",
    healthScore: "78",
    pestPresence: "false",
    diseasePresence: "true",
  },
  {
    timestamp: "1729983667309",
    healthScore: "88",
    pestPresence: "false",
    diseasePresence: "false",
  },
];

const Dashboard = () => {
  const [startDate, setStartDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return date.toISOString().split("T")[0];
  });

  const [endDate, setEndDate] = useState(() => {
    return new Date().toISOString().split("T")[0];
  });

  const filteredData = useMemo(() => {
    if (!startDate || !endDate) return mockData;

    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();

    return mockData.filter((item) => {
      const timestamp = parseInt(item.timestamp);
      return timestamp >= start && timestamp <= end;
    });
  }, [startDate, endDate]);

  const handleDownload = () => {
    // Create a formatted version of the data with readable dates
    const formattedData = filteredData.map((item) => ({
      ...item,
      date: new Date(parseInt(item.timestamp)).toLocaleString(),
      timestamp: item.timestamp,
    }));

    // Create the JSON file
    const dataStr = JSON.stringify(formattedData, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    // Create download link and trigger download
    const link = document.createElement("a");
    link.href = url;
    link.download = `dashboard-data-${startDate}-to-${endDate}.json`;
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="dashboard-container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <DateRangeFilter
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
        />
        <button
          onClick={handleDownload}
          style={{
            padding: "8px 16px",
            backgroundColor: "#f8f9fa",
            border: "1px solid #dee2e6",
            borderRadius: "4px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download Data
        </button>
      </div>
      <StatsDisplay data={filteredData} />
      <div className="charts-grid">
        <HealthScoreChart data={filteredData} />
        <IssuesBarChart data={filteredData} />
      </div>
    </div>
  );
};

export default Dashboard;
