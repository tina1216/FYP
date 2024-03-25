const config = {
  development: {
    PORT: process.env.PORT,
    DATABASE_URL: "postgresql://postgres:root@localhost:5432/he-votev",
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    ENCRYPTION_PASSWORD: process.env.ENCRYPTION_PASSWORD,
  },
  production: {
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    ENCRYPTION_PASSWORD: process.env.ENCRYPTION_PASSWORD,
  },
};

const environment = process.env.NODE_ENV || "development";
const currentConfig = config[environment];

module.exports = currentConfig;
