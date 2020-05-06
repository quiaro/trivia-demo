import React, { useReducer } from "react";

const TriviaContext = React.createContext();

function TriviaContextProvider(props) {
  const initialState = {
    triviaId: null,
    questions: [],
    answers: [],
    current: 0,
  };

  function reducer(state, action) {
    switch (action.type) {
      case "answer":
        return {
          ...state,
          answers: state.answers.push(action.answer),
          current: state.current + 1,
        };
      case "reset":
        return initialState;
      default:
        throw new Error();
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  // TODO: update URL per state changes (useEffect)

  return <TriviaContext.Provider value={{ state, dispatch }} {...props} />;
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
