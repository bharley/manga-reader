// Based on: https://github.com/dayAlone/koa-webpack-hot-middleware/blob/master/index.js
export default function applyExpressMiddleware(fn, req, res) {
  const originalEnd = res.end;

  return new Promise((resolve) => {
    res.end = function () {
      originalEnd.apply(this, arguments); // eslint-disable-line prefer-rest-params
      resolve(false);
    };
    fn(req, res, () => {
      resolve(true);
    });
  });
}
