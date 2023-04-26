import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {User} from "../models/user.js";

export const login = async (data) => {
    const { phoneNumber, password } =  data;
    const users = await User.collection
        .where('phoneNumber', '==', phoneNumber)
        .where('role', '==', 'admin')
        .fetch();

    let result = { success: false };

    if (users.list.length === 0) {
        result.message = "User does not exist";
    } else if (users.list.length > 1) {
        result.message = "There are several users";
    } else {
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
                success: true,
                message: "User Login Successfully",
                data: {
                    user,
                    access_token
                },
            };
        } else {
            result.message = "Incorrect password";
        }
    }

    return result;
}