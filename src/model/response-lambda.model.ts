// Interfaces
import {
  IResponseErrorBody,
  IResponse,
  ResponseHeader,
} from '../interfaces/response.interface';

// Enums
import { Status } from '../enums/status.enum';
import { StatusCode } from '../enums/status-code.enum';


const RESPONSE_HEADERS: ResponseHeader = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*', // Required for CORS support to work
  'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
};

export const STATUS_MESSAGES = {
  [StatusCode.OK]: Status.SUCCESS,
  [StatusCode.BAD_REQUEST]: Status.BAD_REQUEST,
  [StatusCode.ERROR]: Status.ERROR,
}


export default class ResponseModel {
  private body: any;
  private code: number;
  private bodyError: IResponseErrorBody | undefined;

  constructor(data = {}, code = StatusCode.BAD_REQUEST, message = '') {
    if (message) {
      this.bodyError = {
          data: data,
          message: message,
          status: STATUS_MESSAGES[code],
      };
    } else {
      this.body = data;
    }
    this.code = code;
  }

  setData = (data: any): void => {
      this.body.data = data;
  }

  setCode = (code: number): void => {
      this.code = code;
  }

  getCode = (): number => {
      return this.code;
  }

  setMessage = (message: string): void => {
      this.body.message = message;
  }

  getMessage = (): any => {
      return this.body.message;
  }

  generate = (): IResponse => {
    if (this.body) {
      return {
        statusCode: this.code,
        headers: RESPONSE_HEADERS,
        body: JSON.stringify(this.body),
      };
    }
    return {
        statusCode: this.code,
        headers: RESPONSE_HEADERS,
        body: JSON.stringify(this.bodyError),
    };
  }
}