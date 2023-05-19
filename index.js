const express = require('express')
const cors = require('cors')
const app = express()
const logger = require('./loggerMiddleware')

app.use(cors())
app.use(express.json())
app.use(logger)

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
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

  const ids = notes.map(note => note.id)
  const maxId = Math.max(...ids)

  if (!note.content) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const newNote = {
    id: maxId + 1,
    content: note.content,
    date: new Date().toISOString,
    important: note.important
  }

  notes = [...notes,newNote]
  response.json(newNote)
})


// el siguiente middleware después de nuestras rutas, que se usa para capturar solicitudes realizadas a rutas inexistentes
app.use((request, response) => {
  response.status(404).json({
    error: 'Not found'
  })
})


const PORT = process.env.PORT || 3000
app.listen(PORT,() => {
  console.log(`Server running on port ${PORT}`)
})
