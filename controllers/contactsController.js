const asyncHandler = require('express-async-handler')
const Contact = require('../models/contactModel')
//@desc Get all contacts
//@route GET /api/contacts
//@access public

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find()
  res.status(200).json(contacts)
})

//@desc Post contacts
//@route POST /api/contacts
//@access public

const postContacts = asyncHandler(async (req, res) => {
  console.log('the requst is', req.body)
  const { name, email, phone } = req.body
  if (!name || !email || !phone) {
    res.status(400)
    throw new Error('All fields are Mandatory')
  }
  const contact = await Contact.create({
    name,
    email,
    phone
  })
  res.status(201).json(contact)
})

//@desc Get  contact by Id
//@route GET /api/contacts:id
//@access public

const getContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id)
  if (!contact) {
    res.status(404)
    throw new Error('Contact Not Found')
  }
  res.status(200).json(contact)
})

//@desc update  contact by ID
//@route PUT /api/contacts:id
//@access public

const putContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id)
  if (!contact) {
    res.status(404)
    throw new Error('Contact Not Found')
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true
    }
  )
  res.status(200).json(updatedContact)
})

//@desc DELETE  contact by ID
//@route DELETE /api/contacts:id
//@access public

const deleteContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id)
  if (!contact) {
    res.status(404)
    throw new Error('Contact Not Found')
  }
  await Contact.deleteOne({ _id: req.params.id });
  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  postContacts,
  getContactById,
  putContactById,
  deleteContactById
}
