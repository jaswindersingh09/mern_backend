const express = require("express");
const router = express.Router();

const {getAllUsers, getAllContacts, deleteUsers, getUserById, updateUsers, deleteContact} = require("../controller/admin-controller");
const userMiddleware = require("../middleware/user-middleware");
const adminMiddleware = require("../middleware/admin-middleware");

router.route("/users").get(userMiddleware,adminMiddleware,getAllUsers)

router.route("/users/:id").get(userMiddleware,adminMiddleware,getUserById)

router.route("/users/update/:id").patch(userMiddleware,adminMiddleware, updateUsers)

router.route("/users/delete/:id").delete(userMiddleware,adminMiddleware, deleteUsers)

router.route("/contacts").get(userMiddleware,adminMiddleware,getAllContacts)

router.route("/contacts/delete/:id").delete(userMiddleware,adminMiddleware, deleteContact)

module.exports = router;