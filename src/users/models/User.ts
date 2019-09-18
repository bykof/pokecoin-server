import { prop, Typegoose, ModelType, InstanceType, staticMethod, instanceMethod } from '@hasezoey/typegoose'
import * as crypto from 'crypto'
import { sign as signJWT, verify as verifyJWT } from 'jsonwebtoken'
import { JWT_SECRET } from '../../env'

export class User extends Typegoose {
    @prop({ required: true, unique: true })
    username: string

    @prop({ required: true })
    password: string

    @staticMethod
    static hashPassword(this: ModelType<User> & typeof User, password: crypto.BinaryLike): string {
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
    ): Promise<InstanceType<User>> {
        const decodedToken = this.decodeJSONWebToken(token)
        if (decodedToken) {
            return await this.findOne({ username: decodedToken['username'] })
        }
    }

    @instanceMethod
    generateJSONWebToken(this: InstanceType<User>): string {
        // TODO: change secret
        return signJWT(
            { username: this.username },
            JWT_SECRET,
            { expiresIn: 60 * 60 * 24 }
        )
    }
}

export const UserModel = new User().getModelForClass(User)
