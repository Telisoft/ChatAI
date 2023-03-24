import { Model, Field } from 'fireo';

export class Contact extends Model {
    userId = Field.Text();
    user = Field.Reference({autoLoad: true});
    status = Field.Text();
    createdAt = Field.DateTime();
    updatedAt = Field.DateTime();

    static config = {
        collectionName: "contacts"
    }
}
