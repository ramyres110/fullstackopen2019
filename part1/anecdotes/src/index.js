import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = ({ anecdotes }) => {
    const [selected, setSelected] = useState(0);
    const [votes, setVotes] = useState(new Uint8Array(anecdotes.length));
    const [mostIndex, setMostIndex] = useState(0);

    const getMostIndex = (arr) => {
        return arr.indexOf(Math.max(...arr));
    }

    const handlerClickNext = () => {
        let nextIndex = selected;
        do {
            nextIndex = Math.round(Math.random() * (anecdotes.length - 1));
        } while (nextIndex === selected);
        setSelected(nextIndex);
    }

    const handlerClickVote = () => {
        let copy = [...votes];
        copy[selected] = copy[selected] + 1;
        setMostIndex(getMostIndex(copy));
        setVotes(copy);
    }

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <p>
                "{anecdotes[selected]}"
            </p>
            <p>
                has {votes[selected]} votes
            </p>
            <button onClick={handlerClickVote}>Vote</button>
            <button onClick={handlerClickNext}>Next anecdote</button>

            <h1>Anecdote with most votes</h1>
            <p>"{anecdotes[mostIndex]}"</p>
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)