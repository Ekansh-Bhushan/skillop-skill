const mongoose = require("mongoose");
const MongoURL = "mongodb://127.0.0.1:27017";
const DB = "skillop-db"
mongoose.connect(`${MongoURL}/${DB}`);
