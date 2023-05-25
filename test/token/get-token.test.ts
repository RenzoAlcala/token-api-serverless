import { APIGatewayEvent, APIGatewayProxyEventPathParameters } from "aws-lambda";

import { getToken } from "../../src/actions/token/get-token.action";
import * as Cache from "../../src/services/cache/cache.service";
import GetTokenRequestSuccess from "../utils/mock/get-token-request-success.json";
import CreateTokenRequestSuccess from "./../utils/mock/create-token-request-success.json";

jest.mock("../../src/services/cache/cache.service");

beforeAll(async () => {
  const mockCache = (Cache.getCache as jest.Mock);
  mockCache.mockResolvedValue({ get: async () => (JSON.stringify(CreateTokenRequestSuccess)), 
    setEx: async () => ({ }), disconnect: async () => ({ })});
});

describe('** Get token **', function () {
    it('Get token success', async () => {
      const event: APIGatewayEvent = {
          pathParameters: (GetTokenRequestSuccess as APIGatewayProxyEventPathParameters)
      } as APIGatewayEvent;
      const result = await getToken(event);

      expect(result.statusCode).toEqual(200);
    });
    
});