import React, { useState, useEffect } from 'react';

import Note from './components/Note';
import axios from 'axios';

const App = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('A new note...');
    const [showAll, setShowAll] = useState(true);

    useEffect(() => {
        console.log('effect...');
        axios
            .get('http://localhost:3001/notes')
            .then(response => {
                const notes = response.data;
                console.log('promise fulfilled')
                console.log(notes)
                setNotes(notes)
            })

    }, [])
    console.log('render', notes.length, 'notes');


    const notesToShow = showAll ? notes : notes.filter((n) => n.important);

    const rows = () => notesToShow.map(note => <Note key={note.id} note={note} />);

    const addNote = (event) => {
        event.preventDefault();
        console.log('Submited', event.target);
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() > 0.5,
            id: notes.length + 1,
        }

        setNotes(notes.concat(noteObject))
        setNewNote('')
    }

    const handleNoteChange = (event) => {
        console.log(event.target.value);
        setNewNote(event.target.value);
    }

    return (
        <div>
            <h1>Notes</h1>
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all'}
                </button>
            </div>
            <ol>
                {rows()}
            </ol>
            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNoteChange} />
                <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default App;