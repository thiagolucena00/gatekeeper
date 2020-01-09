/**
 * Class representing an API error.
 * @extends Error
 */
class APIError extends Error {
  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param {number} status - HTTP status code of error.
   */
  constructor(message, status = 500) {
    super(message);

    this.name = this.constructor.name;
    this.status = status;
    Error.captureStackTrace(this, this.constructor)

    this.errors = [
      {
        msg: message,
      }];

  }

  pushError(message) {
    this.errors.push({
      msg: message
    });
  }

}
module.exports = APIError;
