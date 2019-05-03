const chalk = require('chalk');
const fs = require("fs");

const getNotes = function() {
  return "Your notes...";
};

const addNote = function(title, body) {
  const notes = loadNotes();
  const duplicateNotes = notes.filter(function(note) {
    return note.title === title;
  });

  if (duplicateNotes.length == 0) {
    notes.push({
      title: title,
      body: body
    });

    saveNotes(notes);
    console.log(chalk.bgGreen.bold("New note added!"));
  } else {
    console.log(chalk.bgRed.bold("Note title taken!"));
  }
};

const removeNote = function(title) {
  const notes = loadNotes();
  const notesToKeep = notes.filter(function(note) {
    return note.title !== title;
  })

  if(notes.length > notesToKeep.length) {
    console.log(chalk.bgGreen.bold('Note removed!'));
    saveNotes(notesToKeep);
  } else {
    console.log(chalk.bgRed.bold('Note with this title not exist!'));
  }

  // const noteToRemove = notes.filter(function(note) {
  //   return note.title === title;
  // });

  // if (noteToRemove.length === 1) {
  //   notes.pop({
  //     title: noteToRemove.title,
  //     body: noteToRemove.body
  //   });
  //   saveNotes(notes);
  //   console.log(chalk.bgGreen.bold('Note removed!'));
  // } else {
  //   console.log(chalk.bgRed.bold('Note with this title not exist!'));
  // }
}

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
  addNote: addNote,
  removeNote: removeNote
};
