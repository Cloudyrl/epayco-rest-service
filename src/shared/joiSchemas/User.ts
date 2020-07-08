import Joi from "@hapi/joi";

export const createUserSchema = Joi.object().keys({
    document: Joi.string().required(),
    name: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  });
  