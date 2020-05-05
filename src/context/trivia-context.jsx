import React, { useState } from "react";

const TriviaContext = React.createContext();

function TriviaContextProvider(props) {
  const [trivia, setTrivia] = useState();

  return <TriviaContext.Provider value={{ trivia, setTrivia }} {...props} />;
}

function useTriviaContext() {
  const context = React.useContext(TriviaContext);
  if (context === undefined) {
    throw new Error(
      `useTriviaContext must be used within a TriviaContextProvider`
    );
  }
  return context;
}

export { TriviaContextProvider, useTriviaContext };
