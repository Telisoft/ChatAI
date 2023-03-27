import {User} from "../models/user.js";
import {Conversation} from "../models/conversation.js";
import {getUser} from "./user.service.js";

export const addConversation = async (param) => {
    try {

        let result = { success: false };

        const conversations1 = await Conversation.collection
            .where('sender', "==", param.user.id)
            .where('receiver', '==', param.userId)
            .where('isDeleted', '==', false)
            .fetch();
        const conversations2 = await Conversation.collection
            .where('receiver', "==", param.user.id)
            .where('sender', '==', param.userId)
            .where('isDeleted', '==', false)
            .fetch();

        if (conversations1.list.length !== 0) {
            result.message = "Conversation is already created";
        } else if (conversations2.list.length !== 0) {
            result.message = "Conversation is already created";
        } else {
            const user = await getUser(param.userId);

            const sender = Conversation.init();
            sender.sender = param.user.id;
            sender.isDeleted = false;
            sender.user = user.data.key;
            sender.receiver = user.data.id;
            sender.status = "Active";
            await sender.save();

            result.success = true;
            result.message = "Success";
            result.data = "Success";
        }

        return result;
    } catch (error) {
        console.log(error);
    }
}

export const getConversation = async (data) => {
    const { sender, receiver } =  data;

    const conversations1 = await Conversation.collection
        .where('sender', '==', sender)
        .where('receiver', '==', receiver)
        .where('isDeleted', '==', false)
        .fetch();
    if (conversations1.list.length > 0) {
        return conversations1.list[0].toObject();
    }

    const conversations2 = await Conversation.collection
        .where('sender', '==', receiver)
        .where('receiver', '==', sender)
        .where('isDeleted', '==', false)
        .fetch();
    if (conversations2.list.length > 0) {
        return conversations2.list[0].toObject();
    }

    const conversation = Conversation.init();
    conversation.sender = sender;
    conversation.receiver = receiver;
    conversation.createdAt = new Date();
    await conversation.save();

    return conversation;
}

export const getConversationById = async (data) => {
    const conversation1 = await Conversation.collection
        .where('sender', '==', data.user.id)
        .where('receiver', '==', data.id)
        .where('isDeleted', '==', false)
        .get();
    if (conversation1 !== undefined) {
        return conversation1.toObject();
    }

    const conversation2 = await Conversation.collection
        .where('sender', '==', data.user.id)
        .where('receiver', '==', data.id)
        .where('isDeleted', '==', false)
        .get();
    if (conversation2 !== undefined) {
        return conversation2.toObject();
    }

    return false;
}

export const deleteConversation = async (req) => {
    const result = { success: false };
    const conversation = await Conversation.collection.get({id: req.query.conversationId});
    if (conversation !== undefined) {
        conversation.isDeleted = true;
        conversation.update();
        result.success = true;
        result.message = "Success";
        return result;
    }

    result.message = "Failed";
    return result;
}

export const getDirectMessages = async (data) => {
    try {
        const userId =  data.user.id;

        let result = { success: false };
        const conversation = await Conversation.collection
            .where('sender', '==', userId)
            .where('isDeleted', '==', false)
            .fetch();

        const users = [];
        for (let i = 0; i < conversation.list.length; i++) {
            const user = await User.collection.get({id: conversation.list[i].receiver});
            users.push(user);
        }

        result.success = true;
        result.message = "Success";
        result.data = users;

        return result;
    } catch (error) {
        console.log(error);
    }
}