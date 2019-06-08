import { prop, Typegoose, ModelType, InstanceType, staticMethod } from 'typegoose'
import * as crypto from 'crypto'

class User extends Typegoose {
    @prop({required: true, unique: true})
    username: String

    @prop({required: true, unique: true})
    email: String

    @prop({required: true})
    password: String

    @staticMethod
    static hashPassword(this: ModelType<User> & typeof User, password: crypto.BinaryLike): String {
        return crypto.createHash('sha256').update(password).digest('hex')
    }
}

export default new User().getModelForClass(User)
