import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

export const LegalTerms = () => {
  const [showLegal, setShowLegal] = useState(false);

  const handleCloseLegal = () => setShowLegal(false);
  const handleShowLegal = () => setShowLegal(true);

  return (
    <div>
      {/* Legal Documents Modal */}
      <Modal.Header closeButton>
        <Modal.Title>Legal Documents</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: "70vh", overflowY: "auto" }}>
        <Tabs defaultActiveKey="tos" className="mb-3">
          <Tab eventKey="tos" title="Terms of Service">
            <h2>Terms of Service</h2>
            <p className="text-muted">Last Updated: November 14, 2024</p>
            <h3>1. Agreement to Terms</h3>
            <p>
              By accessing and using AgriLens ("App"), you agree to be bound by
              these Terms of Service ("Terms"). If you disagree with any part of
              these terms, you may not access the App.
            </p>
            <h3>2. Description of Service</h3>
            <p>
              This App is designed to analyze plant health through
              user-submitted images, providing automated analysis and diagnosis
              of plant conditions through advanced image processing technology.
            </p>
            <h3>3. User Accounts</h3>
            <ul>
              <li>
                You must provide accurate and complete information when creating
                an account
              </li>
              <li>
                You are responsible for maintaining the confidentiality of your
                account credentials
              </li>
              <li>
                You are responsible for all activities that occur under your
                account
              </li>
            </ul>
            <h3>4. Acceptable Use</h3>
            <p>You agree not to:</p>
            <ul>
              <li>Use the App for any illegal purposes</li>
              <li>Share your account credentials with others</li>
              <li>
                Attempt to gain unauthorized access to any part of the App
              </li>
              <li>Upload or share inappropriate or harmful content</li>
              <li>Interfere with or disrupt the App or servers</li>
              <li>Violate any applicable laws or regulations</li>
            </ul>
            <h3>5. Intellectual Property</h3>
            <p>
              Copyright © 2024 AgriLens Project Team - Metropolitan State University of Denver.
            </p>
            <p>
              Created by Jihadu Yassien, Jessica Nguyen, Luke Farchione, Jacqueline Hernandez, and Blair Ednie. 
            </p>
            <p>
              This work is licensed under Creative Commons Attribution-ShareAlike 4.0 International.
              To view a copy of this license, visit https://creativecommons.org/licenses/by-sa/4.0/
              All content, features, and functionality of this application are the property of the AgriLens Project Team and are protected by copyright laws.
            </p>
            <h3>6. Termination</h3>
            <p>
              We reserve the right to terminate or suspend your account and
              access to the App at our sole discretion, without notice, for
              conduct that we believe violates these Terms or is harmful to
              other users, us, or third parties, or for any other reason.
            </p>
            <h3>7. Disclaimer of Warranties</h3>
            <p>
              The App is provided "as is" and "as available" without any
              warranties of any kind, either express or implied.
            </p>
            <h3>8. Limitation of Liability</h3>
            <p>
              In no event shall we be liable for any indirect, incidental,
              special, consequential, or punitive damages resulting from your
              use or inability to use the App.
            </p>
            <h3>9. Contact Us</h3>
            <p>
              If you have questions about these Terms or Privacy Policy, please
              contact us at{" "}
              <a href="mailto:agrilens303@gmail.com">agrilens303@gmail.com</a>
            </p>
            <p>
              Generated using Claude 3.5 LLM:{" "}
              <a href="https://claude.site/artifacts/d3859245-07d9-405c-9eee-34b7313ac98e">
                Claude conversation
              </a>
            </p>
          </Tab>
          <Tab eventKey="privacy" title="Privacy Policy">
            <h2>Privacy Policy</h2>
            <p className="text-muted">Last Updated: November 14, 2024</p>

            <h3>1. Information We Collect</h3>
            <h4>Personal Information</h4>
            <ul>
              <li>Name and email address</li>
              <li>Profile information you provide</li>
              <li>Device information and IP address</li>
              <li>Images you upload for analysis</li>
            </ul>

            <h4>Usage Information</h4>
            <ul>
              <li>App usage statistics</li>
              <li>Performance data</li>
              <li>Feature interaction data</li>
            </ul>

            <h3>2. How We Use Your Information</h3>
            <p>We use collected information to:</p>
            <ul>
              <li>Provide and maintain the App</li>
              <li>Improve user experience</li>
              <li>Communicate with you about the App</li>
              <li>Ensure App security</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h3>3. Data Storage and Security</h3>
            <ul>
              <li>
                We implement appropriate security measures to protect your
                information
              </li>
              <li>Data is stored on secure servers</li>
              <li>We regularly review and update our security practices</li>
            </ul>

            <h3>4. Information Sharing</h3>
            <p>
              We do not sell your personal information. We may share your
              information:
            </p>
            <ul>
              <li>With your consent</li>
              <li>To comply with legal obligations</li>
              <li>With service providers who assist in operating the App</li>
              <li>In the event of a merger, acquisition, or sale of assets</li>
            </ul>

            <h3>5. User Rights</h3>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of certain data collection</li>
              <li>Export your data</li>
            </ul>

            <h3>6. Data Retention</h3>
            <p>We retain your information for as long as:</p>
            <ul>
              <li>Your account is active</li>
              <li>Needed to provide you services</li>
              <li>Required by law</li>
              <li>Necessary for legitimate business purposes</li>
            </ul>

            <h3>7. Children's Privacy</h3>
            <p>
              This App is intended for users who are 13 years of age or older.
              We do not knowingly collect information from children under 13
              without parental consent.
            </p>

            <h3>8. Changes to Privacy Policy</h3>
            <p>
              We may update this Privacy Policy from time to time. We will
              notify users of any material changes via email or through the App.
            </p>

            <h3>9. Contact Us</h3>
            <p>
              If you have questions about these Terms or Privacy Policy, please
              contact us at{" "}
              <a href="mailto:agrilens303@gmail.com">agrilens303@gmail.com</a>
            </p>
            <p>
              Generated using Claude 3.5 LLM:{" "}
              <a href="https://claude.site/artifacts/d3859245-07d9-405c-9eee-34b7313ac98e">
                Claude conversation
              </a>
            </p>
          </Tab>
        </Tabs>
      </Modal.Body>
    </div>
  );
};

export default LegalTerms;
