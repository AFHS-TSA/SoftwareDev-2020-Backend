const mongoose = require("mongoose");

require("dotenv").config();

const MONGOURI = `mongodb+srv://admin:${process.env.DB_PASS}@cluster0-awbga.gcp.mongodb.net/tsa`;

class MongoDB {
  constructor() {
    console.log('making database object');
    this._connect();
  }

  async _connect() {
    await mongoose.connect(MONGOURI, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
      .then(() => {
        console.log(`Connection to ${MONGOURI} successful`);
      })
      .catch(err => {
        console.log(`Connection to ${MONGOURI} failed`);
      })
  }
}

module.exports = new MongoDB();
