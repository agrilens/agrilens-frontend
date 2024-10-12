import React from "react";
import AgriLensWithLogo from "./AgriLensWithLogo";
import AgriLens from "./AgriLens";

describe("AgriLensWithLogo Component", () => {
  it("should render the AgriLensWithLogo component", () => {
    cy.mount(<AgriLensWithLogo />);
  });

  it("should render the AgriLens logo", () => {
    cy.viewport(1024, 768);
    cy.mount(<AgriLensWithLogo />);

    cy.get("[data-cy=logo]").should("be.visible").and("have.attr", "src");
  });

  it("should render the AgriLens component", () => {
    cy.mount(<AgriLensWithLogo />);
    cy.get("div#agrilens-brand-with-logo").contains("AgriLens");
  });
});
