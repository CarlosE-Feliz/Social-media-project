import { Request, Response } from 'express';
import { User } from '../models';
import { CreatedAt } from 'sequelize-typescript';

interface RegisterRequest extends Request {
    body: {
        // Add expected registration fields here, e.g.:
        username?: string;
        password?: string;
        email?: string;
        fullname?: string;
        bio?: string;
        profilePicUrl?: string; // Optional field for profile picture URL
        createdAt?: Date; // Optional field for registration date
        // etc.
    };
}

// Definir tipo de datos del response
interface RegisterResponseBody {
    success: boolean;
    message: string;
    users?: {
        id: number;
        username: string;
        email: string;
        fullname: string;
        createdAt: Date;
    }[]; // Changed to array of user objects
    user?: {
        id: number;
        username: string;
        email: string;
        fullname: string;
    };
    error?: string;
}

interface RegisterResponse extends Response {
    json: (body: RegisterResponseBody) => this;
}

export class UserController {
    static async register(req: RegisterRequest, res: RegisterResponse): Promise<void> {
        try{
            const {username, email, password, fullname} = req.body;

            const newUser = await User.create({
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
            })

        }catch(error){
            console.log('Error login the user:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error while creating the user',
                error: error instanceof Error ? error.message : 'Unknown error'
            })
        }
    }

    static async login(req: RegisterRequest, res: RegisterResponse): Promise<void> {
        try{
            const {email, password} = req.body;
            if(!email ||!password){
                res.status(400).json({
                    success: false,
                    message: 'Email and password are required'
                });
                return;
            }
            const user = await User.findOne({
                where: {email},
                attributes: ['id', 'username', 'email', 'password', 'fullname']
            });

            if(!user){
                res.status(401).json({
                    success: false,
                    message: 'Invalid credentials'
                });
                return;
            }

            if(user.password !== password){
                res.status(401).json({
                    success: false,
                    message: 'Invalid credentials'
                })
                return
            }

            res.status(200).json({
                success: true,
                message: 'Login successful',
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    fullname: user.fullname
                }
            });
        }catch(error){
            console.error ('Login error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error during login',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    static async getUserDetails(req: RegisterRequest, res: RegisterResponse): Promise<void> {
        // Logic for fetching user details
        if(req) {
            res.status(200).send({ message: 'User details fetched successfully', user: req.body });
        }
    }

    static async getAllUsers(req: RegisterRequest, res: RegisterResponse) {
        try {
            // Fetch all users from database
            const users = await User.findAll({
                attributes: ['id', 'username', 'email', 'fullname', 'createdAt'], // Only return safe fields
                order: [['createdAt', 'DESC']] // Sort by newest first
            }).then(res => {
                console.log(res);
                return res
            })
            
            res.status(200).json({
                success: true,
                message: 'Users fetched successfully',
                users: users
            });
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({
                success: false,
                message: 'Error fetching users',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
}