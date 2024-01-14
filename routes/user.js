const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/users.js"); // day 52 lecture 3 //

// lecture 4 Day 52 //
router.
    route("/signup")
    .get(userController.renderSignupForm)
    .post(wrapAsync(userController.signup));


router
    .route("/login")
    .get(userController.renderLoginForm)
    .post(
        saveRedirectUrl,
        passport.authenticate("local", {
            failureRedirect: "/login", failureFlash: true,
        }),
        userController.login  // lecture 3 day 52
    )



// day 52 lecture 2 
router.get("/logout", userController.logout);

module.exports = router;
