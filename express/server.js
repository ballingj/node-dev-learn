const express = require('express')
const app = express()
const port = 3001

//middleware for body-parser
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// middleware to server static files index.html, styles.css scripts.js
app.use(express.static(__dirname + '/public'))

app.get('/profile', (req, res) => {
   res.send("This should be a post request.")
})

app.post('/profile', (req, res) => {
  const user = {
    name: "Jeff",
    hobby: "coding"
  }
  res.send(user)
})

app.get('/name-body', (req, res) => {
  res.send("getting name-body")
})

app.post('/name-body', (req, res) => {
  console.log(req.body)
  res.send(`body received: ${req.body.message}`)
})

app.get('/req', (req, res) => {
  // 
  // console.log(req.query)
  // req.body
  console.log(req.headers)
  // req.
  res.send("got it")
})



// Define the listening port of the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

