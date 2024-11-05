import React from "react";

import Row from "react-bootstrap/Row";

import "./OurTeam.css";
import MemberCard from "./MemberCard";

// import blair from "../assets/images/BlairEdnie.jpeg";
import jacquelineHernandez from "../assets/images/JacquelineHernandez.jpeg";
import jessicaNguyen from "../assets/images/JessicaNguyen.jpeg";
import jihaduYassien from "../assets/images/JihaduYassien.jpeg";
import lukeFarchione from "../assets/images/LukeFarchione.jpeg";

const teamList = [
  {
    id: 1,
    name: "Luke Farchione",
    role: "Developer",
    imgSrc: lukeFarchione,
    gitHubLink: "https://github.com/LukeFarch",
    linkedInLink: "https://www.linkedin.com/in/luke-farchione-05548b161/",
  },
  {
    id: 2,
    name: "Jessica Nguyen",
    role: "Developer",
    imgSrc: jessicaNguyen,
    gitHubLink: "https://www.linkedin.com/in/jessnwin/",
    linkedInLink: "https://github.com/JessNwin",
  },
  {
    id: 3,
    name: "Jihadu Yassien",
    role: "Developer",
    imgSrc: jihaduYassien,
    gitHubLink: "https://github.com/jyassien",
    linkedInLink: "https://www.linkedin.com/in/jyassien/",
  },
  {
    id: 4,
    name: "Blair Ednie",
    role: "Developer",
    imgSrc: "",
    gitHubLink: "https://github.com/bednie",
    linkedInLink: "https://www.linkedin.com/in/blair-ednie/",
  },
  {
    id: 5,
    name: "Jacqueline Hernandez",
    role: "Developer",
    imgSrc: jacquelineHernandez,
    gitHubLink:
      "https://github.com/agrilens/agrilens/commits?author=jacihernandez303",
    linkedInLink: "https://www.linkedin.com/in/jacqueline-hernandez-aba845173/",
  },
];

const OurTeam = () => {
  return (
    <section id="ourTeam">
      <Row className="text-primary text-center display-4">
        <h1 className="display-5 fw-bold ">Our Team</h1>
      </Row>
      <Row className="text-primary mb-5">
        {teamList.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </Row>
    </section>
  );
};

export default OurTeam;
