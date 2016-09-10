import createCache from 'lru-cache';

const cache = createCache({
  max: 50,
});

export default async function cachable(key, ttl, valueFn) {
  let value = cache.get(key);
  if (value === undefined) {
    try {
      value = await valueFn();
    } catch (err) {
      throw err;
    }
    cache.set(key, value, ttl);
  }

  return value;
}
