
function HttpError(message, statusCode = 500) {
  this.name = 'HttpError';
  this.message = message;
  this.statusCode = statusCode;
  this.stack = (new Error()).stack;
}
HttpError.prototype = new Error();

export default HttpError;
