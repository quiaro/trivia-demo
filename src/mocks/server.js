import { inflections } from "inflected";
import {
  RestSerializer,
  Server,
  Model,
  Factory,
  hasMany,
  trait,
} from "miragejs";
import faker from "faker";

inflections("en", function (inflect) {
  inflect.irregular("trivia", "trivias");
});

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const categoryGenres = ["Music", "Entertainment", "Sports"];
const difficultyLevels = ["easy", "normal", "hard"];

export const QUESTIONS_IN_TRIVIA = 10;
export const TOTAL_QUESTIONS = QUESTIONS_IN_TRIVIA * 5;

// Setting faker seed to get consistent results
faker.seed(5021982);

export function makeServer({ environment = "development" }) {
  return new Server({
    environment,

    models: {
      question: Model,
      trivia: Model.extend({
        questions: hasMany(),
      }),
    },

    factories: {
      question: Factory.extend({
        type: "boolean",
        difficulty() {
          return faker.random.arrayElement(difficultyLevels);
        },
        text() {
          return faker.lorem.sentence();
        },
        correctAnswer() {
          return faker.random.boolean();
        },
        category() {
          const genre = faker.random.arrayElement(categoryGenres);
          const title = faker.lorem.words(2);
          return `${genre}: ${title}`;
        },
      }),
      trivia: Factory.extend({
        answers: [],

        withAnswers: trait({
          answers() {
            const array = new Array(QUESTIONS_IN_TRIVIA);
            return array.fill(true);
          },
        }),
      }),
    },

    serializers: {
      application: RestSerializer,
      trivia: RestSerializer.extend({
        include: ["questions"],
      }),
    },

    seeds(server) {
      // Seeds the DB with questions
      server.createList("question", TOTAL_QUESTIONS);

      // Seeds the DB with an incomplete game (no answers)
      server.create("trivia", {
        questions: server.createList("question", QUESTIONS_IN_TRIVIA),
      });
      server.create("trivia", "withAnswers", {
        questions: server.createList("question", QUESTIONS_IN_TRIVIA),
      });
    },

    routes() {
      this.namespace = "api";

      this.get("/trivias/:id", (schema, request) => {
        let id = request.params.id;

        return schema.trivias.find(id);
      });

      this.post("/trivias", (schema) => {
        const allQuestions = schema.questions.all();
        const questions = [];
        while (questions.length < QUESTIONS_IN_TRIVIA) {
          // Ids are 1-based
          const idx = getRandomInt(allQuestions.length) + 1;
          if (questions.indexOf(idx) === -1) {
            // Do not repeat questions
            questions.push(idx);
          }
        }
        const trivia = schema.trivias.create({
          questions: schema.questions.find(questions),
          answers: [],
        });
        return trivia;
      });

      this.patch("/trivias/:id", (schema, request) => {
        let newAttrs = JSON.parse(request.requestBody);

        let id = request.params.id;
        return schema.trivias.find(id).update(newAttrs);
      });
    },
  });
}
