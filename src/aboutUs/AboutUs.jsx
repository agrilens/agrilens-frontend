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
          <h1 className="feature-title fs-1 fw-bold text-center">
            Our AI Technology Stack{" "}
          </h1>
          <p className="tech-stack-subtitle  fs-4 fw-bold">
            Leveraging state-of-the-art AI models to deliver comprehensive plant
            identification, health analysis, and agricultural insights.
          </p>
          <div className="models-grid">
            <div className="model-card feature-card">
              <h3 className="feature-title fs-2 fw-bold">Qwen2-2VL-7B</h3>
              <p className="feature-text">
                The Qwen2-2VL-7b is a Multimodal Model of 7B parameters plus
                visual language understanding capabilities for comprehensive
                plant analysis. Our implementation of the Qwen language model
                specializes in agricultural domain knowledge, providing detailed
                analysis of plant conditions and offering specific
                recommendations for treatment and care. This model excels at
                understanding complex agricultural contexts and delivering
                actionable insights to farmers.
              </p>
            </div>
            <div className="model-card feature-card">
              <h3 className="feature-title fs-2 fw-bold">Pixtral-12B-2409</h3>
              <p className="feature-text">
                The Pixtral-12B-2409 is a Multimodal Model of 12B parameters
                plus a 400M parameter vision encoder. We utilize this Llama
                based model for advanced plant analysis and disease detection.
                This model processes visual data to identify plant health
                issues, assess growth patterns, and detect early signs of
                diseases or nutrient deficiencies. Its sophisticated analysis
                capabilities help farmers take proactive measures to protect
                their crops.
              </p>
            </div>
            <div className="model-card feature-card">
              <h3 className="feature-title fs-2 fw-bold">Plant.id v3</h3>
              <p className="feature-text">
                Plant.id v3 is an advanced machine learning service specialized
                in identifying plant species and assessing plant health
                conditions through image analysis. This model uses computer
                vision technology to accurately identify plant species,
                varieties, and growth stages. This closed-sourced model enables
                precise plant recognition that informs subsequent analysis and
                recommendations.
              </p>
            </div>
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
