import React from 'react';

const Persons = ({ persons, filter, deleteClick }) => (
    persons
        .filter((person) => person.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0)
        .map((person) =>
            <p key={person.name}>
                {person.name} {person.number} <button onClick={() => deleteClick(person)}>Delete</button>
            </p>
        )
);

export default Persons;
