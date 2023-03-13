import { Router } from 'express';
import { getTextCompletion, getChatCompletion  } from '../services/API.js';
import {saveMessage} from "../models/message.js";

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

export default router;