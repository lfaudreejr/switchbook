
export const config = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  SESSION_SECRET: process.env.SESSION_SECRET,
  MONGO_PROD_URI: process.env.MONGO_PROD_URI,
  MONGO_DEV_URI: process.env.MONGO_DEV_URI,
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  AUTH0_ID: process.env.AUTH0_ID,
  AUTH0_SECRET: process.env.AUTH0_SECRET,
  AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL
};
