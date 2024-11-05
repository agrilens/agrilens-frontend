// src/features/dashboard/components/HealthScoreChart/index.jsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const HealthScoreChart = ({ data = [] }) => (
  <div className="chart-container">
    <h3>Health Score Trend</h3>
    <LineChart
      width={800}
      height={300}
      data={data}
      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="timestamp"
        tickFormatter={(ts) => new Date(parseInt(ts)).toLocaleDateString()}
      />
      <YAxis domain={[0, 100]} />
      <Tooltip
        labelFormatter={(ts) => new Date(parseInt(ts)).toLocaleDateString()}
      />
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

export default HealthScoreChart;
