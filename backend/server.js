import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';


import routes from './routes/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

// views engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use(express.json());

app.use('/api', routes);

const PORT = process.env.PORT;

try {
    app.listen({ port: PORT, host: '0.0.0.0' }, () => {
        console.log('Server started ')
    })
} catch (err) { console.log(err) }
