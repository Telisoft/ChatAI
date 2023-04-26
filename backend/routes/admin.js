import { Router } from 'express';
import { StatusCodes} from "http-status-codes";
import * as UserService from '../services/user.service.js';
import * as AdminService from '../services/admin.service.js';


const router = Router();

router.post('/login', async (req, res, next) => {
    try {
        const result = await AdminService.login(req.body);
        res.status(StatusCodes.OK).send(result);
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: error.message });
    }
});

export default router;