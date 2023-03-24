import { Model, Field } from 'fireo';
import { User } from 'user.js';

class Contact extends Model {
    id = Field.ID();
    firstName = Field.Text();
    lastName = Field.Text();
    phoneNumber = Field.Text();
    profileImage = Field.Text();
    about = Field.Text();
    email = Field.Text();
    location = Field.Text();
    status = Field.Text();
    createdAt = Field.DateTime();
    updatedAt = Field.DateTime();

    static config = {
        collectionName: "contacts"
    }
}

export const getDirectMessages = async () => {
    try {
        const dm = await Contact.collection.fetch();
        return dm.list;
    } catch (error) {
        console.log(error);
    }
}

export const addContact = async (data) => {
    try {
        const { phoneNumber } =  data;

        const contacts = await User.collection.where('phoneNumber', '==', phoneNumber).fetch();

        if (contacts.list.length > 0) {
            throw new Error("User is already registered");
        }

        const contact = Contact.init();
        contact.firstName = firstName;
        contact.lastName = lastName;
        contact.email = email;
        contact.phoneNumber = phoneNumber;
        contact.location = "California, USA";
        contact.status = "Active";
        await contact.save();

        return contact;
    } catch (error) {
        console.log(error);
    }
}

export const getUser = async (id) => {
    try {
        const contact = await Contact.collection.where('phoneNumber', '==', id).get();
        return contact;
    } catch (error) {
        console.log(error);
    }
}
