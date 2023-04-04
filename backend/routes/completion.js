import { Router } from 'express';
import { getChatCompletion, sendSMS } from '../services/API.js';
import { saveMessage, saveSMS } from "../services/message.service.js";
import {getConversation} from "../services/conversation.service.js";
import * as UserService from "../services/user.service.js";
import * as io from "socket.io";

const router = Router();

router.post('/chat', async (req, res, next) => {
    try {

        const prompt = req.body.data.text;

        const conversation = await getConversation(req.body.data);
        await saveMessage(conversation.id, req.body.data);

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

        await saveMessage(conversation.id, response);

        res.status(200).send(response)
    } catch (error) {
        // console.log(error);
        res.status(500).send({ error })
    }
});

router.post('/send-sms', async (req, res, next) => {
    try {
        const conversation = await getConversation(req.body.data);
        await saveMessage(conversation.id, req.body.data);
        let { sender, receiver } = req.body.data;
        sender = await UserService.getUserById(sender);
        receiver = await UserService.getUserById(receiver);

        req.body.data.sender = sender.phoneNumber;
        req.body.data.receiver = receiver.phoneNumber;

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

        io.emit(message.receiver, message);
        res.status(200).send()
    } catch (error) {
        // console.log(error);
        res.status(500).send({ error })
    }
});

export default router;