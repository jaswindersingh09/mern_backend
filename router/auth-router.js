const express = require("express")
const router = express.Router();

const authController = require("../controller/auth-controller");
const validate = require("../middleware/auth-middleware");
const {loginSchema, signUpSchema} = require("../validators/auth-validator");
const userMiddleware = require("../middleware/user-middleware");

router.route("/").get(authController.home)

router.route("/register").post(validate(signUpSchema), authController.register)

router.route("/login").post(validate(loginSchema), authController.login)

router.route("/user").get(userMiddleware, authController.user)

module.exports = router
