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
exports.UserController = void 0;
const models_1 = require("../models");
class UserController {
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, email, password, fullname } = req.body;
                const newUser = yield models_1.User.create({
                    username,
                    email,
                    password,
                    fullname,
                    CreatedAt: new Date()
                });
                res.status(201).json({
                    success: true,
                    message: 'User logged succesfully',
                    post: newUser
                });
            }
            catch (error) {
                console.log('Error login the user:', error);
                res.status(500).json({
                    success: false,
                    message: 'Internal server error while creating the user',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req) {
                res.status(200).send({ message: 'User logged in successfully' });
            }
        });
    }
    static getUserDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Logic for fetching user details
            if (req) {
                res.status(200).send({ message: 'User details fetched successfully' });
            }
        });
    }
}
exports.UserController = UserController;
