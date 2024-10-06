import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      //   navigate("/");    // Redirects to the home page.
      navigate(-1); // Returns to the previous page.
    }, 2000);
  });
  return (
    <>
      <div>Not Found Page</div>
    </>
  );
}
