import Joi, { ValidationResult } from 'Joi';

export const validate = (payload: any) : ValidationResult => {

  const validateObject = Joi.object({
    token: Joi.string().length(16).required()
  });
  const resultValidation = validateObject.validate(payload);
  return resultValidation;
}