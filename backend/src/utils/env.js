
import dotenv from 'dotenv';

dotenv.config({ path: '././.env.local' });

const { PORT, DB_URL, JWT_SECRET } = process.env;

export { PORT, DB_URL, JWT_SECRET };
