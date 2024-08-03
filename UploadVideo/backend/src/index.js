import express, { json } from 'express';
import cors from 'cors';
import router from '../routes/index.js';
import connectDB from '../config/connectDB.js';
const app = express();
const port = 3000;

connectDB();

app.use(express.json());

// Cấu hình CORS
app.use(cors());

app.use('/api', router);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
