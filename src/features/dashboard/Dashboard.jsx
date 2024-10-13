/* Using API calls */
// import React, { useState, useEffect } from 'react';
// import BarChart from './components/BarChart/BarChart';
// import PieChart from './components/PieChart/PieChart';
// import HeatMap from './components/HeatMap/HeatMap';
// import GeoMap from './components/GeoMap/GeoMap';
// import { fetchAnalysesData } from './api/analysesApi';
// import './Dashboard.css';
//
// const Dashboard = () => {
//   const [analysesData, setAnalysesData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//
//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         setLoading(true);
//         const data = await fetchAnalysesData();
//         setAnalysesData(data);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to load dashboard data');
//         setLoading(false);
//       }
//     };
//
//     loadData();
//   }, []);
//
//   if (loading) {
//     return <div className="dashboard-loading">Loading dashboard data...</div>;
//   }
//
//   if (error) {
//     return <div className="dashboard-error">{error}</div>;
//   }
//
//   if (!analysesData) {
//     return <div className="dashboard-no-data">No data available</div>;
//   }
//
//   return (
//     <div className="dashboard">
//       <h1 className="dashboard-title">Plant Health Dashboard</h1>
//       <div className="dashboard-grid">
//         <div className="dashboard-item">
//           <BarChart
//             data={analysesData.healthScores}
//             title="Average Health Scores"
//           />
//         </div>
//         <div className="dashboard-item">
//           <PieChart
//             data={analysesData.healthDistribution}
//             title="Health Distribution"
//           />
//         </div>
//         <div className="dashboard-item">
//           <HeatMap
//             data={analysesData.heatMapData}
//             title="Health Heatmap"
//           />
//         </div>
//         <div className="dashboard-item">
//           <GeoMap
//             data={analysesData.geoData}
//             title="Geographical Distribution"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export default Dashboard;

/* Using fake data */
import React from "react";
import BarChart from "./components/BarChart/BarChart";
import HeatMap from "./components/HeatMap/HeatMap";
import GeoMap from "./components/GeoMap/GeoMap";
import "./Dashboard.css";

const Dashboard = () => {
  // Fake data for BarChart
  const healthScores = [
    { label: "Wheat", value: 85 },
    { label: "Corn", value: 72 },
    { label: "Soybeans", value: 93 },
    { label: "Rice", value: 78 },
    { label: "Barley", value: 88 },
  ];

  // Fake data for HeatMap
  const heatMapData = [
    { x: "Field A", y: "Week 1", value: 80 },
    { x: "Field A", y: "Week 2", value: 85 },
    { x: "Field A", y: "Week 3", value: 90 },
    { x: "Field B", y: "Week 1", value: 70 },
    { x: "Field B", y: "Week 2", value: 75 },
    { x: "Field B", y: "Week 3", value: 72 },
    { x: "Field C", y: "Week 1", value: 90 },
    { x: "Field C", y: "Week 2", value: 88 },
    { x: "Field C", y: "Week 3", value: 92 },
  ];

  // Fake data for GeoMap
  const geoData = [
    { lat: 51.505, lng: -0.09, name: "London Field", healthScore: 85 },
    { lat: 48.8566, lng: 2.3522, name: "Paris Field", healthScore: 78 },
    { lat: 40.7128, lng: -74.006, name: "New York Field", healthScore: 92 },
    { lat: 35.6762, lng: 139.6503, name: "Tokyo Field", healthScore: 88 },
    { lat: -33.8688, lng: 151.2093, name: "Sydney Field", healthScore: 76 },
  ];

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Plant Health Dashboard</h1>
      <div className="dashboard-grid">
        <div className="dashboard-item">
          <BarChart data={healthScores} title="Average Health Scores by Crop" />
        </div>
        <div className="dashboard-item">
          <HeatMap data={heatMapData} title="Weekly Health Heatmap by Field" />
        </div>
        <div className="dashboard-item">
          <GeoMap data={geoData} title="Geographical Health Distribution" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
