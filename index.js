const Application = require("./app/server");
const DB_URL = "mongodb://localhost:27017/ProjectManegerDb";
require("dotenv").config();
new Application(3500,DB_URL)