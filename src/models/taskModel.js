import mongoose from 'mongoose'

const Schema = mongoose.Schema

const TaskModel = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user: {
        ref: 'user',
        type: String
    },
    is_public: {
        type: Boolean,
        default: false
    }
},
{
    versionKey: false,
    timestamps: true
})


export default mongoose.model('task', TaskModel)