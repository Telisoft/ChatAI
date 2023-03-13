import { Field, Model } from "fireo";

class User extends Model {
    id = Field.ID();
    name = Field.Text();
    email = Field.Text();
    phoneNumber = Field.Text();
    role = Field.Text();
    createdAt = Field.DateTime();
    updatedAt = Field.DateTime();

    static config = {
        collectionName: "users"
    }
}

export const create = async (data) => {
    const { name, email, phoneNumber } =  data;

    const users = await User.collection.where('phoneNumber', '==', phoneNumber).fetch();

    if (users.list.length > 0) {
        throw new Error("User is already registered");
    }

    const user = User.init();
    user.name = name;
    user.email = email;
    user.role = 'user';
    user.phoneNumber = phoneNumber;
    await user.save();

    return user;
}

export const login = async (data) => {
    const { phoneNumber } =  data;
    const users = await User.collection.where('phoneNumber', '==', phoneNumber).fetch();

    if (users.list.length === 0) {
        throw new Error("User does not exist");
    } else if (users.list.length > 1) {
        throw new Error("There are several users");
    }
    return users.list[0];
}
