import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Log configuration before attempting connection
console.log('Attempting to connect with:', {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER
});

const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'postgres',
    logging: true // Enable SQL logging
});

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('✅ Connection successful!');
    } catch (error) {
        if (error instanceof Error) {
            console.error('❌ Connection failed:', {
                message: error.message,
                errorType: error.name
            });
        } else {
            console.error('❌ Connection failed:', {
                message: String(error),
                errorType: typeof error
            });
        }
    } finally {
        await sequelize.close();
    }
}

testConnection();