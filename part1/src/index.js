import React from 'react';
import ReactDOM from 'react-dom';

const Footer = () => (
    <div>
        greeting app created by me
    </div>
)

const Hello = (props) => {
    return (
        <div>
            <p>Hello {props.name}, you are {props.age} years old</p>
        </div>
    )
}

const App = () => {
    const name = 'Ramyres';
    const age = 18;

    return (
        <>
            <h1>Greetings</h1>
            <Hello name="Ana Maria" age={26 + 10} />
            <Hello name={name} age={age} />
            <Footer />
        </>
    )

}
ReactDOM.render(<App />, document.getElementById('root'));