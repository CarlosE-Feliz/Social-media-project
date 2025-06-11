import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const isTest = process.env.NODE_ENV === 'test';

export const sequelize = new Sequelize({
    database: isTest ? `${process.env.DB_NAME}_test` : process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'postgres',
    logging: false
});

export const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connecting to database from:', new Error().stack);
    console.log('✅ Database connection established');
    
    // Add sync to create tables
    await sequelize.sync();
    console.log('✅ Database tables synchronized');
  } catch (error) {
    console.error('❌ Database error:', error);
    process.exit(1); // Exit if database connection fails
  }
};