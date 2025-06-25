import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../helpers/configJwt';


interface AuthRequest extends Request {
    user?:any;
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        // Get token from Authorization header
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

        if (!token) {
            res.status(403).json({ message: 'No token provided'});
            return;
        }

        const decoded = jwt.verify(token, JWT_SECRET || JWT_SECRET);
        req.user = decoded;
        next();
    } catch(error) {
        res.status(401).json({message: 'Invalid token'});
    }
};



const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    const userRole = (req as any).user?.role; // Assuming user role is set in req.user

    if (userRole !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
    }

    next();
};