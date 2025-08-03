
class ApiResponse {
    /**
     * 
     * @param {number} statusCode 
     * @param {any} data 
     * @param {string} message 
     */
  constructor(statusCode, data, message) {
    this.statusCode = statusCode;
    this.success = success < 400;
    this.message = message;
    this.data = data;
  }
}

export default ApiResponse;
