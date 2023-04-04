import {User} from "../models/user.js";
import {Contact} from "../models/contact.js";
import {Conversation} from "../models/conversation.js";

export const addContact = async (param) => {
    try {
        const { phoneNumber } =  param;

        const users = await User.collection.where('phoneNumber', '==', phoneNumber).fetch();

        let result = { success: false };

        if (users.list.length === 0) {
            result.message = "Phone Number is not registered";
        } else {

            const contacts = await Contact.collection
                .where('userId', "==", param.user.id)
                // .where("user.phoneNumber", "==", phoneNumber)
                .fetch();
            const data = [];
            for (let i = 0; i < contacts.list.length; i++) {
                if (contacts.list[i].user.phoneNumber === phoneNumber) {
                    data.push(contacts.list[i]);
                }
            }

            if (data.length !== 0) {
                result.message = "Phone Number is already registered";
            } else {
                const contact = Contact.init();
                contact.userId = param.user.id;
                contact.user = users.list[0].key;
                contact.status = "Active";

                await contact.save();

                const receiver = Contact.init();
                receiver.userId = users.list[0].id;
                receiver.user = param.user.key;
                receiver.status = "Active";

                await receiver.save();

                result.success = true;
                result.message = "Success";
                result.data = "Contact added";
            }
        }

        return result;
    } catch (error) {
        console.log(error);
    }
}

export const getAllContact = async (data) => {
    try {
        let result = { success: false };
        const userId =  data.user.id;
        const all = await User.collection.fetch();

        const users = [];
        for (let i = 0; i < all.list.length; i++) {
            if (all.list[i].id === userId) {
                continue;
            }
            users.push(all.list[i]);
        }

        result.success = true;
        result.message = "Success";
        result.data = users;

        return result;
    } catch (error) {
        console.log(error);
    }
}

export const getContact = async (data) => {
    try {
        let result = { success: false };
        const userId =  data.user.id;
        const contacts = await Contact.collection.where('userId', '==', userId).fetch();

        const users = [];
        for (let i = 0; i < contacts.list.length; i++ ) {
            users.push(contacts.list[i].user);
        }


        result.success = true;
        result.message = "Success";
        result.data = users;

        return result;
    } catch (error) {
        console.log(error);
    }
}

export const deleteContact = async (req) => {
    const result = { success: false };

    const contacts = await Contact.collection.where('userId', '==', req.body.user.id).fetch();

    for (let i = 0; i < contacts.list.length; i ++) {
        if (contacts.list[i].user.id === req.query.contactId) {
            await contacts.list[i].delete();

            result.success = true;
            result.message = "Success";
            return result;
        }
    }

    result.message = "Failed";
    return result;
}

deleteContact