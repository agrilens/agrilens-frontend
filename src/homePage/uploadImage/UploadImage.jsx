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
import {
  useEvaluationContext,
  useEvaluationUpdateContext,
} from "../../contexts/EvaluationContext";

const url = process.env.REACT_APP_BACKEND_API_URL;

export default function UploadImage() {
  const [selectedInsightIds, setSelectedInsightIds] = useState([]);
  const [selectedEvaluation, setSelectedEvaluation] = useState("");
  const [file, setFile] = useState();
  const [analysisResults, setAnalysisResults] = useState([]);
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [isImageValid, setIsImageValid] = useState("");
  const [error, setError] = useState(false);

  const { userID, userToken } = useAccountContext();
  const { updateUserLastScanId } = useAccountUpdateContext();
  const { selectedImage, selectedEvaluationDetail } = useEvaluationContext();
  const {
    updateSelectedImage,
    updateSelectedEvaluationDetail,
    updateLastConversation,
    handleShowErrorModal,
  } = useEvaluationUpdateContext();

  useEffect(() => {
    if (isImageValid === false) {
      handleShowErrorModal({
        errorTitle: "Invalid Image",
        errorMessage:
          "The uploaded image doesn't appear to be of a plant. Please upload a clear and valid plant image to proceed with the analysis.",
      });
      return;
    }
    // eslint-disable-next-line
  }, [status, isImageValid]);

  const handleImageChange = (event) => {
    const file = event?.target?.files[0];
    if (file) {
      setFile(() => file);
      const reader = new FileReader();
      reader.onloadend = () => updateSelectedImage(reader?.result);
      reader.readAsDataURL(file);
    }
  };

  const toggleInsightSelection = (id) => {
    setSelectedInsightIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  const toggleEvaluateSelection = (id) => {
    setSelectedEvaluation(() => id);
  };

  const fetchData = async (url, data) => {
    try {
      setLoading(true);

      const uplaodHeaders = {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "multipart/form-data",
          userID: userID,
        },
      };

      const response = await axios.post(url, data, uplaodHeaders);

      setStatus(() => response?.status);
      setIsImageValid(() => response?.data?.isImageValid);
      updateUserLastScanId(() => response?.data?.scanId);
      setAnalysisResults(() => response?.data?.results);
      setEvaluations(() => response?.data?.results);

      return response;
    } catch (err) {
      console.error("fetchData() Error:", err);
      setError(err.message);
      handleShowErrorModal({
        errorTitle: "Request Failed",
        errorMessage: err?.response?.data?.reason,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGetInsight = () => {
    if (!selectedImage) {
      handleShowErrorModal({
        errorTitle: "No Image",
        errorMessage: "Please upload a valid image for evaluation.",
      });
      return;
    }

    let currentInsightIds = selectedInsightIds;
    if (currentInsightIds.length === 0) {
      currentInsightIds = [
        "pestDiagnosis",
        "sustainablePractices",
        "identifySpecies",
        "overallHealth",
      ];
      setSelectedInsightIds(currentInsightIds);
    }

    updateSelectedEvaluationDetail(null);
    updateLastConversation([]);

    const formData = new FormData();
    formData.append("image", file);
    currentInsightIds.forEach((id) => {
      formData.append("insights[]", id);
    });

    fetchData(`${url}/analyze`, formData);
  };

  const evaluationCardsRef = useRef(null);
  const dataTableRef = useRef(null);
  useEffect(() => {
    if (status === 200 && isImageValid && evaluationCardsRef.current) {
      evaluationCardsRef?.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
    if (selectedEvaluation !== "" && dataTableRef.current) {
      updateSelectedEvaluationDetail(analysisResults[selectedEvaluation]);
      dataTableRef?.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
    // eslint-disable-next-line
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
        {status === 200 && analysisResults?.length !== 0 && (
          <Row className="text-center pb-5 " ref={evaluationCardsRef}>
            <div className="fw-bold h1 text-primary px-5">
              Select an evaluation below to explore detailed insights, analyzed
              by different models.
            </div>
            {analysisResults?.map((analysisResult, index) => (
              <Col key={index}>
                {Object?.entries(analysisResult).map(([key, value]) => {
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
        {selectedEvaluationDetail !== null && selectedEvaluation === "" && (
          <Row className="mt-5" ref={dataTableRef}>
            <DataTable selectedEval={selectedEvaluationDetail} />
          </Row>
        )}
      </Container>
    </div>
  );
}
