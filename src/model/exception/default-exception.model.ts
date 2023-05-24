export default class DefaultException extends Error {

  constructor(public statusCode: number, public message: string = "Error") {
      super();
  }

  throw(condition: boolean) {
    if (condition) {
      throw this;
    }
  }
}