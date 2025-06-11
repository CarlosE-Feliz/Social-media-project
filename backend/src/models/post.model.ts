import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import User from './user.model';

class Post extends Model {
  public id!: number;
  public userId!: number;
  public imageUrl?: string; // Optional field for image URL
  public caption?: string; // Optional field for caption
  public fullname?: string; // Optional field for user's full name
  public createdAt!: Date;
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    imageUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    caption: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize,
    modelName: 'Post',
  }
);

// Define relationships
Post.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});
User.hasMany(Post);

export default Post;