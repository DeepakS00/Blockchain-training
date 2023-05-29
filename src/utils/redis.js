const Redis = require('ioredis');
const redis = new Redis();

async function get(key) {
  const value = await redis.get(key);
  return JSON.parse(value);
}

function set(key, value) {
  return redis.set(key, JSON.stringify(value));
}

async function multi(key, value) {
  const watchKey = `locks:${key}`;
  const lockKey = `locks:${key}:lock`;
  await redis.watch(watchKey);
  const lock = await redis.set(lockKey, 'LOCKED', 'NX', 'PX', 1000);
  if (!lock) {
    throw new Error('Concurrency issue occurred');
  }
  try {
    await redis.multi().set(key, value).exec();
  } catch (err) {
    return err;
  } finally {
    await redis.del(lockKey);
  }
}

module.exports = {get, set, multi};
