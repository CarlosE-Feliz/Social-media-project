import jwt from 'jsonwebtoken';


interface AuthRequest extends Request {
    user?:any;
}

const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
    try{
        const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    const decoded =jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.user=decoded;
    next();
    }catch(error){
        res.status(401).json({message: 'Invalid token'});
    }
    
};

import { Request, Response, NextFunction } from 'express';

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    const userRole = (req as any).user?.role; // Assuming user role is set in req.user

    if (userRole !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
    }

    next();
};