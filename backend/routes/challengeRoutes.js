const express = require("express");
const router = express.Router();
const { getChallenges, getChallengeById, submitChallenge } = require("../controllers/challengeController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getChallenges);
router.get("/:id", protect, getChallengeById);
router.post("/submit", protect, submitChallenge);

module.exports = router;
