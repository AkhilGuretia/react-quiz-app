// eslint-disable-next-line react/prop-types
const FinishScreen = ({ points, maxPoints, highScore }) => {
  const percentage = (points / maxPoints) * 100;

  const emoji =
    percentage === 0
      ? "🤦‍♂️"
      : percentage > 0 && percentage <= 50
      ? "🤔"
      : percentage > 50 && percentage < 80
      ? "😃"
      : percentage >= 80 && percentage < 100
      ? "🎉"
      : percentage === 100
      ? "🥇"
      : "";

  return (
    <div>
      <p className="result">
        <span>{emoji}</span> You scored
        <strong> {points}</strong> out of {maxPoints} points (
        {Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highScore} points)</p>
    </div>
  );
};

export default FinishScreen;
