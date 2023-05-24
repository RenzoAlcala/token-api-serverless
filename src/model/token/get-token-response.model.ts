interface IGetTokenResponse {
  card_number: string;
  expiration_month: string;
  expiration_year: string;
  email: string;
}

export default class GetTokenResponse {

  public card_number: string;
  public expiration_month: string;
  public expiration_year: string;
  public email: string;

  constructor({ card_number, expiration_month, expiration_year, email}: IGetTokenResponse) {
    this.card_number = card_number;
    this.expiration_month = expiration_month;
    this.expiration_year = expiration_year;
    this.email = email;
}

}