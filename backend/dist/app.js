"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const post_routes_1 = __importDefault(require("./routes/post.routes"));
const likes_routes_1 = __importDefault(require("./routes/likes.routes"));
const database_1 = require("./config/database");
exports.app = (0, express_1.default)();
// Middleware
exports.app.use((0, cors_1.default)());
exports.app.use((0, morgan_1.default)('dev'));
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
// Database connection
(0, database_1.connectDatabase)();
// Routes
exports.app.use('/api/users', user_routes_1.default);
exports.app.use('/api/posts', post_routes_1.default);
exports.app.use('/api/likes', likes_routes_1.default);
// Error handling middleware
exports.app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
});
const PORT = process.env.PORT || 5000;
exports.app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
