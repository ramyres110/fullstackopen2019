import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Footer = () => (
    <div>
        greeting app created by me
    </div>
)

const Hello = ({ name, age }) => {
    const bornYear = () => new Date().getFullYear() - age;
    return (
        <div>
            <p>
                Hello {name}, you are {age} years old
            </p>
            <p>So you were probably born in {bornYear()}</p>
        </div>
    )
}

const Display = ({ counter }) => <div>{counter}</div>;

const Button = ({ onClick, text }) => (<button onClick={onClick}>{text}</button>);

const History = (props) => {
    if (props.allClicks.length === 0) {
        return (
            <div>the app is used by pressing the buttons</div>
        )
    }
    // debugger;
    return (
        <div>button press history: {props.allClicks.join(' ')}</div>
    )
}

const App = () => {
    const name = 'Ramyres';
    const age = 18;
    const [counter, setCounter] = useState(0);

    const [left, setLeft] = useState(0)
    const [right, setRight] = useState(0)
    const [allClicks, setAll] = useState([])

    // setTimeout(() => {
    //     setCounter(counter + 1);
    // }, 1000);

    console.log('rendering...', counter);

    // const increaseByOne = () => setCounter(counter + 1);
    // const setToZero = () => setCounter(0);
    const setToValue = (value) => setCounter(value);

    const handleLeftClick = () => {
        setAll(allClicks.concat('L'))
        setLeft(left + 1)
    }

    const handleRightClick = () => {
        setAll(allClicks.concat('R'))
        setRight(right + 1)
    }

    return (
        <>
            <h1>Greetings</h1>
            <Hello name="Ana Maria" age={26 + 10} />
            <Hello name={name} age={age} />
            <Footer />
            <hr />
            <Display counter={counter} />
            <Button text="Plus" onClick={() => setToValue(counter + 1)}></Button>
            <Button text="Minus" onClick={() => setToValue(counter - 1)}></Button>
            <Button text="Reset" onClick={() => setToValue(0)}></Button>
            <hr />
            <div>
                {left}
                <Button onClick={handleLeftClick} text="left" />
                <Button onClick={handleRightClick} text="right" />
                {right}
                <History allClicks={allClicks} />
            </div>
        </>
    )

}



ReactDOM.render(<App />, document.getElementById('root'));

