import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import { Contact } from "../models/contactModel.js";

const getAllContacts = async (req, res) => {
  const contactsData = await Contact.find();
  res.status(200).json(contactsData);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const contactData = await Contact.findById(id);
  if (!contactData) {
    throw HttpError(404, "Not found");
  }
  res.json(contactData);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const contactData = await Contact.findByIdAndRemove(id);
  if (!contactData) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "Delete success",
  });
};

const createContact = async (req, res) => {
  const newContact = await Contact.create(req.body);
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const contactData = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!contactData) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
