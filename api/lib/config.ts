import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: process.env.PORT || 3100,
    supportedDevicesNum: 17,
    databaseUrl: process.env.DATABASE_URL,
    JwtSecret: process.env.JWT_SECRET || 'secret'
 };
