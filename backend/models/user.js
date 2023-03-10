import {Field, Model} from "fireo";

class User extends Model {
    name = Field.Text();
    email = Field.Text();
    phone_number = Field.Text();
    role = Field.Text();
}

export default User