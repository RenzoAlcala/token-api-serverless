import {
  APIGatewayEvent,
  APIGatewayProxyResult
} from 'aws-lambda';

import { validate } from '../../validations/token/get-token.validation';
import ResponseModel from '../../model/response-lambda.model';
import { StatusCode } from '../../enums/status-code.enum';
import { Response } from '../../enums/response.enum';
import GetTokenRequest from '../../model/token/get-token-request.model';
import { service } from '../../services/token/get-token.service';
import DefaultException from '../../model/exception/default-exception.model';

export const getToken = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {

  try {
    if (!event.pathParameters) {
      return new ResponseModel({}, StatusCode.ERROR, Response.GET_TOKEN_VALIDATION_FAIL).generate();
    }

    const requestData = event.pathParameters;
    const validationRequestResult = validate(requestData);
    if (validationRequestResult.error) {
      return new ResponseModel(validationRequestResult, StatusCode.ERROR, Response.GET_TOKEN_VALIDATION_FAIL).generate();
    }
    
    const response = await service(new GetTokenRequest(requestData.token as string));
    return new ResponseModel(response, StatusCode.OK).generate();
  } catch (exception) {
    console.log(exception);
    if (exception instanceof DefaultException) {
      const defaultException = exception as DefaultException;
      return new ResponseModel({}, defaultException.statusCode, defaultException.message).generate();
    }
    return new ResponseModel({}, StatusCode.ERROR, Response.GET_TOKEN_GENERIC_ERROR).generate();
  }
}