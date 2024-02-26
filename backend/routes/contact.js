const express = require("express");
const auth = require("../common-middleware/auth");
const {
  createContact,
  getContact,
  getSingleContact,
  deleteContact,
  updateContact,
} = require("../controller/contact");
const router = express.Router();

router.post("/contact", createContact);
router.get("/mycontacts/:id", getContact);
router.get("/getsinglecontact/:id", getSingleContact);
router.delete("/delete/:id", deleteContact);
router.put("/updatecontact/:id", updateContact);

module.exports = router;
