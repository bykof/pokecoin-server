import {Schema, model} from 'mongoose'

const UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
})

class User {

}

UserSchema.loadClass(User)
const userModel = model('User', UserSchema)
export default userModel
