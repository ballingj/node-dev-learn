// const http = require('http')  // this is Common JS
import * as http from 'http' 

// const http = 'http'

const server = http.createServer((requests, response) => {
  console.log('headers:', requests.headers)
  console.log('method:', requests.method)
  console.log('url:', requests.url)

  // send a json body instead
  const user = {
    name: 'Jeff',
    hobby: 'coding'
  }
  response.setHeader('Content-Type', 'application/json') 
  response.end(JSON.stringify(user))

  // send a text/html instead
  //response.setHeader('Content-Type', 'text/html') 
  //response.end('<h1>Hellooooooo</h1>')

})

server.listen(3000)
