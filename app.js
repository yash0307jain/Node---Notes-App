const yargs = require('yargs');
const notes = require('./notes');

// Create a add command
yargs.command({
  command: 'add',
  describe: 'Adding a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string'
    }
  },
  handler: function(argv) {
    notes.addNote(argv.title, argv.body);
  }
})

// Create a remove command
yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler: function(argv) {
    notes.removeNote(argv.title);
  }
})

// Create a list command
yargs.command({
  command: 'list',
  describe: 'List your notes',
  handler: function() {
    console.log('Listing out your notes.')
  }
})

// Create a read command
yargs.command({
  command: 'read',
  describe: 'Read a note',
  handler: function() {
    console.log('Reading a notes.')
  }
})

yargs.parse();
// console.log(yargs.argv);
