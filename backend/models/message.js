import {Field, Model} from "fireo";
import { getConversation } from "./conversation.js";

class Message extends Model {
    id = Field.ID();
    text = Field.Text();
    time = Field.DateTime();
    conversationId = Field.Text();
    receiver = Field.Text();
    sender = Field.Text();
    sent = Field.Boolean();
    received = Field.Boolean();
    read = Field.Boolean();
    createdAt = Field.DateTime();
    updatedAt = Field.DateTime();

    static config = {
        collectionName: "messages"
    }
}

export const saveMessage = async (data) => {
    const conversation = await getConversation(data);

    const message = Message.init();
    message.sender = data.sender;
    message.receiver = data.receiver;
    message.sent = true;
    message.received = true;
    message.read = true;
    message.time = new Date(data.time);
    message.text = data.text;
    message.conversationId = conversation.id;
    await message.save();

    return message;
}

export const saveSMS = async (data) => {
    const msg = { receiver: data.to, sender: data.from };
    const conversation = await getConversation(msg);

    const message = Message.init();
    message.sender = data.from;
    message.receiver = data.to;
    message.sent = true;
    message.received = true;
    message.read = true;
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
        .limitToLast(4)
        .fetch();
    return messages.list;
}


