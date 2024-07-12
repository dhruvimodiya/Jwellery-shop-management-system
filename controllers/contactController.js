const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Contact = require("../models/contactModel");

//Contact mail to the admin account
exports.contactForm = catchAsyncErrors(async (req, res) => {
  const { name, email, phoneNo, message } = req.body;

  const contact = await Contact.create({
    name,
    email,
    phoneNo,
    message,
  });
  res.status(200).json({
    success: true,
    contact,
  });
});

//get all contacts
exports.getAllContacts = catchAsyncErrors(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).send({
    success: true,
    contacts,
  });
});

//delete contact
exports.deleteContact = catchAsyncErrors(async (req, res, next) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);
  if (!contact) {
    return next(
      new ErrorHandler(`User does not exist with Id ${req.params.id}`, 400)
    );
  }

  await contact.deleteOne();
  res.status(200).json({
    success: true,
    message: "Contact Deleted Successfully.",
  });
});
