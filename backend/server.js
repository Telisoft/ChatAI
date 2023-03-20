import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import routes from './routes/index.js';
import { initData } from './models/contact.js';

dotenv.config();
const app = express();
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, { allowEIO4: true,  cors: { origin: '*' }});

app.set('socketio', io);

io.on('connection', (socket) => {
    console.log('Connection established');
    socket.on('disconnect', () => {
        console.log('Disconnected');
    });
});

app.use(express.json());
app.use('/api', routes);

app.set('port', process.env.PORT || 5000);
httpServer.listen(app.get('port'), function () {
    const port = httpServer.address().port;
    console.log('Running on : ', port);
    initData();
});
