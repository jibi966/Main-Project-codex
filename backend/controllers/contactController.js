const Contact = require("../models/Contact");

exports.submitContact = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const contactData = {
            name,
            email,
            subject,
            message,
        };

        if (req.user) {
            contactData.user = req.user._id;
            contactData.role = req.user.role === "tutor" ? "tutor" : "student";
        }

        const contact = await Contact.create(contactData);

        res.status(201).json({
            message: "Message sent successfully! We will get back to you soon.",
            contact,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
