const express = require("express");
const Contact = require("../model/contact");
const slugify = require("slugify");
const authHeader = require("../common-middleware/auth");

// create contact
exports.createContact = async (req, res) => {
  try {
    const { name, email, number, address, userId } = req.body;
    //  console.log(req.body);

    switch (true) {
      case !name:
        res.send({ message: "name is required" });

      case !email:
        res.send({ message: "email is required" });

      case !number:
        res.send({ message: "number is required" });

      case !address:
        res.send({ message: "address is required" });

      case !userId:
        res.send({ message: "createdBy is required" });
    }

    const response = await Contact.create({
      ...req.body,
      createdBy: userId,
      slug: slugify(name),
    });

    if (response) {
      res.send({
        status: 200,
        success: true,
        message: "add contact Sucessfully",
      });
    }
  } catch (error) {
    res.send({ error: error.message });
  }
};

// fetch contact

exports.getContact = async (req, res) => {
  console.log(req.params.id);
  try {
    const response = await Contact.find({ createdBy: req.params.id })
      .populate("createdBy")
      .select("-hash_password");
    // console.log("response", response);
    if (response) {
      res.status(200).json({ contact: response });
    } else {
      res.send({ message: "not contacts" });
    }
  } catch (error) {
    res.send({ status: 400, error: true, message: error.message });
  }
};

// get single  contact

exports.getSingleContact = async (req, res) => {
  console.log(req.params.id);
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json(contact);
    console.log(contact);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// delete contact

exports.deleteContact = async (req, res) => {
  try {
    console.log(req.params.id);
    const response = await Contact.findByIdAndDelete(req.params.id);
    console.log(response);
    if (response) {
      res.send({
        status: 200,
        error: false,
        success: true,
        message: "contact deleted",
      });
    } else {
      res.send({
        status: 400,
        error: true,
        success: false,
      });
    }
  } catch (error) {
    res.send({ status: 400, error: true, message: error.message });
  }
};

// update contact

exports.updateContact = async (req, res) => {
  try {
    const { name, email, number, address, createdBy } = req.body;
    const { id } = req.params;

    if (!name || !email || !number || !address || !createdBy) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const response = await Contact.findByIdAndUpdate(
      id,
      { ...req.body, slug: slugify(name) },
      { new: true }
    );

    if (response) {
      return res.status(200).json({
        error: false,
        success: true,
        message: "Contact updated",
        response,
      });
    } else {
      return res.status(404).json({
        error: true,
        success: false,
        message: "Contact not found",
      });
    }
  } catch (error) {
    return res.status(500).json({ error: true, message: error.message });
  }
};
