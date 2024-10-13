import React from "react";
import AgriLens from "./AgriLens";

// The describe function takes two parameters, the first of which is the name of the test suite, and the second is a function that will execute the tests.
describe("<AgriLens />", () => {
  //  Top-lvel 'describe' block will be the container for all our tests in a file
  it(
    // each it represents an individual test.
    "renders", // The first parameter to it is a brief description of the spec, and
    {
      defaultCommandTimeout: 1000,
    },
    () => {
      // The third parameter is a function that contains the test code.
      cy.mount(<AgriLens />); // Checks if the component is mounted or not.
      cy.contains("AgriLens"); // checks if the text "AgriLens" is printed or not.
    }
  );
});
