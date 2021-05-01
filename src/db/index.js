import mongoose from 'mongoose'

mongoose.connect('mongodb+srv://Carlos:Qox91289@cluster0.zn0ou.mongodb.net/tasks?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true})
.then((db) => {
    console.log('DB Connected successfully!')
})
.catch((err) => {
    console.log('Unable to connect')
})

module.exports = mongoose
