const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 });

const withCache = (key, ttl, fn) => async (req, res, next) => {
  const cacheKey = `${key}:${req.url}`;
  const cached = cache.get(cacheKey);
  if (cached) return res.json(cached);
  res._originalJson = res.json.bind(res);
  res.json = (data) => {
    if (res.statusCode === 200) cache.set(cacheKey, data, ttl);
    return res._originalJson(data);
  };
  next();
};

const bustCache = (keyPrefix) => cache.keys().forEach((k) => {
  if (k.startsWith(keyPrefix)) cache.del(k);
});

module.exports = { cache, withCache, bustCache };
