import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Statistic = ({ text, value }) => (
    <tr>
        <td>{text}</td>
        <td> {value}</td>
    </tr>
);

const Statistics = ({ good, neutral, bad }) => {
    let total = good + neutral + bad;
    if (total <= 0) {
        return <p>No feedback given</p>
    }
    return (
        <table>
            <tbody>
                <Statistic text="Good" value={good} />
                <Statistic text="Neutral" value={neutral} />
                <Statistic text="Bad" value={bad} />
                <Statistic text="All" value={total} />
                <Statistic text="Average" value={(good * 1 + neutral * 0 + bad * -1) / total} />
                <Statistic text="Positive" value={`${(good * 100) / total}%`} />
            </tbody>
        </table>
    );
}

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>;

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h1>Give your feedback</h1>
            <Button onClick={() => setGood(good + 1)} text="Good" />
            <Button onClick={() => setNeutral(neutral + 1)} text="Neutral" />
            <Button onClick={() => setBad(bad + 1)} text="Bad" />

            <hr />
            <h1>Statistics</h1>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
