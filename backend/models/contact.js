import { Model, Field } from 'fireo';

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

export const initData = async () => {
    try {
        const contact = await Contact.collection.fetch();
        if (contact.list.length > 0) {
            return;
        }
        const ai = {
            isFavourite: true,
            firstName: "AI ",
            lastName: "Assistant",
            phoneNumber: "1111111111",
            profileImage: "../assets/images/users/robot.png",
            about: "If several languages coalesce, the grammar of the resulting.",
            email: "Marguerite@Campbell.com",
            location: "California, USA",
            status: "Active",
        }
        const contact1 = Contact.fromObject(ai);
        await contact1.save();

        const person = {
            firstName: "Norris",
            lastName: "Decker",
            profileImage: "../assets/images/users/avatar-2.jpg",
            about: "If several languages coalesce, the grammar of the resulting.",
            email: "adc@123.com",
            location: "California, USA",
            phoneNumber: "2222222222",
            status: "Active",
        }
        const contact2 = Contact.fromObject(person);
        await contact2.save();
    } catch (error) {
        console.log(error);
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

export const getUser = async (id) => {
    try {
        const contact = await Contact.collection.get({id: id});
        return contact;
    } catch (error) {
        console.log(error);
    }
}
