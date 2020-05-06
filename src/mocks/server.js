import { RestSerializer, Server, Model, Factory, hasMany } from "miragejs";
import faker from "faker";

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const QUESTIONS_IN_TRIVIA = 10;
const categoryGenres = ["Music", "Entertainment", "Sports"];
const difficultyLevels = ["easy", "normal", "hard"];

// Setting faker seed to get consistent results
faker.seed(5021982);

export function makeServer({ environment }) {
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
    },

    serializers: {
      application: RestSerializer,
      trivia: RestSerializer.extend({
        include: ["questions"],
      }),
    },

    seeds(server) {
      // Seeds the DB with 60 questions
      server.createList("question", 60);

      console.log(server.db.dump());
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
            questions.push(idx);
          }
        }
        const trivia = schema.trivia.create({
          questions: schema.questions.find(questions),
          answers: [],
        });
        return trivia;
      });

      this.patch("/trivias/:id", (schema, request) => {
        let newAttrs = JSON.parse(request.requestBody);
        let id = request.params.id;
        let trivia = schema.movies.find(id);

        return trivia.update(newAttrs);
      });
    },
  });
}