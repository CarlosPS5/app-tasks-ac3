import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const Schema = mongoose.Schema

const UserModel = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        ref: 'role',
        type: Schema.Types.ObjectId
    }
},
{
    versionKey: false,
    timestamps: true
})

UserModel.statics.encode = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password,salt)
}

UserModel.statics.compare = (password,encodedPass) => {
    return bcrypt.compare(password,encodedPass)
}

export default mongoose.model('user', UserModel)

