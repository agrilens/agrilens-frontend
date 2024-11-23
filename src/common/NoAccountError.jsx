import React from "react";
import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";

import "./NoAccountError.css";

const NoAccountError = ({}) => {
  return (
    <section id="NoAccountError" className="">
      <div className="h-100 w-100 border my-auto mx-auto d-flex flex-column justify-content-center align-items-center">
        <i class="fa-sharp fa-solid fa-circle-info  mb-5" />
        <h2 className="display-5 fw-bolder mt-4 text-center">
          You must be logged in for full access!
        </h2>
        <div className="error-btns-wrapper d-flex justify-content-center gap-4 align-items-center mt-3">
          <Link
            to="/signin"
            variant="primary"
            className="btn btn-primary fw-bold fs-3 pb-2"
          >
            Sign In
          </Link>
          <h2 className="display-6 fw-bolder text-primary mx-3">OR</h2>
          <Link
            to="/signup"
            variant="primary"
            className="btn btn-primary fw-bold fs-3 pb-2"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NoAccountError;
