import React, { useState, useEffect } from "react";
import axios from "axios";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

import LoadingSpinner from "../../common/LoadingSpinner";

import InsightCard from "./InsightCard";
import emptyFileImage from "../../assets/images/emptyFileImage.png";
import identifySpecies from "../../assets/images/IdentifySpecies.png";
import overallHealth from "../../assets/images/overallHealth.png";
import pestDiagnosis from "../../assets/images/pestDiagnosis.png";
import sustainablePractices from "../../assets/images/sustainablePractices.png";
import "./UploadImage.css";

export default function UploadImage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedInsightIds, setSelectedInsightIds] = useState([]);
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const url = "";

  const headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${"token"}`,
    },
  };

  const handleImageChange = (event) => {
    const file = event?.target?.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader?.result);
      reader.readAsDataURL(file);
    }
  };

  const toggleInsightSelection = (id) => {
    setSelectedInsightIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const fetchData = async (url, data, header) => {
    try {
      const response = await axios.post(url, data, header);
      setResponse(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  const handleGetInsight = () => {
    if (selectedImage === null) {
      console.log("Please select a valid image.");
    } else {
      if (selectedInsightIds?.length === 0) {
        console.log("Please select at least one insight.");
      } else {
        const formData = new FormData();
        formData.append("image", selectedImage);

        const inputData = {
          imgData: formData,
          insights: selectedInsightIds,
        };

        // setLoading(true);
        // fetchData(url, inputData, headers);

        console.log("Selected Insights:", selectedInsightIds);
      }
    }
  };

  return (
    <div>
      <Container id="uploadImage">
        <Row className="text-primary py-5">
          {loading && <LoadingSpinner />}
          <Col md="5">
            <h2 className="display-5 fw-bold">Upload A Photo</h2>
            <p className="py-1">
              Upload a photo of your crop to get a diagnosis and learn
              sustainable practices.
            </p>
            <Image
              src={selectedImage == null ? emptyFileImage : selectedImage}
              className="mb-4 d-block m-auto"
              style={{ maxWidth: "419px", width: "100%", radius: "20px" }}
              rounded
            />

            <input
              type="file"
              name="image-upload"
              id="input"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            <div>
              <label
                htmlFor="input"
                className="image-upload"
                style={{
                  width: "100%",
                  marginTop: "1rem",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div className="text-primary upload-btn ">
                  {selectedImage == null ? "Upload Image" : "Re-Upload"}
                </div>
              </label>
            </div>
          </Col>
          <Col md="7">
            <h2 className="display-5 fw-bold">Select Your Analysis </h2>
            <p>
              Choose which analysis you’d like to perform or click “All
              Insights” to see all
            </p>

            <div className="mb-4 insight-cards">
              <div className="d-flex justify-content-center">
                <InsightCard
                  imgSrc={identifySpecies}
                  description={"Identify Unknown Species"}
                  isSelected={selectedInsightIds.includes("identifySpecies")}
                  onSelect={() => toggleInsightSelection("identifySpecies")}
                />
                <InsightCard
                  imgSrc={overallHealth}
                  description={"Overall Health Score"}
                  isSelected={selectedInsightIds.includes("overallHealth")}
                  onSelect={() => toggleInsightSelection("overallHealth")}
                />
              </div>
              <div className="d-flex justify-content-center">
                <InsightCard
                  imgSrc={pestDiagnosis}
                  description={"Pest/Disease Diagnosis"}
                  isSelected={selectedInsightIds.includes("pestDiagnosis")}
                  onSelect={() => toggleInsightSelection("pestDiagnosis")}
                />
                <InsightCard
                  imgSrc={sustainablePractices}
                  description={"Sustainable Practices"}
                  isSelected={selectedInsightIds.includes(
                    "sustainablePractices"
                  )}
                  onSelect={() =>
                    toggleInsightSelection("sustainablePractices")
                  }
                />
              </div>
            </div>
            <Button
              onClick={() => handleGetInsight(selectedInsightIds)}
              type="button"
              variant="primary"
              size="lg"
            >
              Get
              {(selectedInsightIds.length === 0 ||
                selectedInsightIds.length === 4) &&
                " All "}
              Insights
            </Button>
          </Col>
        </Row>
        {/* <Row>
          <Col>1 of 3</Col>
          <Col>2 of 3</Col>
          <Col>3 of 3</Col>
        </Row> */}
      </Container>
    </div>
  );
}
