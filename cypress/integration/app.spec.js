import {
  makeServer,
  TOTAL_QUESTIONS,
  QUESTIONS_IN_TRIVIA,
} from "../../src/mocks/server";

const host = "http://localhost:3000";

describe("Trivia App", () => {
  let server;

  beforeEach(() => {
    server = makeServer({ environment: "test" });
    // Seeds the DB with questions to use in the games
    server.createList("question", TOTAL_QUESTIONS);
  });

  afterEach(() => {
    server.shutdown();
  });

  it("starts a new game", () => {
    cy.visit(`${host}/`).contains("Begin").click();

    cy.url().should("include", "/trivia/1");
    cy.checksFirstQuestion();
  });

  it("loads an existing (incomplete) game", () => {
    server.create("trivia", {
      questions: server.createList("question", QUESTIONS_IN_TRIVIA),
    });

    cy.visit(`${host}/trivia/1`);
    cy.checksFirstQuestion();
  });

  it("loads an existing (complete) game", () => {
    server.create("trivia", "withAnswers", {
      questions: server.createList("question", QUESTIONS_IN_TRIVIA),
    });

    cy.visit(`${host}/trivia/1`);
    cy.checksScore();
  });

  it("shows score after finishing game", () => {
    const numQuestions = 3;
    server.create("trivia", {
      questions: server.createList("question", numQuestions, {
        correctAnswer: true,
      }),
    });

    cy.visit(`${host}/trivia/1`).contains("True").click();
    cy.contains("True").click();
    cy.contains("False").click();

    cy.checksScore();
    cy.get("[data-cy=answers-correct").should("have.text", "2");
    cy.get("[data-cy=answers-total").should(
      "have.text",
      numQuestions.toString()
    );
  });

  it("shows an error when loading a non-existent game", () => {
    cy.visit(`${host}/trivia/1`);
    cy.contains("Trivia game not found");
  });

  it("restarts", () => {
    server.create("trivia", "withAnswers", {
      questions: server.createList("question", QUESTIONS_IN_TRIVIA),
    });

    cy.visit(`${host}/trivia/1`).contains("Play Again").click();

    cy.url().should("equal", `${host}/`);
  });
});
