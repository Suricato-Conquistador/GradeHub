const { authentication, restrictTo } = require("../controllers/authController");
const { createUserPreference, getUserPreferenceById, updateUserPreference, getUserPreferencesByStudentId } = require("../controllers/userPreferenceController");

const router = require("express").Router();

router.route("/").post( createUserPreference);
router.route("/:id").get( getUserPreferenceById);
router.route("/:id").patch( updateUserPreference);
router.route("/student/:studentId").get( getUserPreferencesByStudentId);

module.exports = router;

