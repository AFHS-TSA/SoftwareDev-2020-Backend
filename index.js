require('dotenv').config();

let appEnvVars = ['PORT'];
let mongoEnvVars = [ 'MONGO_HOSTNAME', 'MONGO_DATABASE', 'MONGO_PASSWORD', 'MONGO_USERNAME'];

appEnvVars = [...appEnvVars, ...mongoEnvVars];

let unusedEnvVars = appEnvVars.filter((i) => !process.env[i]);

// Be sure all of the ENV variables are properly set
if (unusedEnvVars.length) {
  console.error(`Required ENV variables are not set: [${unusedEnvVars.join(', ')}]`);
  process.exit(1);
}

// Launch the application
const { app } = require("./src/app");
