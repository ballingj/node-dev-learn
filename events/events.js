// Docs
// https://nodejs.org/api/events.html#events_events

const EventEmitter = require('events');
const celebrity = new EventEmitter();

// The subscribers are the listener function of events
// Subscribe to celebrity for observer 1
celebrity.on('race', (result) => {
  if (result === 'win') {
    console.log('Congratulations!  You are the best!');
  }
})

// Subscribe to celebrity for observer 2
celebrity.on('race', (result) => {
  if (result === 'win') {
    console.log('Boo, I could have done better!');
  };
  // process is an instance of EvenEmitter
  process.on('exit', (code) => {
    console.log('Process exit event with code: ', code);
  });
});


// These are the event triggers
celebrity.emit('race', 'win');
celebrity.emit('race', 'lost');
celebrity.emit('race', 'win');
