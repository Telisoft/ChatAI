import {Field, Model} from "fireo";

export class User extends Model {
    firstName = Field.Text();
    lastName = Field.Text();
    password = Field.Text();
    email = Field.Text();
    profileImage = Field.Text();
    phoneNumber = Field.Text();
    status = Field.Text();
    role = Field.Text();
    createdAt = Field.DateTime({auto: true});
    updatedAt = Field.DateTime({auto: true});

    static config = {
        collectionName: "users"
    }
}

export const initData = async () => {
    try {
        const users = await User.collection.fetch();
        if (users.list.length > 0) {
            return;
        }
        const ai = {
            firstName: "AI ",
            lastName: "Assistant",
            phoneNumber: "1111111111",
            profileImage: "../assets/images/users/robot.png",
            email: "assistant@gmail.com",
            role: "user",
            status: "Active",
        }
        const user = User.fromObject(ai);
        await user.save();
    } catch (error) {
        console.log(error);
    }
}
