import {Model, DataTypes} from 'sequelize';
import {sequelize} from '../config/database';
import User from './user.model';
import Post from './post.model';

class Like extends Model {
    public likeId!: number;
    public userId!: number;
    public postId!: number;
    public caption?: string; // Optional field for caption
    public createdAt!: Date;
}

Like.init(
    { 
        likeId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User, // Reference to User model
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Post, // Reference to Post model
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        caption: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        modelName: 'Like',
    })
;
// Define relationships 
Like.belongsTo(Post, { foreignKey: 'postId' });
Like.belongsTo(User, { foreignKey: 'userId' }); 

export default Like;