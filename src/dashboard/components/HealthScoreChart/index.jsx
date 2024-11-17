// src/features/dashboard/components/HealthScoreChart/index.jsx
import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const HealthScoreChart = ({ data = [] }) => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [lineChartWidth, setLineChartWidth] = useState(windowSize * 0.8);
  useEffect(() => {
    // Function to update the window size in state
    if (window.innerWidth >= 1020) {
      setLineChartWidth(windowSize * 0.5);
    }
    if (window.innerWidth >= 1250) {
      setLineChartWidth(windowSize * 0.6);
    }
    setWindowSize(window.innerWidth);
    // eslint-disable-next-line
  }, [lineChartWidth]);

  // Transform and filter data
  const transformedData = data
    .map((item) => ({
      timestamp: parseInt(item.timestamp), // Ensure numeric timestamp
      healthScore: item.health_score, // Map to camelCase
    }))
    .filter((item) => item.timestamp && item.healthScore !== null); // Filter invalid records

  return (
    <div className="chart-container">
      <h3>Health Score Trend</h3>
      <LineChart
        width={lineChartWidth}
        height={300}
        data={transformedData}
        margin={{ top: 20, right: 10, left: 0, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="timestamp"
          tickFormatter={(ts) => new Date(ts).toLocaleDateString()}
        />
        <YAxis domain={[0, 100]} />
        <Tooltip labelFormatter={(ts) => new Date(ts).toLocaleDateString()} />
        <Line
          type="monotone"
          dataKey="healthScore"
          stroke="#34757a"
          strokeWidth={2}
          dot={{ r: 4 }}
        />
      </LineChart>
    </div>
  );
};

export default HealthScoreChart;
