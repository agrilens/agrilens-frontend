import React, { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import "./EvaluationCard.css";

const EvaluationCard = ({ evaluation, id, isSelected, onSelect }) => {
  const [slideShow, setSlideShow] = useState("");
  //   window.onload = () => {
  //     setTimeout(() => {
  //       setSlideShow(() => "show");
  //     }, 30); // Delay of 300ms
  //   };

  return (
    <Col
      lg="4"
      md="6"
      id="evaluationCard"
      onClick={onSelect}
      className={`mx-auto ${isSelected ? "selected-evaluation" : ""}`}
    >
      <div className="evaluation-card-tag mx-auto fs-5 fw-bold ">
        Evaluation {id}
      </div>
      <Card className="evaluation-card text-center">
        <Card.Header className="p-4 evaluation-card-header">
          <Card.Title className=" fs-4 display-3 fw-bold text-white">
            Overall Health Status:
          </Card.Title>
          <div className=" fs-1 fw-bolder">Severe Issues {}</div>
        </Card.Header>
        <Card.Body className="evaluation-card-body p-4">
          <Card.Text>
            <ul className="evaluationCard-ul list-unstyled text-white p-3">
              {evaluation?.map((item, i) => (
                <div
                  className="evaluationCard-li-wrapper fs-5 pb-2 mb-2"
                  key={i}
                >
                  <i
                    className={`fa-regular  me-2 fa-circle${item.isValue ? "-check" : ""}`}
                  ></i>
                  <li className="evaluationCard-li ">{item.label}</li>
                </div>
              ))}
            </ul>
          </Card.Text>
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
