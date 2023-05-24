import Joi, { ValidationResult } from 'Joi';
import Luhn from 'luhn';

export const validate = (payload: any, headers: any) : ValidationResult => {

  const validateObject = Joi.object({
    card_number: Joi.string().min(13).max(16).pattern(/^[0-9]+$/).custom((value: any, helper: any) => {

      if (!Luhn.validate(value)) {
        return helper.message("Card number incorrect"); 
      }

      return value;
    }).required(),
    cvv: Joi.string().min(3).max(4).pattern(/^[0-9]+$/).required(),
    expiration_month: Joi.string().length(2).pattern(/^[0-9]+$/).custom((value: any, helper: any) => {

      if (parseInt(value) > 12 && parseInt(value) < 1) {
        return helper.message("Expiration month incorrect"); 
      }

      return value;
    }).required(),
    expiration_year: Joi.string().length(4).pattern(/^[0-9]+$/).custom((value: any, helper: any) => {
      const currentYear = new Date().getFullYear();
      if (parseInt(value) > currentYear + 5 && parseInt(value) < currentYear) {
        return helper.message("Expiration year incorrect"); 
      }

      return value;
    }).required(),
    pk: Joi.string().custom((value: any, helper: any) => {
      const keyBearer = value.split(' ');

      if (keyBearer.length < 2) {
        return helper.message("Error pk format"); 
      }
      if (keyBearer[1].length !== 24) {
        return helper.message("Error pk incorrect"); 
      }

      return value;
    }).required(),
    email: Joi.string().email().required()
  });
  const resultValidation = validateObject.validate({ ...payload, pk: headers.Authorization });
  return resultValidation;
}