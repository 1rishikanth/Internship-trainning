import React, { useState } from "react";
import axios from "axios";

function Note(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(props.title);
  const [editedContent, setEditedContent] = useState(props.content);

  async function handleDeleteClick() {
    props.onDelete(props.id1);
    try{
      await axios.delete(`http://localhost:3001/note/${props.id1}`);
    }
    catch{
       console.log("error");
    }
}

  function handleEditClick() {
    setIsEditing(true);
  }

  async function handleSaveClick() {
    props.onEdit(props.id1, editedTitle, editedContent);
      setIsEditing(false);
    try {
      await axios.patch(`http://localhost:3001/update/${props.id}`, {
        title: editedTitle,
        content: editedContent
      });
    } catch (error) {
      console.log("error", error);
    }
  }

  function handleTitleChange(event) {
    setEditedTitle(event.target.value);
  }

  function handleContentChange(event) {
    setEditedContent(event.target.value);
  }

  return (
    <div className="note">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedTitle}
            onChange={handleTitleChange}
          />
          <br></br>
          <textarea
            value={editedContent}
            onChange={handleContentChange}
            rows="2"
          />
          <button id="save" onClick={handleSaveClick}>SAVE</button>
        </div>
      ) : (
        <div>
          <h1>{props.title}</h1>
          <p>{props.content}</p>
          <button id="edit" onClick={handleEditClick}>EDIT</button>
          <button id="delete" onClick={handleDeleteClick}>DELETE</button>
          
        </div>
      )}
    </div>
  );
}


export default Note;