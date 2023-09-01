const mongoose = require("mongoose");
const mongoUri = "mongodb://127.0.0.1:27017/mvp";
mongoose.set("strictQuery", false)

mongoose.connect('mongodb://127.0.0.1/mvp')
  .then(() => {
    console.log("connected")
  })
  .catch(err => {
    console.log(err)
  })

const db = mongoose;
module.exports = db