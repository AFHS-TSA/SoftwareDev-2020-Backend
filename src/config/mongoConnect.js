const mongoose = require("mongoose");
const logger = require('../utils/logger');

const MONGO_PROTOCOL = "mongodb+srv://";
const MONGO_CREDENTIALS = `${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}`;
const MONGO_LOCATION = `${process.env.MONGO_HOSTNAME}/${process.env.MONGO_DATABASE}`;

const MONGO_URI = `${MONGO_PROTOCOL}${MONGO_CREDENTIALS}@${MONGO_LOCATION}`;

class MongoDB {
  constructor() {
    this._connect();
  }

  async _connect() {
    await mongoose.connect(MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
      .then(() => {
        logger.info(`Connection to ${MONGO_LOCATION} successful`);
      })
      .catch(err => {
        logger.error(`Connection to ${MONGO_LOCATION} failed`, err);
      })
  }
}

module.exports = new MongoDB();
