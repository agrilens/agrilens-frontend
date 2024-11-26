import React from "react";
import "./AboutUs.css";
import OurTeam from "./OurTeam";

export default function AboutUs() {
  const team = ["Jihadu", "Jacqueline", "Jessica", "Luke", "Blair"];

  return (
    <div id="aboutUs">
      <div className="about-us-container">
        <div className="about-us-header">
          <h1 className="about-us-title">About AgriLens</h1>
          <p className="about-us-subtitle  fs-4 fw-bold">
            Empowering resource-constrained farmers with innovative plant health
            identification and analysis solutions.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <h3 className="feature-title fs-2 fw-bold">Our Mission</h3>
            <p className="feature-text">
              To provide accessible technology that helps farmers identify plant
              health issues, optimize resource usage, and make data-driven
              decisions without requiring extensive technical knowledge.
            </p>
          </div>

          <div className="feature-card">
            <h3 className="feature-title fs-2 fw-bold">What We Offer</h3>
            <p className="feature-text">
              Our service combines advanced plant health identification with
              practical analytics, helping farmers identify diseases and pests
              while providing valuable insights for resource optimization.
            </p>
          </div>

          <div className="feature-card">
            <h3 className="feature-title fs-2 fw-bold">Our Approach</h3>
            <p className="feature-text">
              Using a scrum-based development process, we continuously improve
              our platform to better serve farmers' needs through regular
              feedback and agile development.
            </p>
          </div>
        </div>

        <div className="section">
          <h2 className="feature-title fs-3 fw-bold">Core Features</h2>
          <ul className="feature-text">
            <li>Advanced plant health identification technology</li>
            <li>Resource optimization through data analytics</li>
            <li>User-friendly interface for farmers</li>
            <li>Comprehensive insights for informed decision-making</li>
            <li>Data aggregation for broader agricultural insights</li>
          </ul>
        </div>

        <div className="section">
          <h2 className="feature-title  fs-4 fw-bold">Project Status</h2>
          <p className="feature-text">
            We are actively developing AgriLens, focusing on gathering detailed
            requirements, prototyping key features, and writing production code.
            Our team is committed to creating a solution that makes a real
            difference in agricultural management and sustainability.
          </p>
        </div>
      </div>
      <OurTeam />
    </div>
  );
}
