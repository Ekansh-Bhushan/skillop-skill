const mongoose = require("mongoose");
const MongoURL = "mongodb+srv://ekanshbhushan:PC6uj362iYe0zu6X@cluster0.z6hljps.mongodb.net/?retryWrites=true&w=majority";
const DB = "skillop-db"
mongoose.connect(`${MongoURL}/${DB}`);
