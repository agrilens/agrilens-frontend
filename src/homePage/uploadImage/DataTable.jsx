import React, { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";
import "./DataTable.css";

import {
  useAccountContext,
  useAccountUpdateContext,
} from "../../contexts/AccountContext";

const url = process.env.REACT_APP_BACKEND_API_URL;

const DataTable = ({ selectedEval, id }) => {
  const [saveBtnTxt, setSaveBtnTxt] = useState("");
  const [saveBtnClass, setSaveBtnClass] = useState("");

  const { userID, userLastScanId, chatBotRef } = useAccountContext();
  const { updateUserLastScanSummary, updateUserSelectedModel } =
    useAccountUpdateContext();

  useEffect(() => {
    setSaveBtnTxt("Save Result");
    setSaveBtnClass("white text-primary active");
  }, [selectedEval]);

  const key = Object?.keys(selectedEval)[0];
  let data = selectedEval[key];

  const evaluationFrame = [
    {
      label: "Identification",
      value: data?.plant_id,
      isValue: data?.plant_id !== "None detected" ? true : false,
    },
    {
      label: "Health Score",
      value: data?.health_score,
      isValue: data?.health_score ? true : false,
    },
    {
      label: "Pest Detected",
      value: data?.pest_identification,
      isValue: data?.pest_identification !== "None detected" ? true : false,
    },
    {
      label: "Disease Detected",
      value: data?.disease_identification,
      isValue: data?.disease_identification !== "None detected" ? true : false,
    },
    {
      label: "Weed Presence",
      value: data?.weed_presence,
      isValue: data?.weed_presence !== "None detected" ? true : false,
    },
    {
      label: "Sustainable Practice Suggestion",
      value: Array.isArray(data?.recommendations) ? data?.recommendations : [],
      isValue: data?.recommendations?.length !== 0 ? true : false,
    },
  ];

  const score = data?.health_score;
  console.log("score: ", score);
  /* Healthy >= 98 | 98 < Mild Issues >= 80 | 80 < Moderate Issues >= 50 |Severe Issues < 50 */
  const statusColor =
    score >= 98
      ? "success"
      : score >= 80
        ? " mild-success"
        : score >= 50
          ? "warning"
          : "danger";

  const handleSaveResult = async () => {
    updateUserLastScanSummary(data?.summary);
    updateUserSelectedModel(key);
    try {
      const uplaodHeaders = {
        headers: {
          // Authorization: `Bearer ${"token"}`,
          userID: userID,
        },
      };
      // console.log(">> updateUserAccInfoDB: ", data);
      const response = await axios.put(
        `${url}/users/save-evaluation`,
        { scanId: userLastScanId, evaluation: selectedEval },
        uplaodHeaders
      );

      const updatedEvaluation = response?.data;
      setSaveBtnTxt("Result Saved");
      setSaveBtnClass("success text-white disabled");

      // console.log("updatedEvaluation: ", updatedEvaluation);
      return updatedEvaluation;
    } catch (err) {
      console.error("handleSaveResult() Error:", err);
    }

    return;
  };
  const handleChatAboutResult = () => {
    updateUserLastScanSummary(data?.summary);
    updateUserSelectedModel(key);

    if (chatBotRef.current) {
      // console.log(">>>>> chatBotRef?.current: ", chatBotRef.current);
      chatBotRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    } else {
      console.error("chatBotRef.current is null");
    }
  };

  return (
    <Col lg="4" md="6" id="dataTableCard" className={`mx-auto mb-2`}>
      <div className="dataTable-card-tag mx-auto fs-5 fw-bold ">
        {key.toUpperCase()} Evaluation
      </div>
      <Card className="dataTable-card ">
        <Card.Header className="p-4  dataTable-card-header d-flex">
          <Card.Title className="fs-4 ps-2 display-3 fw-bold text-white align-left">
            Overall Health Status:
          </Card.Title>
          <div className={`fs-1 ps-3 fw-bolder align-left text-${statusColor}`}>
            {data?.overall_health_status}
          </div>
        </Card.Header>
        <Card.Body className="dataTable-card-body p-4">
          <div className="dataTable-card-text">
            <ul className="dataTableCard-ul list-unstyled text-white p-3 ps-3">
              {evaluationFrame?.map((item, i) => (
                <div
                  className={`dataTableCard-li-wrapper fs-4 ${i < 2 ? "d-flex-row" : ""} fs-5 pb-2 mb-2`}
                  key={i}
                >
                  <div className="d-flex align-items-center">
                    <i
                      className={`fa-regular me-2 fa-circle${item?.isValue ? "-check" : "-xmark"}`}
                    ></i>
                    <li className="dataTableCard-li">{item?.label}:</li>
                  </div>
                  <div
                    className={`text-start ps-4 fw-bold ${item?.label === "Sustainable Practice Suggestion" ? "d-none" : ""}`}
                  >
                    {item?.value}
                  </div>
                  <ul
                    className={`text-start ps-5 fs-4 fw-bold  ${item?.label === "Sustainable Practice Suggestion" ? "d-block" : "d-none"}`}
                  >
                    {Array.isArray(item?.value) ? (
                      item?.value?.map((val, index) => (
                        <li key={index}>{val}</li>
                      ))
                    ) : (
                      <li>{item?.value}</li> // Fallback when item.value is not a valid array - display it as it is.
                    )}
                  </ul>
                </div>
              ))}
            </ul>
          </div>
          <Button
            onClick={handleSaveResult}
            className={`dataTableCard-card-btn my-1 bg-${saveBtnClass} text-center fs-5 me-md-3`}
          >
            {saveBtnTxt}
          </Button>
          <Button
            onClick={handleChatAboutResult}
            className="my-1 dataTableCard-card-btn text-primary bg-white text-center fs-6"
          >
            Ask About your Result
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default DataTable;
