import axios from "axios";
import React, { useState } from "react";
function CreateArea(props) {
   const [note, setNote] = useState({
    id:0,
    title: "",
    content: ""
  });

  async function handleChange(event) {
    const { name, value } = event.target;
    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
    event.preventDefault();
  }

  async function submitNote(event) {
    props.onAdd(note);
    setNote({
      id:note.id+1,
      title: "",
      content: ""
    });
    event.preventDefault();
    try{
        await axios.post('http://localhost:3001/',{note});
    }
    catch{
           console.log("error");
    }
  }
  return (
    <div>
      <form>
        <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        />
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows="3"
        />
        <button onClick={submitNote}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
