import {Message} from "../models/message.js";
import {getConversation} from "./conversation.service.js";
import * as UserService from "./user.service.js";

/**
 *
 * @param conversationId
 * @param data
 * @returns {Promise<*|Model|{}>}
 */
export const saveMessage = async (conversationId, data) => {
    const message = Message.init();
    message.sender = data.sender;
    message.receiver = data.receiver;
    message.sent = true;
    message.received = true;
    message.read = true;
    message.time = new Date(data.time);
    message.text = data.text;
    message.conversationId = conversationId;
    await message.save();

    return message;
}

export const saveSMS = async (data) => {
    const sender = await UserService.getUserByPhone(data.from);
    const receiver = await UserService.getUserByPhone(data.to);
    const msg = { receiver: receiver.id, sender: sender.id };
    const conversation = await getConversation(msg);

    const message = Message.init();
    message.sender = sender.id;
    message.receiver = receiver.id;
    message.sent = true;
    message.received = true;
    message.read = false;
    message.time = new Date(data.time);
    message.text = data.msg;
    message.conversationId = conversation.id;
    await message.save();

    return message;
}

export const getMessages = async (conversationId) => {
    const messages = await Message.collection
        .where('conversationId',  '==', conversationId)
        .orderBy('time')
        .limitToLast(5)
        .fetch();
    return messages.list;
}