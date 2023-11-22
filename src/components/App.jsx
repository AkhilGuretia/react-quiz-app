import { useEffect, useReducer } from "react";
import Header from "./Header";
import MainBody from "./MainBody";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Questions from "./Questions";
import NextButton from "./NextButton";

const initialState = {
  questions: [],
  status: "loading", // loading, error, ready, active, finished
  index: 0,
  answer: null,
  points: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "fetchData":
      return { ...state, questions: action.payload, status: "ready" };
    case "fetchFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "newAnswer": {
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    }
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    default:
      throw new Error("Unknown action triggered");
  }
};

const App = () => {
  const [{ questions, status, index, answer }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const numQuestions = questions.length;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8000/questions");

        if (!res.ok)
          throw new Error("Something went wrong while fetching the data");

        const data = await res.json();

        dispatch({ type: "fetchData", payload: data });
      } catch (error) {
        dispatch({ type: "fetchFailed" });
      }
    };

    fetchData();
  }, []);

  return (
    <div className="app">
      <Header />

      <MainBody>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Questions
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton dispatch={dispatch} answer={answer} />
          </>
        )}
      </MainBody>
    </div>
  );
};

export default App;
