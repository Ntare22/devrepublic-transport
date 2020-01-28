export default class Response {
  static sucessResponse(response, status, message, data) {
    return (response.status(status).json({ status, message, data }));
  }

  static errorResponse(response, status, error) {
    return (response.status(status).json({ status, error }));
  }
}
