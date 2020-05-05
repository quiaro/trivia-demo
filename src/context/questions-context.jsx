import React, { useReducer } from "react";

const QuestionsContext = React.createContext();

function QuestionsContextProvider(props) {
  const initialState = {
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

  return <QuestionsContext.Provider value={{ state, dispatch }} {...props} />;
}

function useQuestionsContext() {
  const context = React.useContext(QuestionsContext);
  if (context === undefined) {
    throw new Error(
      `useQuestionsContext must be used within a QuestionsContextProvider`
    );
  }
  return context;
}

export { QuestionsContextProvider, useQuestionsContext };
