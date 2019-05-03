const fs = require("fs");

const getNotes = function() {
  return "Your notes...";
};

const addNote = function(title, body) {
  const notes = loadNotes();
  const duplicateNotes = notes.filter(function(note) {
    return note.title === title;
  });

  if (duplicateNotes === 0) {
    notes.push({
      title: title,
      body: body
    });

    saveNotes(notes);
    console.log("New note added!");
  } else {
    console.log("Note title taken!");
  }
};

const saveNotes = function(notes) {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = function() {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    const data = JSON.parse(dataJSON);
    return data;
  } catch (error) {
    return [];
  }
};

module.exports = {
  getNotes: getNotes,
  addNote: addNote
};
