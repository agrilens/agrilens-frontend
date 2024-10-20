import React, { useContext } from "react";
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
    <section id="">
      <div>
        <UploadImage />
      </div>
    </section>
  );
}
