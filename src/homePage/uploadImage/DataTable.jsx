import React, { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import PropTypes from "prop-types";
import "./DataTable.css";

const DataTable = ({ data, id }) => {
  const score = data?.health_score;
  /* Healthy >= 98 | 98 < Mild Issues >= 80 | 80 < Moderate Issues >= 50 |Severe Issues < 50 */

  // const statusColor =
  //   score >= 98
  //     ? "success"
  //     : score >= 80
  //       ? " mild-success"
  //       : score >= 50
  //         ? "warning"
  //         : "danger";

  return (
    <Col lg="4" md="6" id="dataTableCard" className={`mx-auto mb-2`}>
      <div className="dataTable-card-tag mx-auto fs-5 fw-bold ">
        Evaluation {id}
      </div>
      <Card className="dataTable-card ">
        <Card.Header className="p-4  dataTable-card-header d-flex">
          <Card.Title className="fs-4 ps-2 display-3 fw-bold text-white align-left">
            Overall Health Status:
          </Card.Title>
          <div className="fs-1 ps-2 fw-bolder align-left">Severe Issues {}</div>
        </Card.Header>
        <Card.Body className="dataTable-card-body p-4">
          <Card.Text>
            <ul className="dataTableCard-ul list-unstyled text-white p-3 ps-5">
              {data?.map((item, i) => (
                <div
                  className="dataTableCard-li-wrapper fs-5 pb-2 mb-2"
                  key={i}
                >
                  <i
                    className={`fa-regular  me-2 fa-circle${item.isValue ? "-check" : ""}`}
                  ></i>
                  <li className="dataTableCard-li ">{item.label}</li>
                </div>
              ))}
            </ul>
          </Card.Text>
          <Button variant={`my-1 dataTableCard-card-btn `}>Save Result</Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

// DataTable.propTypes = {
//   data: PropTypes.shape({
//     overall_health_status: PropTypes.string,
//     health_score: PropTypes.number,
//     pest_identification: PropTypes.string,
//     disease_identification: PropTypes.string,
//     weed_presence: PropTypes.string,
//     recommendations: PropTypes.arrayOf(PropTypes.string),
//   }).isRequired,
// };

export default DataTable;
