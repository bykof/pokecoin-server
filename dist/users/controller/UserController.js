"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../models/User");
const UserAlreadyExistsError_1 = require("../errors/UserAlreadyExistsError");
const UserNotFoundError_1 = require("../errors/UserNotFoundError");
const PasswordIncorrectError_1 = require("../errors/PasswordIncorrectError");
class UserController {
    /**
     * Register a user by his username and password
     *
     * @param request
     * @param reply
     */
    static register(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield new User_1.UserModel({
                    username: request.body.username,
                    password: User_1.UserModel.hashPassword(request.body.password),
                }).save();
                return reply.send(user);
            }
            catch (error) {
                // Duplicate entry
                if (error.code === 11000)
                    return reply.status(400).send(new UserAlreadyExistsError_1.default(request.body.username));
                return reply.status(500).send(error);
            }
        });
    }
    /**
     * Login a user by username and password in the request body
     *
     * @param request
     * @param reply
     */
    static login(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.UserModel.findOne({ username: request.body.username });
                if (user) {
                    if (user.password === User_1.UserModel.hashPassword(request.body.password)) {
                        return reply.send({ token: user.generateJSONWebToken() });
                    }
                    else {
                        return reply.status(400).send(new PasswordIncorrectError_1.default(request.body.username));
                    }
                }
                else {
                    return reply.status(400).send(new UserNotFoundError_1.default(request.body.username));
                }
            }
            catch (error) {
                return reply.status(500).send(error);
            }
        });
    }
    /**
     * Get information of current user
     *
     * @param request
     * @param reply
     */
    static me(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            return reply.send(request.user);
        });
    }
    /**
     * Change password of user if the given password is the same as current
     *
     * @param request
     * @param reply
     */
    static changePassword(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = User_1.UserModel.hashPassword(request.body.password);
            if (hashedPassword === request.user.password) {
                request.user.password = User_1.UserModel.hashPassword(request.body.newPassword);
                yield request.user.save();
                return reply.status(201).send();
            }
            return reply.status(400).send(new PasswordIncorrectError_1.default(request.user.username));
        });
    }
}
exports.default = UserController;
//# sourceMappingURL=UserController.js.map