import { APIClient } from "./apiCore";
import * as url from "./urls";

const api = new APIClient();

const getContacts = (filters?: object) => {
  return api.get(url.GET_CONTACTS, filters);
};

const inviteContact = (data: object) => {
  return api.create(url.INVITE_CONTACT, data);
};

const deleteContact = (contactId: number | string) => {
  return api.delete(url.DELETE_CONTACT, {
    params: { contactId },
  });
};

export { getContacts, inviteContact, deleteContact };
