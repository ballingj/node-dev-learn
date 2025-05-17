const fs = require('fs');

// Async read file
fs.readFile('./hello.txt', (err, data) => {
  console.time('anyLabel')
  if (err) {
    console.log('errored');
  }
  console.log('Async', data.toString('utf8'));
  console.timeEnd('anyLabel')
});

// sychronous readfile
const fileRead = fs.readFileSync('./hello.txt');
console.log('Sync', fileRead.toString());

// appending to file
// fs.appendFile('./hello.txt', ' This is cool!', (err) => {
//   if (err) {
//     console.log(err);
//   }
// });

// Write
// fs.writeFile('./bye.txt', 'Sad to see you go go', (err) => {
//   if (err) {
//     console.log(err);
//   }
// });

// Delete file
// fs.unlink('./bye.txt', err => {
//   if (err) {
//     console.log(err)
//   }
//   console.log("Deleted your file 'bye.txt'")
// })

