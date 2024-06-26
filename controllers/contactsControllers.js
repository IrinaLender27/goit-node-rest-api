import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import { Contact } from "../models/contactModel.js";

export const getAllContacts = ctrlWrapper(async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const contactsData = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  });
  res.status(200).json(contactsData);
});

export const getOneContact = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const contactData = await Contact.findById(id);
  if (!contactData) {
    throw HttpError(404, "Not found");
  }
  res.json(contactData);
});

export const deleteContact = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const contactData = await Contact.findByIdAndDelete(id);
  if (!contactData) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "Delete success",
  });
});

export const createContact = ctrlWrapper(async (req, res) => {
  const { _id: owner } = req.user;
  const newContact = await Contact.create({ ...req.body, owner });
  res.status(201).json(newContact);
});

export const updateContact = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const contactData = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!contactData) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
});

export const updateStatusContact = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
});
