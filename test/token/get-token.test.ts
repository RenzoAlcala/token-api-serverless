import { APIGatewayEvent, APIGatewayProxyEventHeaders } from "aws-lambda";

import { createToken } from "../../src/actions/token/create-token.action";
import * as Cache from "../../src/services/cache/cache.service";
import CreateTokenRequestSuccess from "../utils/mock/create-token-request-success.json";
import CreateTokenRequestErrorValidation from "../utils/mock/create-token-request-error-validation.json";
import CreateTokenHeadersRequestSuccess from "../utils/mock/create-token-headers-request-success.json";

jest.mock("../../src/services/cache/cache.service");

beforeAll(async () => {
  const mockCache = (Cache.getCache as jest.Mock);
  mockCache.mockResolvedValue({ setEx: async () => ({ }), disconnect: async () => ({ })});
});

describe('Create token', function () {
    it('Create token success', async () => {
      const event: APIGatewayEvent = {
          body: JSON.stringify(CreateTokenRequestSuccess),
          headers: (CreateTokenHeadersRequestSuccess as APIGatewayProxyEventHeaders)
      } as APIGatewayEvent;
      const result = await createToken(event);

      expect(result.statusCode).toEqual(200);
      expect(isJSON(result.body)).toBe(true);
      expect(JSON.parse(result.body)).toHaveProperty('token');
      expect(JSON.parse(result.body).token).not.toBeNull();
    });
    
    it('Error validation input body', async () => {
      const event: APIGatewayEvent = {
          body: JSON.stringify(CreateTokenRequestErrorValidation),
          headers: (CreateTokenHeadersRequestSuccess as APIGatewayProxyEventHeaders)
      } as APIGatewayEvent;
      const result = await createToken(event);

      expect(result.statusCode).toEqual(500);
    });
    
    it('Error no pk input body', async () => {
      const event: APIGatewayEvent = {
          body: JSON.stringify(CreateTokenRequestSuccess)
      } as APIGatewayEvent;
      const result = await createToken(event);

      expect(result.statusCode).toEqual(500);
    });
});

const isJSON = (str:string) => {
  try {
      const json = JSON.parse(str);
      if (Object.prototype.toString.call(json).slice(8,-1) !== 'Object') {
      return false
      }
  } catch (e) {
      return false
  }
  return true
}