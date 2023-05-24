import {
  APIGatewayEvent,
  APIGatewayProxyResult
} from 'aws-lambda';

import { validate } from '../../validations/token/create-token.validation';
import ResponseModel from '../../model/response-lambda.model';
import { StatusCode } from '../../enums/status-code.enum';
import { Response } from '../../enums/response.enum';
import CreateTokenRequest from '../../model/token/create-token-request.model';
import { service } from '../../services/token/create-token.service';
import DefaultException from '../../model/exception/default-exception.model';

export const createToken = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body) {
      return new ResponseModel({}, StatusCode.ERROR, Response.CREATE_TOKEN_VALIDATION_FAIL).generate();
    }

    const requestData = JSON.parse(event.body);
    const validationRequestResult = validate(requestData, event.headers);
    if (validationRequestResult.error) {
      return new ResponseModel(validationRequestResult, StatusCode.ERROR, Response.CREATE_TOKEN_VALIDATION_FAIL).generate();
    }
    
    const response = await service(new CreateTokenRequest(requestData));
    return new ResponseModel(response, StatusCode.OK).generate();
  } catch (exception) {
    console.log(exception);
    if (exception instanceof DefaultException) {
      const defaultException = exception as DefaultException;
      return new ResponseModel({}, defaultException.statusCode, defaultException.message).generate();
    }
    return new ResponseModel({}, StatusCode.ERROR, Response.CREATE_TOKEN_GENERIC_ERROR).generate();
  }
}