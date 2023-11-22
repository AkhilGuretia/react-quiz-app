// eslint-disable-next-line react/prop-types
const NextButton = ({ answer, dispatch }) => {
  if (answer === null) return null;

  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "nextQuestion" })}
    >
      next
    </button>
  );
};

export default NextButton;
