import dotenv from "dotenv";

dotenv.config();

// DECLARE ALL VARIABLES
const MONGO_DB_USER = process.env.MONGO_DB_USER || "";
const NODE_ENV = process.env.NODE_ENV || "";
const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD || "";
const MONGO_DB_APP_NAME = process.env.MONGO_DB_APP_NAME || "";
const MONGO_URL = `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@cluster0.latiew0.mongodb.net/${MONGO_DB_APP_NAME}?retryWrites=true&w=majority&appName=Cluster0"`;
const SERVER_PORT = process.env.PORT ? Number(process.env.PORT) : 5000;
const MONGO_URL_LOCAL = `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@cluster0.latiew0.mongodb.net/${MONGO_DB_APP_NAME}?retryWrites=true&w=majority&appName=Cluster0"`;

//CREATE CONFIG OBJECT
const config = {
  mongo: {
    url: MONGO_URL,
  },
  server: {
    port: SERVER_PORT,
  },
};

//CHECK FOR ENVIRONMENT
if (NODE_ENV === "production") {
  config.mongo.url = MONGO_URL;
  config.server.port = SERVER_PORT;
} else if (NODE_ENV === "local") {
  config.mongo.url = MONGO_URL_LOCAL;
  config.server.port = SERVER_PORT;
}

//EXPORT
export default config;
