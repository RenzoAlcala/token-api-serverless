import GetTokenRequest from "../../model/token/get-token-request.model";
import GetTokenResponse from "../../model/token/get-token-response.model";
import { getCache } from "../cache/cache.service";
import DefaultException from '../../model/exception/default-exception.model';
import { StatusCode } from '../../enums/status-code.enum';
import { Response } from '../../enums/response.enum';

export const service = async (getTokenPayload: GetTokenRequest) : Promise<GetTokenResponse> => {

  const cache = await getCache();
  const cardInfoString = await cache.get(getTokenPayload.token);

  console.log(`cardInfoString ${cardInfoString}`);
  if (!cardInfoString) {
    throw new DefaultException(StatusCode.ERROR, Response.GET_TOKEN_MISSING_CARD);
  }
  const cardInfo = JSON.parse(cardInfoString);
  console.log(`cardInfo ${cardInfoString}`);
  await cache.disconnect();
  return new GetTokenResponse(cardInfo);

}