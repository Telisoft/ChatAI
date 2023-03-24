import {Field, Model} from "fireo";

export class Message extends Model {
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