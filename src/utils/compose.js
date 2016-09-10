
/**
 * This guy allows us to compose functions together to make HOC composition less
 * annoying to read.
 */
const compose = (fn, ...rest) => {
  if (rest.length === 0) {
    return fn;
  }

  return (...args) => fn(compose(...rest)(...args));
};

export default compose;
