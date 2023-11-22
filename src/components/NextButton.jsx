// eslint-disable-next-line react/prop-types
const NextButton = ({ index, numQuestions, answer, dispatch }) => {
  if (answer === null) return null;

  if (index + 1 < numQuestions)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        next
      </button>
    );
  if (index + 1 === numQuestions)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finished" })}
      >
        finish
      </button>
    );
};

export default NextButton;
