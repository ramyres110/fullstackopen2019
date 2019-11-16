import React, { useState, useEffect } from 'react'

import Notification from './components/Notification';
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

    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

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
                        showErrorMessage('Can\'t save person!');
                    })
            }
            return;
        }
        personsService.create(newPerson)
            .then(saved => {
                setPersons(persons.concat(saved));
                setNewPerson(clearPerson);
                showSuccessMessage(`Added ${saved.name}`);
            })
            .catch(err => {
                console.error(err);
                showErrorMessage('Can\'t save person!');
            })
    }

    const handleSearch = (e) => {
        setFilter(e.target.value);
    }

    const showSuccessMessage = msg => {
        setSuccessMessage(msg);
        setTimeout(() => {
            setSuccessMessage(null)
        }, 5000)
    }

    const showErrorMessage = msg => {
        setErrorMessage(msg);
        setTimeout(() => {
            setErrorMessage(null)
        }, 5000)
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
                    showErrorMessage(`Infomation of ${personToDelete.name} has already been removed from server`);
                })
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>

            <Notification message={errorMessage} type="error" />
            <Notification message={successMessage} type="success" />

            <hr />
            <h3>Add a new</h3>
            <PersonForm handleSubmit={handleSubmit} newPerson={newPerson} setNewPerson={setNewPerson} />

            <hr />
            <h3>Filter</h3>
            <Filter filter={filter} onChange={handleSearch} />

            <h4>Numbers</h4>
            <Persons persons={persons} filter={filter} deleteClick={deleteOf} />
        </div>
    )
}

export default App