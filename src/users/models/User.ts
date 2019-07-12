import { prop, Typegoose, ModelType, InstanceType, staticMethod, instanceMethod } from 'typegoose'
import { DocumentQuery } from 'mongoose'
import * as crypto from 'crypto'
import { sign as signJWT, verify as verifyJWT } from 'jsonwebtoken'

export class User extends Typegoose {
    @prop({ required: true, unique: true })
    username: String

    @prop({ required: true })
    password: String

    @staticMethod
    static hashPassword(this: ModelType<User> & typeof User, password: crypto.BinaryLike): String {
        return crypto.createHash('sha256').update(password).digest('hex')
    }

    @staticMethod
    static decodeJSONWebToken(this: ModelType<User> & typeof User, token: string): Object | null {
        try {
            // TODO: change secret
            return verifyJWT(token, 'secret')
        } catch (error) {
            // Since I know that the error will be an unverified jwt token
            // i can return null and don't log an error
            return null
        }
        return null
    }

    @staticMethod
    static async getUserByJSONWebToken(
        this: ModelType<User> & typeof User,
        token: string
    ): DocumentQuery<InstanceType<User>, InstanceType<User>, {}> {
        const decodedToken = this.decodeJSONWebToken(token)
        if (decodedToken) {
            return await this.findOne({ username: decodedToken['username'] })
        }
    }

    @instanceMethod
    generateJSONWebToken(this: InstanceType<User>): String {
        // TODO: change secret
        return signJWT(
            { username: this.username },
            'secret',
            { expiresIn: 60 * 60 * 24 }
        )
    }
}

export const UserModel = new User().getModelForClass(User)
