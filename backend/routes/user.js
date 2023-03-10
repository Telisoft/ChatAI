import { Router } from 'express';
import User from '../models/user.js';
const router = Router();

router.post('/add', async (req, res, next) => {
    try {

        const { name, email, phone_number } =  req.body;
        const user = User.init();
        user.name = name;
        user.email = email;
        user.phone_number = phone_number;

        user.save();

        res.status(200).send({
            success: true
        })
    } catch (error) {
        // console.log(error);
        res.status(500).send({ error })
    }
});

router.post('/get', async (req, res, next) => {
    try {

        const { phone_number } =  req.body;
        const user = await User.collection.where('phone_number', '==', phone_number).fetch();

        if (user.list.length > 0) {
            res.status(200).send({
                success: true
            })
        } else {
            res.status(200).send({
                success: false
            })
        }
    } catch (error) {
        // console.log(error);
        res.status(500).send({ error })
    }
});

export default router;