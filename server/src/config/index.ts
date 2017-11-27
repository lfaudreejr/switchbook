require('dotenv').config();

export const config = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_PROD_URI: process.env.MONGO_PROD_URI,
  MONGO_DEV_URI: process.env.MONGO_DEV_URI
};
