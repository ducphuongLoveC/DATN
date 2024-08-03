
import dotenv from 'dotenv';

dotenv.config({ path: '././.env.local' });

const { PORT, DB_URL } = process.env;

export { PORT, DB_URL };
