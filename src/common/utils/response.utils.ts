export class ResponseUtil {
  static success(message: string, data: any, statusCode = 200) {
    return {
      status_code: statusCode,
      status: true,
      message,
      data,
    };
  }

  static error(message: string, statusCode = 400, data: any = null) {
    return {
      status_code: statusCode,
      status: false,
      message,
      data,
    };
  }
}
