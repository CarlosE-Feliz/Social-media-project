import request from 'supertest';
import { app } from '../app';
import { User } from '../models';
import { sequelize } from '../config/database';

describe('User API', () => {
    beforeAll(async () => {
        // Connect to test database
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        // Close database connection
        await sequelize.close();
    });

    beforeEach(async () => {
        // Clear users table before each test
        await User.destroy({ where: {} });
    });

    describe('POST /api/users/register', () => {
        it('should create a new user', async () => {
            const userData = {
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123',
                fullname: 'Test User'
            };

            const response = await request(app)
                .post('/api/users/register')
                .send(userData);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('id');
            expect(response.body.username).toBe(userData.username);
        });

        it('should not create user with existing email', async () => {
            const userData = {
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123',
                fullname: 'Test User'
            };

            await User.create(userData);

            const response = await request(app)
                .post('/api/users/register')
                .send(userData);

            expect(response.status).toBe(400);
        });
    });

    describe('POST /api/users/login', () => {
        it('should login with valid credentials', async () => {
            const userData = {
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123',
                fullname: 'Test User'
            };

            await User.create(userData);

            const response = await request(app)
                .post('/api/users/login')
                .send({
                    email: userData.email,
                    password: userData.password
                });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('token');
        });
    });
});