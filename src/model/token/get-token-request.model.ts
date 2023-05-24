export default class GetTokenRequest {

  private _token: string;

  constructor(token: string) {
    this._token = token;
  }

  public get token(): string {
    return this._token;
  }

  public set token(value: string) {
    this._token = value;
  }
}