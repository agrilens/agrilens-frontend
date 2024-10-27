import React from "react";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import "./Banner.css";
import bannerBackground from "../../assets/images/bannerBackground.png";

const Banner = () => {
  return (
    <Container fluid id="banner" className="px-0 ">
      <Card className="my-auto text-white">
        <Card.Img
          src={bannerBackground}
          alt="Card image"
          className=""
          style={{ minHeight: "550px", maxHeight: "658px" }}
        />
        <Card.ImgOverlay className="bg-dark bg-opacity-50 d-flex">
          <div className="text-content">
            <Card.Title className="">
              <h1 className="fw-bold display-1 mb-0">Revolutionizing</h1>
              <h1 className="fw-bold display-1 mb-0">Agriculture through AI</h1>
              <h1 className="fw-bold display-1 mb-0">Vision Technology</h1>
            </Card.Title>
            <Card.Text className="mb-5">
              Get real time analysis for agricultural health specific to your
              location
            </Card.Text>
            <div className="banner-btns-wrapper">
              <Button className="banner-btns fw-bold px-4 border-primary-green">
                Get Started
              </Button>
              <Button className="banner-btns fw-bold px-4 bg-transparent border-white">
                Learn More
              </Button>
            </div>
          </div>
        </Card.ImgOverlay>
      </Card>
    </Container>
  );
};

export default Banner;
