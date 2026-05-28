import * as Joi from "joi";
export const validationSchema = Joi.object({
    NODE_ENV: Joi.string().valid('development', 'production', 'test', 'missing').required(),
    APP_NAME: Joi.string().required(),
    APP_PORT: Joi.number().integer().min(1).required(),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().integer().min(1).required(),
    DB_USER: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_NAME: Joi.string().required(),
    PAYMENT_PROVIDER: Joi.string().required(),
    PAYMENT_API_KEY: Joi.string().min(8).required(),
    PAYMENT_TIMEOUT_MS: Joi.number().integer().min(1).required(),
    PAYMENT_WEBHOOK_SECRET: Joi.string().required(),
}).unknown(true);