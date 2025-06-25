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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const models_1 = require("../models");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const configJwt_1 = require("../helpers/configJwt");
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
                    users: [{
                            id: newUser.id,
                            username: newUser.username,
                            email: newUser.email,
                            fullname: newUser.fullname,
                            createdAt: newUser.createdAt
                        }]
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
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    res.status(400).json({
                        success: false,
                        message: 'Email and password are required'
                    });
                    return;
                }
                const user = yield models_1.User.findOne({
                    where: { email },
                    attributes: ['id', 'username', 'email', 'password', 'fullname']
                });
                if (!user) {
                    res.status(401).json({
                        success: false,
                        message: 'Invalid credentials'
                    });
                    return;
                }
                if (user.password !== password) {
                    res.status(401).json({
                        success: false,
                        message: 'Invalid credentials'
                    });
                    return;
                }
                const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, configJwt_1.JWT_SECRET, { expiresIn: '24h' });
                res.status(200).json({
                    success: true,
                    message: 'Login successful',
                    user: {
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        fullname: user.fullname
                    },
                    token
                });
            }
            catch (error) {
                console.error('Login error:', error);
                res.status(500).json({
                    success: false,
                    message: 'Internal server error during login',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
    }
    static getUserDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Logic for fetching user details
            if (req) {
                res.status(200).send({ message: 'User details fetched successfully', user: req.body });
            }
        });
    }
    static getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Fetch all users from database
                const users = yield models_1.User.findAll({
                    attributes: ['id', 'username', 'email', 'fullname', 'createdAt'], // Only return safe fields
                    order: [['createdAt', 'DESC']] // Sort by newest first
                }).then((res) => {
                    console.log(res);
                    return res;
                });
                res.status(200).json({
                    success: true,
                    message: 'Users fetched successfully',
                    users: users
                });
            }
            catch (error) {
                console.error('Error fetching users:', error);
                res.status(500).json({
                    success: false,
                    message: 'Error fetching users',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
    }
    static getMe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user.id;
                const user = yield models_1.User.findByPk(userId);
                if (!user) {
                    return res.status(404).json({ message: 'No user provided' });
                }
                res.json(user);
            }
            catch (error) {
                res.status(500).json({ message: 'Error del servidor' });
            }
        });
    }
}
exports.UserController = UserController;
