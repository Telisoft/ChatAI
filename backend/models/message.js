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
    message.time = new Date(data.time);
    message.text = data.text;
    message.conversationId = conversation.id;
    await message.save();

    return message;
}


