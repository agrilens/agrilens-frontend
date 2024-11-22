import React, { useState, useEffect } from "react";

import AgriLens from "./AgriLens";
import AgriLensLogoCircleMobile from "../assets/images/agriLensLogoMob.png";
import AgriLensLogoCircleTablet from "../assets/images/agriLensLogoTab.png";
import AgriLensLogoCircleDesktop from "../assets/images/agriLensLogoDesk.png";

const AgriLensWithLogo = () => {
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [imgSrc, setImgSrc] = useState(AgriLensLogoCircleDesktop);

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
      setImgSrc(AgriLensLogoCircleMobile);
    } else if (screenSize < 768) {
      setImgSrc(AgriLensLogoCircleTablet);
    } else {
      setImgSrc(AgriLensLogoCircleDesktop);
    }
  }, [screenSize]);

  return (
    <div id="agrilens-brand-with-logo" className="d-flex align-items-center">
      <img
        data-cy="logo"
        src={imgSrc}
        alt="AgriLens Logo"
        style={{ paddingRight: "15px" }}
      />
      <AgriLens />
    </div>
  );
};

export default AgriLensWithLogo;
