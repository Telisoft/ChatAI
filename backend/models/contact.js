import { Model, Field } from 'fireo';

class Contact extends Model {
    id = Field.Text();
    firstName = Field.Text();
    lastName = Field.Text();
    phoneNumber = Field.Text();
    about = Field.Text();
    email = Field.Text();
    location = Field.Text();
    status = Field.Number();
}
