const express = require('express');
const {contactForm, getAllContacts, deleteContact} = require("../controllers/contactController")
const router = express.Router();
const {isAuthenticatedUser,authorizeRoles} = require("../middleware/auth")

//contact form routes
router.route("/contact").post(contactForm);

router.route("/admin/contacts").get(isAuthenticatedUser,authorizeRoles("admin"),getAllContacts);

router.route("/admin/contact/:id").delete(isAuthenticatedUser,authorizeRoles("admin"),deleteContact);

module.exports = router;