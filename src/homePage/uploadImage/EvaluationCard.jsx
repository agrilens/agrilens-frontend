import React, { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import "./EvaluationCard.css";

import {
  useAccountContext,
  useAccountUpdateContext,
} from "../../contexts/AccountContext";

const EvaluationCard = ({ evaluation, id, isSelected, onSelect }) => {
  const { userLastScanSummary } = useAccountContext();
  const { updateUserLastScanSummary } = useAccountUpdateContext();

  useEffect(() => {
    updateUserLastScanSummary(
      "\n list of unselected evaluations:" +
        userLastScanSummary +
        "\n" +
        evaluation?.summary
    );
    // eslint-disable-next-line
  }, [evaluation]);

  const score = evaluation?.health_score;
  /* Healthy >= 98 | 98 < Mild Issues >= 80 | 80 < Moderate Issues >= 50 |Severe Issues < 50 */

  const statusColor =
    score >= 98
      ? "success"
      : score >= 80
        ? " mild-success"
        : score >= 50
          ? "warning"
          : "danger";

  const evaluationFrame = [
    {
      label: "Identification",
      value: evaluation?.plant_id,
      isValue: evaluation?.plant_id !== "None detected" ? true : false,
    },
    {
      label: "Health Status",
      value: evaluation?.overall_health_status,
      isValue: evaluation?.overall_health_status ? true : false,
    },
    {
      label: "Health Score",
      value: evaluation?.health_score,
      isValue: evaluation?.health_score ? true : false,
    },

    {
      label: "Pest Detected",
      value: evaluation?.pest_identification,
      isValue:
        evaluation?.pest_identification !== "None detected" ? true : false,
    },
    {
      label: "Disease Detected",
      value: evaluation?.disease_identification,
      isValue:
        evaluation?.disease_identification !== "None detected" ? true : false,
    },
    {
      label: "Weed Presence",
      value: evaluation?.weed_presence,
      isValue: evaluation?.weed_presence !== "None detected" ? true : false,
    },
    {
      label: "Sustainable Practice Suggestion",
      value: evaluation?.recommendations,
      isValue: evaluation?.recommendations?.length !== 0 ? true : false,
    },
  ];

  return (
    <Col
      lg="4"
      md="6"
      id="evaluationCard"
      onClick={onSelect}
      className={`mx-auto ${isSelected ? "selected-evaluation" : ""} mt-5`}
    >
      <div className="evaluation-card-tag mx-auto fs-5 fw-bold ">
        {id} Evaluation
      </div>
      <Card className="evaluation-card text-center">
        <Card.Header className="p-4 evaluation-card-header">
          <Card.Title className=" fs-4 display-3 fw-bold text-white">
            Overall Health Status:
          </Card.Title>
          <div
            className={`evaluation-status fs-1 fw-bold tex-${statusColor} shadow-lg`}
          >
            {evaluation?.overall_health_status}
          </div>
        </Card.Header>
        <Card.Body className="evaluation-card-body p-4">
          <div>
            <ul className="evaluationCard-ul list-unstyled text-white p-3">
              {evaluationFrame?.map((item, i) => (
                <div
                  className="evaluationCard-li-wrapper fs-5 pb-2 mb-2"
                  key={i}
                >
                  <i
                    className={`fa-regular  me-2 fa-circle${item.isValue ? "-check" : "-xmark"}`}
                  ></i>
                  <li className="evaluationCard-li ">{item.label}</li>
                </div>
              ))}
            </ul>
          </div>
          <Button
            variant={`my-1 evaluationCard-card-btn ${isSelected ? "selected-evaluation-btn" : ""}`}
          >
            Expand This Evaluation
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default EvaluationCard;
