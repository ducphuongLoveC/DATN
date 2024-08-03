import express from 'express';
import router from './routes/index.js';
import { PORT } from './utils/env.js';
import cors from 'cors';
import connectDB from './utils/connectDB.js';

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
