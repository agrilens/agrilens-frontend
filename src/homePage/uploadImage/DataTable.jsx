import React from "react";
import PropTypes from "prop-types";
import "./UploadImage.css";

const DataTable = ({ data }) => {
  const score = data?.health_score;
  /* Healthy >= 98 | 98 < Mild Issues >= 80 | 80 < Moderate Issues >= 50 |Severe Issues < 50 */

  const statusColor =
    score >= 98
      ? "success"
      : score >= 80
        ? " mild-success"
        : score >= 50
          ? "warning"
          : "danger";

  return (
    <table id="dataTable">
      <tbody id="dataTable-body">
        <tr className="dataTable-row">
          <th>Overall Health Status</th>
          <td className={`fs-4 fw-bold text-${statusColor}`}>
            {data?.overall_health_status}
          </td>
        </tr>
        <tr className="dataTable-row">
          <th>Health Score</th>
          <td>{data?.health_score}</td>
        </tr>
        <tr className="dataTable-row">
          <th>Pest Identification</th>
          <td>{data?.pest_identification}</td>
        </tr>
        <tr className="dataTable-row">
          <th>Disease Identification</th>
          <td>{data?.disease_identification}</td>
        </tr>
        <tr className="dataTable-row">
          <th>Weed Presence</th>
          <td>{data?.weed_presence}</td>
        </tr>
        <tr className="dataTable-row">
          <th>Recommendations</th>
          <td>
            <ul className="dataTable-ul">
              {data?.recommendations.map((rec, i) => (
                <li className="dataTable-li" key={i}>
                  {rec}
                </li>
              ))}
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

DataTable.propTypes = {
  data: PropTypes.shape({
    overall_health_status: PropTypes.string,
    health_score: PropTypes.number,
    pest_identification: PropTypes.string,
    disease_identification: PropTypes.string,
    weed_presence: PropTypes.string,
    recommendations: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default DataTable;
