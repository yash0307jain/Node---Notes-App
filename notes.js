const chalk = require('chalk');
const fs = require("fs");

const addNote = (title, body) => {
  const notes = loadNotes();
  // const duplicateNotes = notes.filter(note => note.title === title); // run until all notes title scanned even if it found duplicate one
  const duplicateNote = notes.find(note => note.title === title) // stop when it find first duplicate title

  if (!duplicateNote) {
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

const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter(note => note.title !== title)

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

const listNotes = () => {
  const notes = loadNotes();

  if(notes.length !== 0) {
    console.log(chalk.bgGreen.bold('Your notes'));
    notes.forEach(note => console.log('-> ' + chalk.blue.bold(note.title)));
  } else {
    console.log(chalk.bgRed.bold('No saved notes!'))
  }
}

const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find(note => note.title === title);

  if(note) {
    console.log(chalk.bgGreen.bold('Your note'));
    console.log(chalk.blue.bold(note.title) + ' -> ' + chalk.bold(note.body));
  } else {
    console.log(chalk.bgRed.bold('Note with this title not exist!'))
  }
}

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
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
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
};
