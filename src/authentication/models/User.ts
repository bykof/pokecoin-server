import { prop, Typegoose, ModelType, InstanceType, staticMethod, instanceMethod } from 'typegoose'
import * as crypto from 'crypto'
import { sign as signJWT, verify as verifyJWT } from 'jsonwebtoken'

class User extends Typegoose {
    @prop({ required: true, unique: true })
    username: String

    @prop({ required: true })
    password: String

    @staticMethod
    static hashPassword(this: ModelType<User> & typeof User, password: crypto.BinaryLike): String {
        return crypto.createHash('sha256').update(password).digest('hex')
    }

    @staticMethod
    static verifyJSONWebToken(this: ModelType<User> & typeof User, token: string): boolean {
        try {
            // TODO: change secret
            const decoded = verifyJWT(token, 'secret');
            return true
        } catch (error) {
            return false
        }
        return false
    }

    @instanceMethod
    generateJSONWebToken(this: InstanceType<User>) {
        // TODO: change secret
        return signJWT(
            { username: this.username },
            'secret',
            { expiresIn: 60 * 60 }
        );
    }
}

export default new User().getModelForClass(User)
