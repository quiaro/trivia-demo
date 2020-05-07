import React from "react";
import ReactDOM from "react-dom";
import { makeServer } from "./mocks/server";
import { Server, Response } from "miragejs";
import App from "./App.jsx";
import * as serviceWorker from "./serviceWorker";

if (process.env.NODE_ENV !== "production") {
  // Proxy your app's network requests
  // https://miragejs.com/quickstarts/cypress/#step-4-proxy-your-apps-network-requests
  if (window.Cypress) {
    new Server({
      environment: "test",
      routes() {
        let methods = ["get", "put", "patch", "post", "delete"];
        methods.forEach((method) => {
          this[method]("/*", async (schema, request) => {
            let [status, headers, body] = await window.handleFromCypress(
              request
            );
            return new Response(status, headers, body);
          });
        });
      },
    });
  } else {
    makeServer({
      environment: process.env.NODE_ENV,
    });
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
