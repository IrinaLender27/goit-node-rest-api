import { promises as fs } from "fs";
import path from "path";

const contactsPath = path.join("db", "contacts.json");

async function listContacts() {
  try {
    const readResult = await fs.readFile(contactsPath);
    const contactsObject = JSON.parse(readResult);
    return contactsObject;
  } catch (error) {
    return error;
  }
}

async function getContactById(contactId) {
  try {
    const contactsObject = await listContacts();
    const contactById = contactsObject.find(
      (contact) => contact.id === contactId
    );
    return contactById || null;
  } catch (error) {
    return error;
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const removedContactIndex = contacts.findIndex(
      (contact) => contact.id === contactId
    );
    if (removedContactIndex !== -1) {
      const removedContact = contacts.splice(removedContactIndex, 1)[0];
      await fs.writeFile(contactsPath, JSON.stringify(contacts));
      return removedContact;
    } else {
      return null;
    }
  } catch (error) {
    return error;
  }
}

async function addContact(name, email, phone) {
  try {
    const contactObject = await listContacts();
    const newContact = { id: Date.now(), name, email, phone };
    contactObject.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contactObject));
    return newContact;
  } catch (error) {
    return error;
  }
}

async function refreshContact(id, data) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === id);
    if (index === -1) {
      return null;
    }
    contacts[index] = { id, ...data };

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
  } catch (error) {
    return error;
  }
}
export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  refreshContact,
};
