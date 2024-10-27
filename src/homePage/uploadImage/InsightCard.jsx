import React from "react";
import Card from "react-bootstrap/Card";

import "./UploadImage.css";

export default function InsightCard({
  imgSrc,
  description,
  isSelected,
  onSelect,
}) {
  return (
    <Card
      onClick={onSelect}
      style={{
        width: "280px",
        height: "270px",
        borderRadius: "25px",
        cursor: "pointer",
      }}
      className={`${isSelected ? "card-bg-primary" : ""} text-primary m-2`}
    >
      <Card.Img
        variant="top"
        src={imgSrc}
        style={{ width: "50%" }}
        className="mx-auto mt-4"
      />
      <Card.Body>
        <Card.Text className="fs-5">{description}</Card.Text>
      </Card.Body>
    </Card>
  );
}
