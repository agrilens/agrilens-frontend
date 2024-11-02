import React, { useState, useEffect } from "react";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

import "./Banner.css";
import banner2BgDesktop from "../../assets/images/banner2BgDesktop.png";
import banner2BgMobile from "../../assets/images/banner2BgMobile.png";

const Banner2 = () => {
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [imgSrc, setImgSrc] = useState(banner2BgDesktop);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (screenSize < 576) {
      setImgSrc(banner2BgMobile);
    } else {
      setImgSrc(banner2BgDesktop);
    }
  }, [screenSize]);

  return (
    <Container fluid id="banner2" className="px-0 mb-5">
      <Card className="my-auto text-white">
        <Card.Img
          src={imgSrc}
          alt="Card image"
          className=""
          style={{
            minHeight: "200px",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        <Card.ImgOverlay className="bg-dark bg-opacity-75 d-flex">
          <div className="text-content2">
            <Card.Title className="">
              <h1 className="fw-bold text-start  display-77 mb-0">
                Explore Resources and
              </h1>
              <h1 className="fw-bold text-start display-47 mb-0">
                Initiatives to Improve
              </h1>
              <h1 className="fw-bold text-start display-47 mb-0">
                Agricultural Practices
              </h1>
              <h1 className="fw-bold text-start display-47 mb-0">
                Through GIS Technology
              </h1>
            </Card.Title>
          </div>
        </Card.ImgOverlay>
      </Card>
    </Container>
  );
};

export default Banner2;
