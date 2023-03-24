import { Router } from 'express';
import { StatusCodes} from "http-status-codes";
import * as UserService from '../services/user.service.js';
import * as ContactService from '../services/contact.service.js'
import * as ConversationService from "../services/conversation.service.js";
import * as MessageService from "../services/message.service.js";
import { contacts, userChannels } from "../data/contacts.js";
import auth from "../middleware/auth.js";
import {getUser} from "../services/user.service.js";

const router = Router();


router.post('/register', async (req, res, next) => {
    try {
        const result = await UserService.create(req.body);
        res.status(StatusCodes.OK).send({ user: result.toObject() });
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: error.message });
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const result = await UserService.login(req.body);
        res.status(StatusCodes.OK).send(result);
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: error.message });
    }
});

router.get('/profile-details', async  (req, res, next) => {
    const profileDetails = {
        basicDetails: {
            firstName: "Kathryn",
            lastName: "Swarey",
            phoneNumber: "0000000000",
            title: "Front end Developer",
            description:
                "If several languages coalesce, the grammar of the resulting language is more simple.",
            fullName: "Kathryn Swarey",
            email: "admin@themesbrand.com",
            location: "California, USA",
            // avatar: "../assets/images/users/avatar-1.jpg",
            // coverImage: "../assets/images/small/img-4.jpg",
        },
        media: {
            total: 17,
            list: [
                {
                    id: 1,
                    url: "../assets/images/small/img-1.jpg",
                },
                {
                    id: 2,
                    url: "../assets/images/small/img-2.jpg",
                },
                {
                    id: 3,
                    url: "../assets/images/small/img-4.jpg",
                },
                {
                    id: 4,
                    url: "../assets/images/small/img-1.jpg",
                },
            ],
        },
        attachedFiles: {
            total: 4,
            list: [
                {
                    id: 1,
                    fileName: "design-phase-1-approved.pdf",
                    size: "12.5 MB",
                    downloadUrl: "#",
                    icon: "bx bx-file",
                },
                {
                    id: 2,
                    fileName: "Image-1.jpg",
                    size: "4.2 MB",
                    downloadUrl: "#",
                    icon: "bx bx-image",
                },
                {
                    id: 3,
                    fileName: "Image-2.jpg",
                    size: "3.1 MB",
                    downloadUrl: "#",
                    icon: "bx bx-image",
                },
                {
                    id: 4,
                    fileName: "Landing-A.zip",
                    size: "6.7 MB",
                    downloadUrl: "#",
                    icon: "bx bx-file",
                },
            ],
        },
    };
    res.status(StatusCodes.OK).send(profileDetails);
});

router.get('/get-favourites', async (req, res, next) => {
    res.status(StatusCodes.OK).send([]);
});

router.get('/get-direct-messages', auth, async (req, res, next) => {
    try {
        const directMessages = await ConversationService.getDirectMessages(req.body);
        res.status(StatusCodes.OK).send(directMessages);
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: error.message });
    }
});

router.get('/get-channels', async  (req, res, next) => {
    const channels = [
        {
            ...userChannels[0],
            meta: {
                unRead: 12,
            },
        },
        {
            ...userChannels[1],
        },
        {
            ...userChannels[2],
            meta: {
                unRead: 85,
            },
        },
        {
            ...userChannels[3],
        },
    ];
    res.status(StatusCodes.OK).send(channels);
});

router.get('/calls-list', async  (req, res, next) => {
    const calllist = [];
    res.status(StatusCodes.OK).send(calllist);
});

router.get('/get-archive-contacts', async  (req, res, next) => {
    const contacts = [];
    res.status(StatusCodes.OK).send(contacts);
});

router.get('/bookmarks-list', async  (req, res, next) => {
    const bookmarks = [];
    res.status(StatusCodes.OK).send(bookmarks);
});

router.get('/user-contacts', auth, async  (req, res) => {
    try {
        const result = await ContactService.getContact(req.body);
        res.status(StatusCodes.OK).send(result);
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: error.message });
    }
});

router.get('/user-settings', async  (req, res, next) => {
    const settings = {
        basicDetails: {
            firstName: "Joseph",
            lastName: "Brown",
            // profile: "../assets/images/users/avatar-1.jpg",
            // coverImage: "../assets/images/small/img-4.jpg",
            email: "adc@123.com",
            location: "California, USA",
        },
        theme: {
            // color: "bgcolor-radio1",
            image: "bgimg-radio5",
        },
        privacy: {
            displayprofilePhoto: "selected",
            displayLastSeen: true,
            displayStatus: "everyone",
            readReceipts: true,
            displayGroups: "everyone",
        },
        security: {
            securityNotification: false,
        },
        status: "Active",
    };
    res.status(StatusCodes.OK).send(settings);
});

router.get('/get-user-details/:id', async (req, res, next) => {
    try {
        let data = [];
        if (req.params.id) {
            data = await getUser(req.params.id);
        }
        res.status(StatusCodes.OK).send(data);
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: error.message });
    }
});

router.put('/read-conversation/:id', async  (req, res, next) => {
    res.status(StatusCodes.OK).send([]);
});

router.post('/get-user-conversations', auth, async (req, res, next) => {
    const conversation = await ConversationService.getConversationById(req.body);

    if (conversation === false) {
        return res.status(StatusCodes.OK).send({ messages: []});
    }

    const messages = await MessageService.getMessages(conversation.id);
    for (let i = 0; i < messages.length; i ++) {
        messages[i].time = messages[i].time.toDate();
    }

    conversation['messages'] = messages;
    const result = { success: true };
    result.data = conversation

    res.status(StatusCodes.OK).send(result);
});

router.post('/invite-contact', auth, async (req, res, next) => {
    try {
        const result = await ContactService.addContact(req.body);
        res.status(StatusCodes.OK).send(result);
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: error.message });
    }
});

router.post('/add-conversation', auth, async (req, res, next) => {
    try {
        const result = await ConversationService.addConversation(req.body);
        res.status(StatusCodes.OK).send(result);
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: error.message });
    }
});

export default router;