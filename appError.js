'use strict';

module.exports = class AppError extends Error {
  constructor (errno, error, stack = null) {

    // Create base Error
    super(error);

    // Capturing stack trace
    if (stack === null) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = stack;
    }

    this.errno = errno || 500;
    this.error = error || "Unexepected error";
  }

  static fromError(err) {
    // Get sure that err is an Error
    if (!(err instanceof Error)) {
      throw new AppError(500, "Impossible to create error from a non Error object: (" + err.constructor.name + ") " + err.toString());
    }

    if (err instanceof AppError) {
      return err;
    } else {
      return new AppError(500, err.message, err.stack);
    }
  }
};
