import {Field, Model} from "fireo";

class Conversation extends Model {
    id = Field.ID();
    sender = Field.Text();
    receiver = Field.Text();
    typingUser = Field.Text();
    createdAt = Field.DateTime();
    updatedAt = Field.DateTime();

    static config = {
        collectionName: "conversations"
    }
}

export const getConversation = async (data) => {
    const { sender, receiver } =  data;

    const conversation1 = await Conversation.collection.where('sender', '==', sender).where('receiver', '==', receiver).fetch();
    const conversation2 = await Conversation.collection.where('sender', '==', receiver).where('receiver', '==', sender).fetch();

    if (conversation1.list.length > 0) {
        return conversation1.list[0].toObject();
    }

    if (conversation2.list.length > 0) {
        return conversation2.list[0].toObject();
    }

    const conversation = Conversation.init();
    conversation.sender = sender;
    conversation.receiver = receiver;
    conversation.createdAt = new Date().toISOString();
    await conversation.save();

    return conversation.toObject();
}

export const getConversationById = async (id) => {
    const conversation = await Conversation.collection.where('receiver', '==', id).get();
    return conversation.toObject();
}