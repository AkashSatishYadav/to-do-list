import React from "react";
import "./UserToDo.css";
import {
  fetchNotesFromService,
  saveNoteToService,
  deleteNoteAtService,
} from "../../services/FetchService";
import { v4 as uuidv4 } from "uuid";

function UserToDo() {
  const [notes, setNotes] = React.useState([]);
  const TITLE_LIMIT = 150;
  const CONTENT_LIMIT = 10000;
  const titleRef = React.useRef(null);

  const [editingNote, setEditingNote] = React.useState(null); // the selected note
  const [editTitle, setEditTitle] = React.useState("");
  const [editContent, setEditContent] = React.useState("");
  const [isNew, setIsNew] = React.useState(false);
  const [deletingNote, setDeletingNode] = React.useState(null);

  const openEditor = (note) => {
    setEditingNote(note);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const closeEditor = () => {
    setEditingNote(null);
    setEditTitle("");
    setEditContent("");
    setIsNew(false);
  };

  const saveNote = () => {
    let note = { title: editTitle, content: editContent };
    if (isNew) {
      note.noteID = uuidv4();
      setNotes([note, ...notes]);
    } else {
      note.noteID = editingNote.noteID;
      let tempNotes = notes.filter((n) => n.noteID !== editingNote.noteID);
      setNotes([note, ...tempNotes]);
    }
    saveNoteToService(note, isNew);
    closeEditor();
  };
  const addNote = () => {
    setEditingNote({});
    setIsNew(true);
  };

  const handleDelete = (event, note) => {
    event.stopPropagation();
    setDeletingNode(note);
  };

  const deleteNode = () => {
    setNotes(notes.filter((note) => note.noteID !== deletingNote.noteID));
    setDeletingNode(null);
    deleteNoteAtService(deletingNote.noteID);
    closeEditor();
  };
  const closeModal = () => {
    setDeletingNode(null);
  };
  React.useEffect(() => {
    if (isNew) {
      titleRef.current.focus();
    }
  }, [isNew]);

  React.useEffect(() => {
    const fetchNotes = async () => {
      const data = await fetchNotesFromService();
      setNotes(data);
    };

    fetchNotes();
  }, []);

  return (
    <div className="user-to-do">
      <h2>User Notes</h2>
      <div className="notes-grid">
        <div className="note-card" onClick={addNote}>
          <h1>+</h1>
        </div>
        {notes.map((note) => (
          <div
            className="note-card"
            key={note.noteID}
            onClick={() => openEditor(note)}
          >
            <button
              className="cancel-button"
              onClick={(event) => handleDelete(event, note)}
            >
              X
            </button>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
          </div>
        ))}
      </div>

      {editingNote && (
        <div className="modal">
          <div className="modal-content">
            <input
              ref={titleRef}
              type="text"
              maxLength={TITLE_LIMIT}
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Title"
            />
            <p className="char-counter">
              {editTitle.length}/{TITLE_LIMIT}
              {editTitle.length === TITLE_LIMIT ? (
                <span className="limit-reached"> – Limit reached</span>
              ) : TITLE_LIMIT - editTitle.length <= 10 ? (
                <span className="warning"> – Almost at limit</span>
              ) : null}
            </p>
            <textarea
              maxLength={CONTENT_LIMIT}
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              placeholder="Take a note..."
            />
            <p className="char-counter">
              {editContent.length}/{CONTENT_LIMIT}
              {editContent.length === CONTENT_LIMIT ? (
                <span className="limit-reached"> – Limit reached</span>
              ) : CONTENT_LIMIT - editContent.length <= 100 ? (
                <span className="warning"> – Almost at limit</span>
              ) : null}
            </p>
            <div className="modal-buttons">
              <button
                onClick={saveNote}
                disabled={!editTitle.trim() || !editContent.trim()}
              >
                Save
              </button>
              <button onClick={closeEditor}>Cancel</button>
              {Object.keys(editingNote).length > 0 && (
                <button
                  className="modal-delete"
                  onClick={(event) => handleDelete(event, editingNote)}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      {deletingNote && (
        <div className="modal">
          <div className="delete-modal-content">
            <h2>Are you sure?</h2>
            <button className="cancel-button modal-close" onClick={closeModal}>
              X
            </button>
            <p>
              Do you really want to delete this note? This operation cannot be
              undone
            </p>
            <div className="modal-buttons">
              <button onClick={closeModal}>Cancel</button>
              <button className="modal-delete" onClick={deleteNode}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserToDo;
