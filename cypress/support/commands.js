// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import { QUESTIONS_IN_TRIVIA } from "../../src/mocks/server";

Cypress.Commands.add("checksFirstQuestion", () => {
  cy.get("[data-cy=question]").should("exist");
  cy.contains("True");
  cy.contains("False");
  cy.get("[data-cy=step-index").should("have.text", "1");
  cy.get("[data-cy=step-total").should(
    "have.text",
    QUESTIONS_IN_TRIVIA.toString()
  );
});

Cypress.Commands.add("checksScore", () => {
  cy.contains("You scored");
  cy.get("[data-cy=results]").should("exist");
  cy.contains("Play Again");
});
