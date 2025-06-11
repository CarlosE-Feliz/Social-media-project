import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

// Increase test timeout
jest.setTimeout(30000);