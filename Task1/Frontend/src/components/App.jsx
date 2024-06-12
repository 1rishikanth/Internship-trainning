import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

   async function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  function editNote(id, newTitle, newContent) {
    setNotes(prevNotes => {
      return prevNotes.map((noteItem, index) => {
        if (index === id) {
          return { title: newTitle, content: newContent };
        } else {
          return noteItem;
        }
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id1={index}
            id={noteItem.id}
           title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
            onEdit={editNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;