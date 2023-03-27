import {Field, Model} from "fireo";

export class Conversation extends Model {
    sender = Field.Text();
    receiver = Field.Text();
    unRead = Field.Number();
    isDeleted = Field.Boolean();
    createdAt = Field.DateTime();
    updatedAt = Field.DateTime();

    static config = {
        collectionName: "conversations"
    }
}
