import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";

import HealthScoreChart from "./components/HealthScoreChart";
import IssuesBarChart from "./components/IssuesBarChart";
import StatsDisplay from "./components/StatsDisplay";
import DateRangeFilter from "./components/DateRangeFilter";
import NoAccountError from "../common/NoAccountError";

import "./Dashboard.css";

import { useAccountContext } from "../contexts/AccountContext";

const url = process.env.REACT_APP_BACKEND_API_URL;

const Dashboard = () => {
  const [userScanHistory, setUserScanHistory] = useState([]);
  const [startDate, setStartDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return date.toISOString().split("T")[0];
  });
  const { userID, userToken } = useAccountContext();

  useEffect(() => {
    if (userID && userToken) {
      getUserScanHistory();
    }
    // eslint-disable-next-line
  }, []);

  const getUserScanHistory = async () => {
    try {
      const uplaodHeaders = {
        headers: {
          Authorization: `Bearer ${userToken}`,
          userID: userID,
        },
      };

      const response = await axios.get(
        `${url}/users/scan-history`,
        uplaodHeaders
      );

      const scans = response?.data?.scans || [];
      const formattedScans = restructureScans(scans);

      setUserScanHistory(formattedScans);

      return formattedScans;
    } catch (err) {
      console.error("fetchData() Error:", err);
    } finally {
    }
  };

  const restructureScans = (scans) => {
    return scans.map((scan) => {
      const getEvaluation = (evaluationObj) => {
        if (!evaluationObj) return null;
        const key = Object.keys(evaluationObj)[0];
        return evaluationObj[key] || null;
      };

      const evaluation =
        getEvaluation(scan.selectedEvaluation) ||
        getEvaluation(scan.defaultEvaluation) ||
        {};

      return {
        id: scan.id,
        timestamp: scan.timestamp,
        imgUrl: scan.imageUrl,
        plant_id: evaluation?.plant_id || null,
        overall_health_status: evaluation?.overall_health_status || null,
        health_score: evaluation?.health_score || null,
        pest_identification: evaluation?.pest_identification || null,
        disease_identification: evaluation?.disease_identification || null,
        weed_presence: evaluation?.weed_presence || null,
        recommendations: evaluation?.recommendations || [],
        summary: evaluation?.summary || null,
      };
    });
  };

  const [endDate, setEndDate] = useState(() => {
    return new Date().toISOString().split("T")[0];
  });

  const filteredData = useMemo(() => {
    if (!startDate || !endDate) return userScanHistory;

    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();

    return userScanHistory.filter((item) => {
      const timestamp = parseInt(item.timestamp);
      return timestamp >= start && timestamp <= end;
    });
  }, [startDate, endDate, userScanHistory]);

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
          className="download-btn fw-bold px-3 text-primary"
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
      <NoAccountError />
    </div>
  );
};

export default Dashboard;
