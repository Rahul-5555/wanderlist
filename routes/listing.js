const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const listingController = require("../controllers/listings.js");
const multer = require("multer")
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

// day 52 lecture 4 
router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(
        isLoggedIn,
        
        upload.single('listing[image]'),
        validateListing,
        wrapAsync(listingController.createListing)
    );
   

// lecture 7 :- creating new route and render the form
router.get("/new", isLoggedIn, listingController.renderNewForm);


router.
    route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(
        isLoggedIn,
        isOwner,
        upload.single('listing[image]'),
        validateListing,
        wrapAsync(listingController.updateListing)
    )
    .delete(
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.destroyListing)
);





// lecture 5 create index route send GET request to /listings returns all listings
// router.get("/", wrapAsync(listingController.index)); // index is a function we create in the controller folder,inside it listings.js




// lecture 6 show route 
// router.get("/:id", wrapAsync(listingController.showListing)

// );

// lecture 7 Create POST route(some changes did L3 custom error handler )

// router.post("/",
//     isLoggedIn,
//     validateListing,
//     wrapAsync(listingController.createListing)
// );

// lecture 8 create edit route after this we create a form in the listing folder (edit.ejs)
router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.renderEditForm)
);

// // lecture 8 update route
// router.put("/:id",
//     isLoggedIn,
//     isOwner,
//     validateListing,
//     wrapAsync(listingController.updateListing)
// );

// // Lecture 9 delete route
// router.delete("/:id",
//     isLoggedIn,
//     isOwner,
//     wrapAsync(listingController.destroyListing)
// );

module.exports = router;
