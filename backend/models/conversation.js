import {Field, Model} from "fireo";

export class Conversation extends Model {
    sender = Field.Text();
    receiver = Field.Text();
    unReadSender = Field.Number({default: 0});
    unReadReceiver = Field.Number({default: 0});
    isDeleted = Field.Boolean();
    createdAt = Field.DateTime();
    updatedAt = Field.DateTime();

    static config = {
        collectionName: "conversations"
    }
}
