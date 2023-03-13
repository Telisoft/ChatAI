import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes/index.js';
import { initData } from './models/contact.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', routes);

const PORT = process.env.PORT;

try {
    app.listen({ port: PORT, host: '127.0.0.1' }, () => {
        console.log('Server started, listening: http://127.0.0.1:5000/ ')
        initData();
    })
} catch (err) { console.log(err) }
