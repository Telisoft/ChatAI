import { Router } from 'express';
import { getTextCompletion, getChatCompletion,  } from '../services/API.js';

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
        const prompt = req.body.prompt;
        const response = await getChatCompletion(prompt);

        res.status(200).send({
            bot: response
        })
    } catch (error) {
        // console.log(error);
        res.status(500).send({ error })
    }
});

router.post('/user', async (req, res, next) => {
    try {
        const prompt = req.body.prompt;
        const response = await getChatCompletion(prompt);

        res.status(200).send({
            bot: response
        })
    } catch (error) {
        // console.log(error);
        res.status(500).send({ error })
    }
});

export default router;