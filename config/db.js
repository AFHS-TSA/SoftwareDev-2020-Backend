const mongoose = require("mongoose");

require("dotenv").config();

const MONGOURI = `mongodb+srv://admin:${process.env.DB_PASS}@cluster0-awbga.gcp.mongodb.net/tsa`;

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
    console.log("Connection Sucessful");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer;
