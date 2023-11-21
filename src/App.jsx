import { useEffect, useReducer } from "react";
import Header from "./Header";
import MainBody from "./MainBody";

const initialState = {
  questions: [],
  status: "loading", // loading, error, ready, active, finished
};

const reducer = (state, action) => {
  switch (action.type) {
    case "fetchData":
      return { ...state, questions: action.payload, status: "ready" };
    case "fetchFailed":
      return { ...state, status: "error" };
    default:
      throw new Error("Unknown action triggered");
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

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
        <p>Questions</p>
      </MainBody>
    </div>
  );
};

export default App;
