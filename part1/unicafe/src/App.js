import { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const StatisticLine = ({ label, value }) => (
  <tr>
    <td>{label} </td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad, total, average, positive }) => {
  if (total === 0) {
    return <p>No Feedbacks Given</p>;
  }
  return (
    <table>
      <tbody>
        <StatisticLine label="good" value={good} />
        <StatisticLine label="neutral" value={neutral} />
        <StatisticLine label="bad" value={bad} />
        <StatisticLine label="total" value={total} />
        <StatisticLine label="average" value={average} />
        <StatisticLine label="positive" value={positive + "%"} />
      </tbody>
    </table>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
    setTotal(total + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
    setTotal(total + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
    setTotal(total + 1);
  };

  const average = ((good - bad) / total) * 100;
  const positive = (good / total) * 100;

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text="good"></Button>
      <Button handleClick={handleNeutralClick} text="neutral"></Button>
      <Button handleClick={handleBadClick} text="bad"></Button>
      <h2>Statistics</h2>
      {total !== 0 ? (
        <Statistics
          good={good}
          bad={bad}
          neutral={neutral}
          total={total}
          positive={positive}
          average={average}
        />
      ) : (
        <p>No Feedbacks Given</p>
      )}
    </div>
  );
};

export default App;
