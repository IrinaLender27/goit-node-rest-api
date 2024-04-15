import {
  addContact,
  getContactById,
  removeContact,
  listContacts,
  refreshContact,
} from "../services/contactsServices.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contactById = await getContactById(id);
    if (!contactById) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(contactById);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const delateContact = await removeContact(id);
    if (!delateContact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(delateContact);
  } catch (error) {
    next(error);
  }
};

export const createContact = (req, res, next) => {
  try {
    const { error } = createContactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const newContact = addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { error } = updateContactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { id } = req.params;
    const updateContact = await refreshContact(id, req.body);
    if (!updateContact) {
      throw HttpError(404, "Not found");
    }
    res.status(201).json(updateContact);
  } catch (error) {
    next(error);
  }
};
