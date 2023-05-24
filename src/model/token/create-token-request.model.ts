interface ICreateTokenRequest {
  card_number: string;
  cvv: string;
  expiration_month: string;
  expiration_year: string;
  email: string;
  token?: string;
}

export default class CreateTokenRequest {

  public card_number: string;
  public cvv: string;
  public expiration_month: string;
  public expiration_year: string;
  public email: string;
  public token: string|undefined;

  constructor({ card_number, cvv, expiration_month, expiration_year, email, token}: ICreateTokenRequest) {
    this.card_number = card_number;
    this.cvv = cvv;
    this.expiration_month = expiration_month;
    this.expiration_year = expiration_year;
    this.email = email;
    this.token = token;
}


}