import React from 'react';

// import { Container } from './styles';

const PersonForm = ({ handleSubmit, setNewPerson, newPerson }) => {
    const updatePerson = (field, value) => {
        const copy = { ...newPerson };
        copy[field] = value;
        setNewPerson(copy);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                name: <input value={newPerson.name} onChange={(e) => updatePerson('name', e.target.value)} />
            </div>
            <div>
                number: <input value={newPerson.number} onChange={(e) => updatePerson('number', e.target.value)} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
};

export default PersonForm;
