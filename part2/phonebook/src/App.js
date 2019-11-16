import React, { useState, useEffect } from 'react'

import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';

import personsService from './services/persons-service';

const App = () => {
    const clearPerson = {
        id: null,
        name: "",
        number: ""
    };
    const [persons, setPersons] = useState([]);
    const [filter, setFilter] = useState('')
    const [newPerson, setNewPerson] = useState(clearPerson);

    useEffect(() => {
        personsService.getAll()
            .then(personsList => {
                setPersons(personsList);
            })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        const personFounded = persons.filter(p => p.name === newPerson.name)[0] || null;
        if (personFounded) {
            if (window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
                personsService.update(personFounded.id, newPerson)
                    .then(updatedPerson => {
                        setPersons(persons.map(p => (p.id !== updatedPerson.id) ? p : updatedPerson));
                        setNewPerson(clearPerson);
                    })
                    .catch(err => {
                        console.error(err);
                        alert('Can\'t save person!');
                    })
            }
            return;
        }
        personsService.create(newPerson)
            .then(saved => {
                setPersons(persons.concat(saved));
                setNewPerson(clearPerson);
            })
            .catch(err => {
                console.error(err);
                alert('Can\'t save person!');
            })
    }

    const deleteOf = personToDelete => {
        if (window.confirm(`Delete ${personToDelete.name}?`)) {
            personsService.drop(personToDelete.id)
                .then(result => {
                    console.log(result);
                    setPersons(persons.filter(p => p.name !== personToDelete.name))
                })
                .catch(err => {
                    console.error(err);
                    alert('Can\'t delete person!');
                })
        }
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
            <Persons persons={persons} filter={filter} deleteClick={deleteOf} />
        </div>
    )
}

export default App