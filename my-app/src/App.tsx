import React, { useState, useContext } from 'react';
import './App.css';
import { dummyNotesList } from './constants';
import ThemeProvider, { ThemeContext } from './themeContext';

function App() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const toggleFavorite = (noteTitle: string) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(noteTitle)
        ? prevFavorites.filter((title) => title !== noteTitle)
        : [...prevFavorites, noteTitle]
    );
  };

  return (
    <div className="app-container" style={{ backgroundColor: theme.background, color: theme.foreground }}>
      <form className="note-form">
        <div>
          <input placeholder="Note Title"></input>
        </div>
        <div>
          <textarea></textarea>
        </div>
        <div>
          <select name="label" id="label">
            <option value="">--Please choose an option--</option>
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="study">Study</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <button type="submit">Create Note</button>
        </div>
        <div>
          <button type="button" onClick={toggleTheme}>
            Toggle Theme
          </button>
        </div>
      </form>

      <div className="notes-grid">
        {dummyNotesList.map((note) => (
          <div
            key={note.id}
            className="note-item"
            style={{ backgroundColor: theme.background, color: theme.foreground }}
          >
            <div className="notes-header">
              <span
                className={`favorite-icon ${favorites.includes(note.title) ? 'favorited' : ''}`}
                onClick={() => toggleFavorite(note.title)}
              >
                {favorites.includes(note.title) ? '❤️' : '🤍'}
              </span>
              <button>x</button>
            </div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <p>{note.label}</p>
          </div>
        ))}
      </div>

      <div className="favorite-notes">
        <h3>List of favorites:</h3>
        <ul>
          {favorites.length > 0 ? (
            favorites.map((favorite, index) => <li key={index}>{favorite}</li>)
          ) : (
            <li>No favorite notes yet.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
