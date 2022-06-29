const Joi = require('@hapi/joi');

export const envValidation = Joi.object({
  PORT: Joi.number().required().default(3000),
  DB_USER: Joi.required().default('postgres'),
  DB_PASSWORD: Joi.required().default('postgres'),
  DB_NAME: Joi.required().default('postgres'),
  DB_HOST: Joi.required().default('postgres'),
  DB_PORT: Joi.number().required().default(5432),
});
