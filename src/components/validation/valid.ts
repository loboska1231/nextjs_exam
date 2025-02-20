import Joi from "joi";

export const validForm = Joi.object({
    username: Joi.string()
        .pattern(/^[a-zA-Z]{1,40}$/)
        .min(1)
        .max(40)
        .required()
        .messages({
            "string.pattern.base": 'тільки слово',
            "string.min" : 'довжина слова менше 1',
            "string.max" : 'довжина слова більше 20',
        }),
    password : Joi.string()
        .min(1)
        .max(50)
        .required()
        .messages({
            "password.min" : 'довжина слова менше 1',
            "password.max" : 'довжина слова більше 20',
        }),
    expiresInMins : Joi.optional()


})