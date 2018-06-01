const MESSAGE_422 = 'Data validation was unsuccessfull.';
const MESSAGE_400 = 'Bad Request';
const MESSAGE_401 = 'Your must be logged in to access this page.';
const MESSAGE_403 = 'Your not authorized to access this page.';
const MESSAGE_500 = 'Internal Server Error.';
const MESSAGE_404 = 'Internal Server Error.';

export class ApiError {
  constructor({ response }) {
    this.name = 'ApiException';
    this.status = response.status;
    this.message = response.data;
    this.errors = {};

    if (this.status === 404) {
      this.message = response.data.message || MESSAGE_404;
    }

    if (this.status === 500) {
      this.message = response.data.message || MESSAGE_500;
    }

    if (this.status === 400) {
      this.message = response.data.message || MESSAGE_400;
    }

    if (this.status === 422) {
      this.errors = response.data.error.errors;
      this.message = response.data.message || MESSAGE_422;
    }

    if (this.status === 401) {
      this.message = response.data.message || MESSAGE_401;
    }

    if (this.status === 403) {
      this.message = response.data.message || MESSAGE_403;
    }
  }
}

ApiError.prototype = Error.prototype;

export class ReduxError {
  constructor(error) {
    this.name = 'ReduxError';
    this.message = error.message;
  }
}

ReduxError.prototype = Error.prototype;
