import mongoose from 'mongoose'

const Schema = mongoose.Schema

const RoleModel = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
},{
    versionKey: false,
    timestamps: true
})

export default mongoose.model('role', RoleModel)