import GeneratePassword from 'generate-password';

import CreateTokenRequest from "../../model/token/create-token-request.model";
import CreateTokenResponse from "../../model/token/create-token-response.model";
import { getCache } from "../cache/cache.service";

export const service = async (createTokenPayload: CreateTokenRequest) : Promise<CreateTokenResponse> => {

  const token : string = GeneratePassword.generate({
    length: 16,
    numbers: true,
    uppercase: true,
  });

  createTokenPayload.token = token;
  const cache = await getCache();
  await cache.setEx(token, 60, JSON.stringify(createTokenPayload));
  await cache.disconnect();
  return new CreateTokenResponse(token);

}