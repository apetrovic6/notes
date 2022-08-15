// development .env variables
export default () => ({
  JWT_SECRET: 'secretKey',
  JWT_EXPIRY: '1d',
  REDIS_HOST: 'localhost',
  REDIS_PORT: 6379,
});
