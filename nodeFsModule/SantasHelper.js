// https://adventofcode.com/2015/day/1

const fs = require('fs');

// Async read file
fs.readFile('./santa.txt', (err, data) => {
  console.time('timeLabel'); // start timer
  if (err) {
    console.log('errored');
  }
  let down = 0;
  let up = 0;
  const content = data.toString('utf8');
  let charPosn = 0;

  for (char of content) {
    if (char === '(') {
      up++;
    } else if (char === ')') {
      down++;
    }
    charPosn++;
    if (up - down === -1) {
      console.log('At basement: posn', charPosn);
    }
  }
  const floor = up - down;
  console.log('Santa is at floor ', floor);
  console.timeEnd('timeLabel'); // end timer
});
