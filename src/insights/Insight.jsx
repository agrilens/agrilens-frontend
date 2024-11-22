import React from "react";
import { Row, Col } from "react-bootstrap";

import "./Insight.css";

const Insight = ({ insight }) => {
  function formatUnixTimestamp(unixTimestamp) {
    // Convert the string timestamp to a number and create a Date object
    const date = new Date(Number(unixTimestamp));

    if (isNaN(date.getTime())) {
      throw new Error("Invalid timestamp format");
    }

    // Extract month, day, and year
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();

    // Extract hours and minutes
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    // Format as MM/DD/YYYY HH:MM
    return `${month}/${day}/${year} ${hours}:${minutes}`;
  }

  return (
    <div>
      <Row className="py-3">
        <Col sm="3" md="4" className="border text-center mb-3">
          <img src={insight?.imgUrl} alt="" className="insight-image " />
        </Col>
        <Col className="insight-table">
          <table className="table">
            <tbody>
              {insight?.plant_id && (
                <tr>
                  <th>Name</th>
                  <td>{insight?.plant_id}</td>
                </tr>
              )}
              {insight?.overall_health_status && (
                <tr>
                  <th>Health Status</th>
                  <td>{insight?.overall_health_status}</td>
                </tr>
              )}
              {insight?.pest_identification !== "None detected" && (
                <tr>
                  <th>Identified Pest</th>
                  <td>{insight?.pest_identification}</td>
                </tr>
              )}
              {insight?.weed_presence !== "None detected" && (
                <tr>
                  <th>Weed Presence</th>
                  <td>{insight?.weed_presence}</td>
                </tr>
              )}
              {insight?.summary !== "None detected" && (
                <tr>
                  <th>Summary</th>
                  <td>{insight?.summary}</td>
                </tr>
              )}
              <tr className="text-end">
                <th className="text-nowrap"></th>
                <td>
                  <span className="fw-bolder">Scan Date: </span>
                  {formatUnixTimestamp(insight?.timestamp)}
                </td>
              </tr>
            </tbody>
          </table>
        </Col>
      </Row>
    </div>
  );
};

export default Insight;
