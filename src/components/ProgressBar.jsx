// eslint-disable-next-line react/prop-types
const ProgressBar = ({ index, points, numQuestions, maxPoints, answer }) => {
  return (
    <div className="progress">
      <progress max={15} value={index + Number(answer !== null)} />

      <p>
        Question <strong>{index + 1}</strong>/{numQuestions}
      </p>

      <p>
        <strong>{points}</strong>/{maxPoints}
      </p>
    </div>
  );
};

export default ProgressBar;
