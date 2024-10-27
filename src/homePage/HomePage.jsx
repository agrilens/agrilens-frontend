import React, { useContext } from "react";

// import Banner from "./banner/Banner";
import UploadImage from "./uploadImage/UploadImage";

import "./HomePage.css";
import {
  useAccountContext,
  useAccountUpdateContext,
} from "../contexts/AccountContext";

export default function HomePage() {
  const { userType, userEmail } = useAccountContext();
  // console.log("userType", userType);
  const { updateUserType } = useAccountUpdateContext();

  return (
    <section id="homePage">
      <div className="home-container">
        {/* <Banner /> */}
        <UploadImage />
      </div>
    </section>
  );
}
