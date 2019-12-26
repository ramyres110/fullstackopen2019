const express = require('express');
const BodyParser = require('body-parser');

const PORT = 3001;

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    },
    {
        "id": 5,
        "name": "Ramyres",
        "number": "62999363640"
    }
];

const app = express();

app.use(BodyParser.json());

/** 3.2 */
app.get('/info', (req, res) => {
    const template = `
    <p>Phonebook has info for ${persons.length} people<p/>
    <p>${new Date()}<p/>
    `;
    res.status(200).send(template);
});

/** 3.1 */
app.get('/api/persons', (req, res) => {
    res.status(200).json(persons);
});

/** 3.3 */
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find(person => person.id === id);
    if (person) {
        res.json(person);
    } else {
        res.status(404).end();
    }
});

/** 3.4 */
app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter(person => person.id !== id);
    res.status(204).end();
});

/** 3.5, 3.6 */
app.post('/api/persons', (req, res) => {
    const newPerson = req.body;
    if (!newPerson.name) {
        return res.status(400).json({
            error: 'name missing'
        })
    }
    if (!newPerson.number) {
        return res.status(400).json({
            error: 'number missing'
        })
    }
    if (persons.some(person => person.name === newPerson.name)) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }

    const newID = Math.floor(Math.random() * 10000);
    newPerson.id = newID;
    persons = persons.concat(newPerson);
    res.json(newPerson);
});


app.listen(PORT, () => {
    console.log(`Phonebook Server Listening on ${PORT}`);
});