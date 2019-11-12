import React, { useState } from 'react'
import ReactDOM from 'react-dom';

import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ]);

    const [newPerson, setNewPerson] = useState({
        name: "",
        number: ""
    });

    const [filter, setFilter] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        if (persons.some((person) => person.name === newPerson.name)) {
            alert(`${newPerson.name} is already added to phonebook`)
            return;
        }
        const copy = [...persons];
        setPersons(copy.concat(newPerson));
        setNewPerson({
            name: "",
            number: ""
        })
    }

    const handleSearch = (e) => {
        setFilter(e.target.value);
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={filter} onChange={handleSearch}/>
            
            <h3>Add a new</h3>

            <PersonForm handleSubmit={handleSubmit} newPerson={newPerson} setNewPerson={setNewPerson}/>

            <h2>Numbers</h2>
            <Persons persons={persons} filter={filter} />
        </div>
    )
}

export default App

ReactDOM.render(<App />, document.getElementById('root'));