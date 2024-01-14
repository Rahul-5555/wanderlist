const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

// basic connection code copy from app.js

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
   .then(() => {
    console.log("connected to DB");
   })
   .catch((err) => {
    console.log(err);
   });

async function main() {
    await mongoose.connect(MONGO_URL); 
}

// Create a function to delete(clear) old data
const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({ ...obj, owner: "6579422cef080ad94d9a20f4" }));
    await Listing.insertMany(initData.data); // clear data
    console.log("data was initialized"); // insert data
};

initDB(); // calling the function




// const mongoose = require("mongoose");
// const initData = require("./data.js");
// const Listing = require("../models/listing.js");

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// (async () => {
//   try {
//     await main();
//     await initDB();
//   } catch (err) {
//     console.error("An error occurred:", err.message);
//   }
// })();

// async function main() {
//   try {
//     await mongoose.connect(MONGO_URL);
//     console.log("Connected to DB");
//   } catch (err) {
//     console.error("Error connecting to the database:", err.message);
//     throw err;
//   }
// }

// async function initDB() {
//   try {
//     await Listing.deleteMany({});
//     await Listing.insertMany(initData.data);
//     console.log("Data was initialized");
//   } catch (err) {
//     console.error("Error initializing data:", err.message);
//     throw err;
//   }
// }



