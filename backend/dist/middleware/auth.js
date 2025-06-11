"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authenticate = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }
    // Verify token logic here (e.g., using JWT)
    // If valid, proceed to the next middleware
    // If invalid, return an error response
    next();
};
const isAdmin = (req, res, next) => {
    var _a;
    const userRole = (_a = req.user) === null || _a === void 0 ? void 0 : _a.role; // Assuming user role is set in req.user
    if (userRole !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
};
