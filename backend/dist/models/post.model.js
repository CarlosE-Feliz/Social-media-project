"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const user_model_1 = __importDefault(require("./user.model"));
class Post extends sequelize_1.Model {
}
Post.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    imageUrl: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    caption: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    fullname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users', // table name as string
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
}, {
    sequelize: database_1.sequelize,
    modelName: 'Post',
});
// Define relationships
Post.belongsTo(user_model_1.default, {
    foreignKey: 'userId',
    as: 'user'
});
user_model_1.default.hasMany(Post);
exports.default = Post;
