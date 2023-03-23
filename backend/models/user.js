import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { StatusCodes} from "http-status-codes";
import { Field, Model } from "fireo";

export class User extends Model {
    id = Field.ID();
    firstName = Field.Text();
    lastName = Field.Text();
    password = Field.Text();
    email = Field.Text();
    profileImage = Field.Text();
    phoneNumber = Field.Text();
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

export const create = async (data) => {
    const { firstName, lastName, email, phoneNumber, password } =  data;

    const users = await User.collection.where('phoneNumber', '==', phoneNumber).fetch();

    if (users.list.length > 0) {
        throw new Error("User is already registered");
    }

    const user = User.init();
    user.firstName = firstName;
    user.lastName = lastName;
    user.password = bcrypt.hashSync(password, 10);
    user.email = email;
    user.role = 'user';
    user.phoneNumber = phoneNumber;
    await user.save();

    return user;
}

export const login = async (data) => {
    const { phoneNumber, password } =  data;
    const users = await User.collection.where('phoneNumber', '==', phoneNumber).fetch();

    let result = { success: false };

    if (users.list.length === 0) {
        result.message = "User does not exist";
    } else if (users.list.length > 1) {
        result.message = "There are several users";
    }

    // compare password
    if (bcrypt.compareSync(password, users.list[0].password)) {
        let user = {
            ...users.list[0]
        };

        let access_token = jwt.sign({ user }, process.env.PRIVATE_KEY, {
            expiresIn: "1d",
            algorithm: "HS256",
        });

        result = {
            ...result,
            success: true,
            user,
            access_token,
            message: "User Login Successfully",
        };
    } else {
        result.message = "Incorrect password";
    }

    return result;
}
