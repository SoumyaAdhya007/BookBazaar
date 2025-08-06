class ApiResponse {
  /**
   *
   * @param {number} statusCode
   * @param {string} message
   * @param {any} data
   */
  constructor(statusCode, message, data) {
    this.statusCode = statusCode;
    this.success = statusCode < 400;
    this.message = message;
    this.data = data;
  }
}

export default ApiResponse;
