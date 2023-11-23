import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
const Timer = ({ timeTillAutoSubmit, dispatch }) => {
  const mins = Math.floor(timeTillAutoSubmit / 60);
  const secs = timeTillAutoSubmit % 60;
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "TickTock" });
    }, 1000);

    return () => clearInterval(id);
  }, [dispatch]);

  return (
    <div className="timer">
      {mins < 10 ? "0" : ""}
      {mins}:{secs < 10 ? "0" : ""}
      {secs}
    </div>
  );
};

export default Timer;
