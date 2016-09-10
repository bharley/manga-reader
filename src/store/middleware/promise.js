
export default function promiseMiddleware() {
  return (store) => next => action => {
    const { promise: promiseCreator, types, ...rest } = action;

    // If the action doesn't match what we expect, fall through
    if (!promiseCreator || !types || !Array.isArray(types)) {
      return next(action);
    }

    // Pull the action types off of the action
    const [REQUEST, SUCCESS, FAILURE] = types;

    // Fire off the initial action
    next({ ...rest, type: REQUEST });

    let promise;
    try {
      // Create the promise
      promise = promiseCreator({ store });
    } catch (error) {
      // If there was an error creating the promise, fail
      next({ ...rest, type: FAILURE, error });

      // We return a reject to keep our function signature consistent
      return Promise.reject(error);
    }

    // We return this promise so dispatchers can wait for this to resolve
    return promise.then((response) => {
      // Fire off the success action
      next({ ...rest, type: SUCCESS, response });
    }, (error) => {
      // Fire off the error action
      next({ ...rest, type: FAILURE, error });
    });
  };
}
