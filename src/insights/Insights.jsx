import React, { useState, useEffect } from "react";
import axios from "axios";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

import Insight from "./Insight";

import { useAccountContext } from "../contexts/AccountContext";

const url = process.env.REACT_APP_BACKEND_API_URL;

const Insights = () => {
  const [evaluations, setEvaluations] = useState([]);

  const { userID } = useAccountContext();

  useEffect(() => {
    getUserScanHistory();
    // eslint-disable-next-line
  }, []);

  const getUserScanHistory = async () => {
    try {
      const uplaodHeaders = {
        headers: {
          // Authorization: `Bearer ${"token"}`,
          userID: userID,
        },
      };

      const response = await axios.get(
        `${url}/users/scan-history`,
        uplaodHeaders
      );
      // const response = await axios.get(
      //   `https://app-id543mmv6a-uc.a.run.app/users/scan-history`,
      //   uplaodHeaders
      // );

      const scans = response?.data?.scans || [];
      const formattedScans = restructureScans(scans);

      setEvaluations(formattedScans);
      console.log("formattedScans: ", formattedScans);

      return formattedScans;
    } catch (err) {
      console.error("fetchData() Error:", err);
    } finally {
    }
  };
  const restructureScans = (scans) => {
    return scans.map((scan) => {
      const getEvaluation = (evaluationObj) => {
        if (!evaluationObj) return null;
        const key = Object.keys(evaluationObj)[0];
        return evaluationObj[key] || null;
      };

      const evaluation =
        getEvaluation(scan.selectedEvaluation) ||
        getEvaluation(scan.defaultEvaluation) ||
        {};

      return {
        id: scan.id,
        timestamp: scan.timestamp,
        imgUrl: scan.imageUrl,
        plant_id: evaluation?.plant_id || null,
        overall_health_status: evaluation?.overall_health_status || null,
        health_score: evaluation?.health_score || null,
        pest_identification: evaluation?.pest_identification || null,
        disease_identification: evaluation?.disease_identification || null,
        weed_presence: evaluation?.weed_presence || null,
        recommendations: evaluation?.recommendations || [],
        summary: evaluation?.summary || null,
      };
    });
  };
  return (
    <Container id="insightPage" className="py-5">
      <div className="display-4 fw-bold text-primary mb-2">Insights</div>
      {evaluations.map((evaluation) => {
        return (
          <Row>
            <Insight insight={evaluation} />
          </Row>
        );
      })}
    </Container>
  );
};

export default Insights;
