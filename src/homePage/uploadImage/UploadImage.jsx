import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import FormData from "form-data";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

import DataTable from "./DataTable";
import EvaluationCard from "./EvaluationCard";
import LoadingSpinner from "../../common/LoadingSpinner";

import InsightCard from "./InsightCard";
import emptyFileImage from "../../assets/images/emptyFileImage.png";
import identifySpecies from "../../assets/images/IdentifySpecies.png";
import overallHealth from "../../assets/images/overallHealth.png";
import pestDiagnosis from "../../assets/images/pestDiagnosis.png";
import sustainablePractices from "../../assets/images/sustainablePractices.png";
import "./UploadImage.css";

import {
  useAccountContext,
  useAccountUpdateContext,
} from "../../contexts/AccountContext";

export default function UploadImage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedInsightIds, setSelectedInsightIds] = useState([]);
  const [selectedEvaluation, setselectedEvaluation] = useState("");
  const [file, setFile] = useState();
  const [insightResponse, setInsightResponse] = useState([]);
  const [analysisResults, setAnalysisResults] = useState([]);
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  const { userLastScanSummary } = useAccountContext();
  const { updateUserLastScanSummary } = useAccountUpdateContext();

  const imageUploadUrl = "/analyze";
  const imageUploadUrlLocal =
    "http://127.0.0.1:5001/agrilens-web/us-central1/app/analyze";
  const uplaodHeaders = {
    headers: {
      // Authorization: `Bearer ${"token"}`,
      "Content-Type": "multipart/form-data",
    },
  };

  useEffect(() => {}, [setStatus]);

  const handleImageChange = (event) => {
    const file = event?.target?.files[0];
    if (file) {
      setFile(() => file);
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
  const toggleEvaluateSelection = (id) => {
    setselectedEvaluation(() => id);
  };

  const fetchData = async (url, data, headers = {}) => {
    try {
      setLoading(true);
      const response = await axios.post(url, data, headers);
      console.log(">>> 1. Response:", response.status);
      console.log(">>> 2. Response:", response?.data?.results);
      console.log(">>> 2. Response type:", typeof response?.data?.results);
      // setInsightResponse(() => response.data);

      setStatus(() => response.status);
      setAnalysisResults(() => response?.data?.results);
      setEvaluations(() => response?.data?.results);
      // console.log(">>> 3. analysisResult:", analysisResult);
    } catch (err) {
      console.error("fetchData() Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGetInsight = () => {
    if (!selectedImage) {
      console.log("Please select a valid image.");
      return;
    }
    if (selectedInsightIds.length === 0) {
      console.log("Please select at least one insight.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    selectedInsightIds.forEach((id) => {
      formData.append("insights[]", id);
    });

    fetchData(imageUploadUrlLocal, formData, uplaodHeaders);
  };

  const evaluationCardsRef = useRef(null);
  const dataTableRef = useRef(null);
  useEffect(() => {
    if (status === 200 && evaluationCardsRef.current) {
      evaluationCardsRef?.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
    if (selectedEvaluation !== "" && dataTableRef.current) {
      dataTableRef?.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [status, selectedEvaluation]);

  return (
    <div>
      <Container id="uploadImage" className="text-center">
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
              Get{" "}
              {(selectedInsightIds.length === 0 ||
                selectedInsightIds.length === 4) &&
                "All"}{" "}
              Insights
            </Button>
          </Col>
        </Row>
        {status === 200 && (
          <Row className="text-center  pb-5" ref={evaluationCardsRef}>
            {analysisResults.map((analysisResult, index) => (
              <Col key={index}>
                {Object.entries(analysisResult).map(([key, value]) => {
                  console.log(`Key: ${key}, Value: ${value}`);
                  return (
                    <EvaluationCard
                      key={key}
                      evaluation={value}
                      id={key}
                      isSelected={selectedEvaluation === index}
                      onSelect={() => toggleEvaluateSelection(index)}
                    />
                  );
                })}
              </Col>
            ))}
          </Row>
        )}
        {selectedEvaluation !== "" && (
          <Row className="mt-5" ref={dataTableRef}>
            <DataTable
              selectedEval={analysisResults[selectedEvaluation]}
              id={selectedEvaluation}
            />
          </Row>
        )}
      </Container>
    </div>
  );
}
