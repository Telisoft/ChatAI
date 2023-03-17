import {Field, Model} from "fireo";
import {getUser} from "./contact.js";

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
    conversation.createdAt = new Date();
    await conversation.save();

    return conversation.toObject();
}

/**
 *
 * @param id: id of users Table
 * @returns {Promise<boolean|*|Map<unknown, unknown>|Map<K, V>|((target: any, filter: (value: any) => boolean, instructions: Record<string, ValueSupplier | Value>) => typeof target)|((instructions: Record<string, ObjectMappingInstruction>) => any)|((target: any, instructions: Record<string, ObjectMappingInstruction>) => typeof target)|any extends {_id?: infer U} ? IfAny<U, any, any> : any|Binary>}
 */
export const getConversationById = async (id) => {
    const contact = await getUser(id);
    const conversation = await Conversation.collection.where('receiver', '==', contact.phoneNumber).get();
    if (conversation === undefined) {
        return false;
    }

    return conversation.toObject();
}