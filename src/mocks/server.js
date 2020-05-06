import {
  RestSerializer,
  Server,
  Model,
  Factory,
  belongsTo,
  hasMany,
} from "miragejs";
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
      category: Model,
      question: Model.extend({
        category: belongsTo(),
      }),
      trivia: Model.extend({
        questions: hasMany(),
      }),
    },

    factories: {
      category: Factory.extend({
        name(i) {
          const genre = faker.random.arrayElement(categoryGenres);
          const title = faker.lorem.words(2);
          return `${genre}: ${title}`;
        },
      }),

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
      }),
    },

    serializers: {
      application: RestSerializer,
      question: RestSerializer.extend({
        include: ["category"],
      }),
      trivia: RestSerializer.extend({
        include: ["questions"],
      }),
    },

    seeds(server) {
      // Seeds the DB with 60 questions
      server.createList("category", 6).forEach((category) => {
        server.createList("question", 10, { category });
      });

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
          const idx = getRandomInt(allQuestions.length);
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
