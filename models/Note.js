const {Schema,model} = require('mongoose')

const noteSchema = new Schema({
  content: String,
  date: Date,
  important: Boolean,
})

noteSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  }
})
 
const Note = model('Note',noteSchema)

// Encontrar todos los documents [{...}]
// Note.find({}).then((result) => {
//   console.log(result)
//   mongoose.connection.close()
// })

// const note = new Note({
//   content: 'Tratando de eliminar _id y __v',
//   date: new Date(),
//   important: false,
// })


// note.save().then((result) => {
//   console.log('Note saved')
//   // console.log(result)
//   mongoose.connection.close()
// })

module.exports = Note