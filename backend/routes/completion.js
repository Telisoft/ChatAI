import { Router } from 'express';
import { getTextCompletion, getChatCompletion, sendSMS } from '../services/API.js';
import { saveMessage, saveSMS } from "../models/message.js";
import * as io from "socket.io";

const router = Router();

router.post('/', async (req, res, next) => {
    try {
        const prompt = req.body.prompt;
        const response = await getTextCompletion(prompt);

        res.status(200).send({
            bot: response
        })
    } catch (error) {
        // console.log(error);
        res.status(500).send({ error })
    }
});

router.post('/chat', async (req, res, next) => {
    try {

        const prompt = req.body.data.text;

        await saveMessage(req.body.data);

        const result = await getChatCompletion(prompt);

        const response = {
            text: result,
            time: new Date().toISOString(),
            receiver: req.body.data.sender,
            sender: req.body.data.receiver,
            sent: true,
            received: true,
            read: false,
        };

        await saveMessage(response);

        res.status(200).send(response)
    } catch (error) {
        // console.log(error);
        res.status(500).send({ error })
    }
});

router.post('/send-sms', async (req, res, next) => {
    try {
        await saveMessage(req.body.data);

        const result = await sendSMS(req.body.data);

        res.status(200).send(result.data)
    } catch (error) {
        // console.log(error);
        res.status(500).send({ error })
    }
});

router.post('/receive-sms', async (req, res, next) => {
    try {
        const message = await saveSMS(req.body);
        const io = req.app.get('socketio');

        io.emit('5144772222', message);
        res.status(200).send()
    } catch (error) {
        // console.log(error);
        res.status(500).send({ error })
    }
});

export default router;