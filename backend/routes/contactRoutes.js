const express = require("express");
const router = express.Router();
const { submitContact, getAllContacts } = require("../controllers/contactController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// Helper middleware to optionally protect
const optionalProtect = (req, res, next) => {
    if (req.headers.authorization) {
        return protect(req, res, next);
    }
    next();
};

router.post("/submit", optionalProtect, submitContact);
router.get("/all", protect, adminOnly, getAllContacts);

module.exports = router;
