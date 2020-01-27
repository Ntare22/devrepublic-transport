export default class Response {
  static sucessResponse(response, status, message, data) {
    return (response.status(status).json({ status, message, data }));
  }
}
