import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';

import axios from 'axios';

import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [filter, setFilter] = useState('')
    const [newPerson, setNewPerson] = useState({
        id: null,
        name: "",
        number: ""
    });

    useEffect(() => {
        axios
            .get("http://localhost:3001/persons")
            .then(result => {
                setPersons(result.data);
            })
    }, [])

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
            <Filter filter={filter} onChange={handleSearch} />

            <h3>Add a new</h3>

            <PersonForm handleSubmit={handleSubmit} newPerson={newPerson} setNewPerson={setNewPerson} />

            <h2>Numbers</h2>
            <Persons persons={persons} filter={filter} />
        </div>
    )
}

export default App

ReactDOM.render(<App />, document.getElementById('root'));