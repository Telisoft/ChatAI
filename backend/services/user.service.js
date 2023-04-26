import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {User} from "../models/user.js";

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
    user.status = 'Active';
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

export const getCurrentUser = async function (req, res) {
    try {
        const token = req.headers.authorization.split(" ")[1]; // Bearer <token>
        const { user } = jwt.verify(token, process.env.PRIVATE_KEY);
        return user;
    } catch (e) {
        console.log(e.message);
    }
}

export const getUser = async (id) => {
    try {
        const result = {success: false};
        const user = await User.collection.get({id});
        result.success = true;
        result.data = user.toObject();
        return result;
    } catch (e) {
        console.log(e.message);
    }
}

export const getUserByPhone = async (phoneNumber) => {
    try {
        const user = await User.collection.where('phoneNumber', '==', phoneNumber).get();
        return user.toObject();
    } catch (e) {
        console.log(e.message);
    }
}

export const getUserById = async (id) => {
    try {
        const user = await User.collection.get({id});
        return user.toObject();
    } catch (e) {
        console.log(e.message);
    }
};
