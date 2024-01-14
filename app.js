if(process.env.NODE_ENV != "production") {
    require("dotenv").config();
}
require("dotenv").config();
// console.log(process.env.SECRET);
// 1 basic code setup
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require('passport-local');
const User = require("./models/user.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

// 4 database k async function likhenge(connect database)\\

const dbUrl = process.env.ATLASDB_URL;

main()
    .then(() => {
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log(err);
    })

async function main() {
    await mongoose.connect(MONGO_URL);
}


// lecture 5 
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// lecture 6
app.use(express.urlencoded({ extended: true }));
// lecture 8
app.use(methodOverride("_method"));
// lecture 10 
app.engine("ejs", ejsMate);
// lecture 10 use static file
app.use(express.static(path.join(__dirname, "/public")));

// lecture 2 day 55
const store =  MongoStore.create({
    // mongoUrl: dbUrl,
    mongoUrl: MONGO_URL,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});

store.on("error", () => {
    console.log("ERROR IN MONGO SESSION STORE", err);
});

// lecture 7 day 49 //
const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
};

// // 3 base api create krenge
// app.get("/", (req, res) => {
//     res.send("Hi, I am root");
// });


app.use(session(sessionOptions));
app.use(flash());

// day 50 lecture 7 
app.use(passport.initialize()); // isse hr ek req k liye passport initilize ho jyega 
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// lecture 9 day 49 //

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});





app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

// lecture 5 add expresserror
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page not found"));
});

// Lecture 3 (custom error handling) define a middleware 
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong!" } = err;
    res.status(statusCode).render("error.ejs", { message });
    // res.status(statusCode).send(message);
});

// 2 start the server on the port 8080
app.listen(8080, () => {
    console.log("server is listening to port 8080");
});





// // create new route(after that require model)
// app.get("/testListing", async (req, res) => {
//     let sampleListing = new Listing({
//         title: "My new Villa",
//         description: "By the beach",
//         price: 1200,
//         location: "Calangute, Goa",
//         country: "India",
//     });


// await sampleListing.save();
// console.log('sample was saved');
// res.send("successful testing")
// });