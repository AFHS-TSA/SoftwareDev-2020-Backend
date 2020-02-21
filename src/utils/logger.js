const timestamp = require("time-stamp");

class Logger {
  constructor() {
    console.info("[\x1b[33m%s\x1b[0m] \x1b[32m::\x1b[0m", this._getTimestamp(), "Starting Application");
  }

  _getTimestamp() {
    return timestamp("HH:MM:ss.ms");
  }

  info(message) {
    console.info("[\x1b[33m%s\x1b[0m] \x1b[32m::\x1b[0m %s", this._getTimestamp(), message);
  }

  warn(message) {
    console.warn("[\x1b[33m%s\x1b[0m] \x1b[33m::\x1b[0m %s", this._getTimestamp(), message);
  }

  error(message, error) {
    console.error("[\x1b[33m%s\x1b[0m] \x1b[31m::\x1b[0m %s\n%s", this._getTimestamp(), message, error);
  }
}

module.exports = new Logger();
