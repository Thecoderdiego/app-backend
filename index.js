require('dotenv').config()
require('./mongo')
const Note = require('./models/Note')
const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('./loggerMiddleware')

app.use(cors())
app.use(express.json())
app.use(logger)

// let notes = [
//   {
//     id: 1,
//     content: "HTML is easy",
//     date: "2019-05-30T17:30:31.098Z",
//     important: true
//   },
//   {
//     id: 2,
//     content: "Browser can execute only Javascript",
//     date: "2019-05-30T18:39:34.091Z",
//     important: false
//   },
//   {
//     id: 3,
//     content: "GET and POST are the most important methods of HTTP protocol",
//     date: "2019-05-30T19:20:14.298Z",
//     important: true
//   }
// ]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  console.log(id)
  const note = notes.find(note => note.id === id)
  note ? response.json(note) : response.status(404).end()
})

app.delete('/api/notes/:id',(request,response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)
  response.status(204).end()
})

app.post('/api/notes',(request,response) => {
  const note = request.body

  if (!note.content) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const newNote = new Note({
    content: note.content,
    date: new Date(),
    important: note.important
  })

  newNote.save().then(result => {
    response.json(result)
  })
})


// el siguiente middleware después de nuestras rutas, que se usa para capturar solicitudes realizadas a rutas inexistentes
app.use((request, response) => {
  response.status(404).json({
    error: 'Not found'
  })
})


const PORT = process.env.PORT
app.listen(PORT,() => {
  console.log(`Server running on port ${PORT}`)
})
