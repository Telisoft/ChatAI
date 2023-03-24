import {Field, Model} from "fireo";

export class Conversation extends Model {
    sender = Field.Text();
    receiver = Field.Text();
    createdAt = Field.DateTime();
    updatedAt = Field.DateTime();
    status = Field.Text();

    static config = {
        collectionName: "conversations"
    }
}
