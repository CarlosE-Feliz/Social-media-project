"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../app");
const models_1 = require("../models");
const database_1 = require("../config/database");
describe('User API', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // Connect to test database
        yield database_1.sequelize.sync({ force: true });
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // Close database connection
        yield database_1.sequelize.close();
    }));
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        // Clear users table before each test
        yield models_1.User.destroy({ where: {} });
    }));
    describe('POST /api/users/register', () => {
        it('should create a new user', () => __awaiter(void 0, void 0, void 0, function* () {
            const userData = {
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123',
                fullname: 'Test User'
            };
            const response = yield (0, supertest_1.default)(app_1.app)
                .post('/api/users/register')
                .send(userData);
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('id');
            expect(response.body.username).toBe(userData.username);
        }));
        it('should not create user with existing email', () => __awaiter(void 0, void 0, void 0, function* () {
            const userData = {
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123',
                fullname: 'Test User'
            };
            yield models_1.User.create(userData);
            const response = yield (0, supertest_1.default)(app_1.app)
                .post('/api/users/register')
                .send(userData);
            expect(response.status).toBe(400);
        }));
    });
    describe('POST /api/users/login', () => {
        it('should login with valid credentials', () => __awaiter(void 0, void 0, void 0, function* () {
            const userData = {
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123',
                fullname: 'Test User'
            };
            yield models_1.User.create(userData);
            const response = yield (0, supertest_1.default)(app_1.app)
                .post('/api/users/login')
                .send({
                email: userData.email,
                password: userData.password
            });
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('token');
        }));
    });
});
