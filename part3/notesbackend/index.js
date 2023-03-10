const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2022-05-30T17:30:31.098Z",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2022-05-30T18:39:34.091Z",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2022-05-30T19:20:14.298Z",
    important: true
  }
]

app.get('/',(request,response) => {
  response.send('<h1>gday</h1>')
})

app.get('/api/notes', ( request, response ) => {
  response.json(notes)
})

app.get('/api/notes/:id', ( request, response ) => {
  const id = +request.params.id
  const note = notes.find( n => n.id === id )

  note 
  ? response.json(note)
  : response.status(404).end()
  
})

app.delete('/api/notes/:id', ( request, response ) => {
  const id = +request.params.id
  notes = notes.filter( n => n.id !== id )
  response.status(204).end()
})

const generateID = () => {
  return (notes.length > 0 ? Math.max(...notes.map( n => n.id )) : 0 ) + 1
}

app.post('/api/notes', ( request, response ) => {

  const body = request.body

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateID()
  }

//  console.log(note)

  notes  = notes.concat(note)
//console.log(notes)
  response.json(note)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})