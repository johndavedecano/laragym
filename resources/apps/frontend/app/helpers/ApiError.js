export default class ApiError {
  constructor(response) {
    this.name = 'ApiException';
    this.status = response.status;
    this.message = response.data;
    this.errors = {};

    if (this.status === 422) {
      this.errors = response.data.error.errors;
      this.message = response.data.error.message;
    }
  }
}
