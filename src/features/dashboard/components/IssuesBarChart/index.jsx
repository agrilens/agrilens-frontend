// src/features/dashboard/components/IssuesBarChart/index.jsx
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const processData = (data) => {
  if (!data.length) return [];

  const total = data.length;
  const pests = data.filter((d) => d.pestPresence === "true").length;
  const diseases = data.filter((d) => d.diseasePresence === "true").length;

  return [
    {
      name: "Pest Detected",
      count: pests,
      percentage: ((pests / total) * 100).toFixed(1),
    },
    {
      name: "Disease Detected",
      count: diseases,
      percentage: ((diseases / total) * 100).toFixed(1),
    },
  ];
};

const IssuesBarChart = ({ data = [] }) => (
  <div className="chart-container">
    <h3>Issue Detection Distribution</h3>
    <BarChart
      width={400}
      height={300}
      data={processData(data)}
      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip formatter={(value) => [`${value}%`, "Occurrence Rate"]} />
      <Bar dataKey="percentage" fill="#ff7c43" />
    </BarChart>
  </div>
);

export default IssuesBarChart;
