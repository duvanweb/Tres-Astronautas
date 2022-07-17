export default () => {
  return {
    mongo: {
      user: process.env.MONGO_INITDB_ROOT_USERNAME,
      password: process.env.MONGO_INITDB_ROOT_PASSWORD,
      dbName: process.env.MONGO_DB,
      port: process.env.MONGO_PORT,
      host: process.env.MONGO_HOST,
      connection: process.env.MONGO_CONNECTION,
    },
    jwtSecret: process.env.JWT_SECRET,
  };
};