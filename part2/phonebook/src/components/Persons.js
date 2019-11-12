import React from 'react';

const Persons = ({ persons, filter }) => (
    persons
        .filter((person) => person.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0)
        .map((person) => <div key={person.name}>{person.name} {person.number}</div>)

);

export default Persons;
