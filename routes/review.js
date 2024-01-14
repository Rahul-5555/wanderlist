const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");

const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {
    validateReview,
    isLoggedIn,
    isReviewAuthor } = require("../middleware.js");
 
const reviewController = require("../controllers/reviews.js");    
// lecture 5 day 47 Reviews[POST Route]
router.post("/",
    isLoggedIn,
    validateReview,
    wrapAsync(reviewController.createReview));



// lecture 9 day 47 deleting route for delete reviews
router.delete("/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviewController.destroyReview)
);

module.exports = router;
