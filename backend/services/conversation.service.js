import {User} from "../models/user.js";
import {Conversation} from "../models/conversation.js";
import {getUser} from "./user.service.js";
import * as MessageService from "./message.service.js";

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
        return conversations1.list[0];
    }

    const conversations2 = await Conversation.collection
        .where('sender', '==', receiver)
        .where('receiver', '==', sender)
        .where('isDeleted', '==', false)
        .fetch();
    if (conversations2.list.length > 0) {
        return conversations2.list[0];
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
            if (data.user.id === conversation.receiver) {
                user.unRead = conversation.list[i].unReadReceiver;
            } else {
                user.unRead = conversation.list[i].unReadSender;
            }

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

export const readConversation = async (data) => {
    const result = { success: false };

    try {

        // reset unread field in conversation
        const conversation = await getConversation(data);
        if (data.receiver === conversation.receiver) {
            conversation.unReadReceiver = 0;
        } else {
            conversation.unReadSender = 0;
        }
        await conversation.update();


        const messages = await MessageService.getMessages(conversation.id);
        for (let i = 0; i < messages.length; i ++) {
            if (data.receiver === messages[i].receiver) {
                messages[i].read = true;
                messages[i].time = messages[i].time.toDate();
                await messages[i].update();
            }
        }

        result.success = true;
        return result;
    } catch (error) {
        result.message = "Failed";
        return result;
    }
}

export const getUnreadConversation = async () => {
    const conversations1 = Conversation.collection.where('unReadSender', '>', 0).fetch();
    const conversations2 = Conversation.collection.where('unReadReceiver', '>', 0).fetch();
    const conversations = conversations1.list.concat(conversations2.list);
    return conversations;
}