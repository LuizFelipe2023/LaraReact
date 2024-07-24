import React, { useEffect, useState } from "react";
import axios from "axios";
import '../css/main.css';

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editing, setEditing] = useState(false); 
  const [currentNote, setCurrentNote] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const response = await axios.get("http://localhost:8000/api/notes");
    setNotes(response.data);
  };

  const addNote = async () => {
    const response = await axios.post("http://localhost:8000/api/notes", {
      title,
      content,
    });
    setNotes([...notes, response.data]);
    setTitle("");
    setContent("");
  };

  const deleteNote = async (id) => {
    await axios.delete(`http://localhost:8000/api/notes/${id}`);
    setNotes(notes.filter((note) => note.id !== id));
  };

  const editNote = (note) => {
    setEditing(true);
    setCurrentNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const updateNote = async () => {
    const response = await axios.put(
      `http://localhost:8000/api/notes/${currentNote.id}`,
      {
        title,
        content,
      }
    );
    setNotes(
      notes.map((note) => (note.id === currentNote.id ? response.data : note))
    );
    setEditing(false);
    setCurrentNote(null);
    setTitle("");
    setContent("");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>Bloco de Anotações</h1>
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Conteúdo"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          {editing ? (
            <button onClick={updateNote}>Atualizar Anotação</button>
          ) : (
            <button onClick={addNote}>Adicionar Anotação</button>
          )}
          <ul>
            {notes.map((note) => (
              <li key={note.id}>
                <h2>{note.title}</h2>
                <p>{note.content}</p>
                <button onClick={() => editNote(note)}>Editar</button>
                <button onClick={() => deleteNote(note.id)}>Excluir</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NoteList;
