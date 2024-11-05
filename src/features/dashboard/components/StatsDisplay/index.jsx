// src/features/dashboard/components/StatsDisplay/index.jsx
import React from "react";

const StatsDisplay = ({ data = [] }) => {
  if (!data.length) {
    return (
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-title">Current Health</div>
          <div className="stat-value">N/A</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Total Scans</div>
          <div className="stat-value">0</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Average Health</div>
          <div className="stat-value">N/A</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Current Status</div>
          <div className="stat-value">No Data</div>
        </div>
      </div>
    );
  }

  const latestScan = data[0];
  const totalScans = data.length;
  const averageHealth =
    data.reduce((acc, curr) => acc + parseInt(curr.healthScore), 0) /
    totalScans;

  const hasIssues =
    latestScan.pestPresence === "true" || latestScan.diseasePresence === "true";

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-title">Current Health</div>
        <div className="stat-value">{latestScan.healthScore}</div>
      </div>
      <div className="stat-card">
        <div className="stat-title">Total Scans</div>
        <div className="stat-value">{totalScans}</div>
      </div>
      <div className="stat-card">
        <div className="stat-title">Average Health</div>
        <div className="stat-value">{averageHealth.toFixed(1)}</div>
      </div>
      <div className="stat-card">
        <div className="stat-title">Current Status</div>
        <div className="stat-value">
          {hasIssues ? "Issues Detected" : "Healthy"}
        </div>
      </div>
    </div>
  );
};

export default StatsDisplay;
