import React, { useCallback, useMemo, useReducer } from "react";
import { createTrivia, getTrivia, updateTrivia } from "../utils/api";

const TriviaContext = React.createContext();

function TriviaContextProvider(props) {
  const initialState = useMemo(
    () => ({
      triviaId: null,
      questions: [],
      answers: [],
      current: 0,
      isLoading: false,
      error: null,
    }),
    []
  );

  const reducer = useCallback(
    (state, action) => {
      switch (action.type) {
        case "answer_question":
          const nextQuestionIdx = state.current + 1;
          const allAnswers = [...state.answers, action.payload];

          if (nextQuestionIdx === state.questions.length) {
            // Save all answers in the server
            updateTrivia(state.triviaId, allAnswers);
          }
          return {
            ...state,
            answers: allAnswers,
            current: nextQuestionIdx,
          };
        case "create_trivia":
          if (!state.isLoading) {
            createTrivia()
              .then((data) => {
                dispatch({ type: "start_trivia", payload: data });
              })
              .catch((error) => {
                dispatch({ type: "error", payload: error });
              });
            return {
              ...state,
              isLoading: true,
            };
          }
          return state;
        case "error":
          return {
            ...state,
            isLoading: false,
            error: action.payload,
          };
        case "load_trivia":
          if (!state.isLoading) {
            getTrivia(action.payload)
              .then((data) => {
                if (!data) {
                  const error = new ReferenceError("Trivia game not found");
                  dispatch({ type: "error", payload: error });
                } else {
                  dispatch({ type: "start_trivia", payload: data });
                }
              })
              .catch((error) => {
                dispatch({ type: "error", payload: error });
              });
            return {
              ...state,
              isLoading: true,
            };
          }
          return state;
        case "start_trivia":
          const {
            trivia: { id, answers },
            questions,
          } = action.payload;
          return {
            triviaId: id,
            questions,
            answers,
            current: answers.length,
            isLoading: false,
            error: null,
          };
        case "reset":
          return initialState;
        default:
          throw new Error();
      }
    },
    [initialState]
  );

  const [state, dispatch] = useReducer(reducer, initialState);

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
