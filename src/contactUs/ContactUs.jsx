import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Mail } from "lucide-react";
import "./ContactUs.css";

const EMAIL_TEMPLATE = {
  mailto: "agrilens303@gmail.com",
  subject: "Inquiry From AgriLens Website",
  body: `Dear Team,

I am reaching out to inquire about [specific topic or question]. I came across your platform and was particularly interested in [specific aspect or resource].

Could you please provide more information on [specific request or question]?

Thanks!
[Your Name]
[Your Affiliation]
[Your Contact Information]`,
};

const ContactUs = () => {
  const handleEmailUs = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const mailtoLink = `mailto:${EMAIL_TEMPLATE.mailto}?subject=${encodeURIComponent(EMAIL_TEMPLATE.subject)}&body=${encodeURIComponent(EMAIL_TEMPLATE.body)}`;

  return (
    <div id="contactUs">
      <div className="info-container">
        <Container onSubmit={handleEmailUs}>
          <Row className="mb-3 align-items-center">
            <Col className="left-col p-0 d-flex flex-column">
              <div className="info-title h1 text-primary">Contact Us</div>
              <div className="info-description h6">
                <p>
                  Have a question? Want to learn more or get involved?
                  <br />
                  <br />
                  Send us an email to get in touch with us!
                </p>
              </div>
              <div className="d-flex align-items-center">
                <div className="col-auto me-2 opacity-75 email-logo">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="mb-0 h6 opacity-75">Email</p>
                  <div className="h3 mb-0 text-break">
                    {EMAIL_TEMPLATE.mailto}
                  </div>
                </div>
              </div>
              <a href={mailtoLink} id="btn-dont-show-on-mobile">
                <Button className="email-us-btn" type="submit">
                  Email Us!
                </Button>
              </a>
            </Col>
          </Row>
          <a href={mailtoLink} id="btn-show-on-mobile">
            <Button className="email-us-btn" type="submit">
              Email Us!
            </Button>
          </a>
        </Container>
      </div>
    </div>
  );
};

export default ContactUs;
