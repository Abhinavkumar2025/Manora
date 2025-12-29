import Joi from 'joi';

export const reportSchema = Joi.object({
    reportType: Joi.string()
        .valid('lost', 'found')
        .required(),
    
    itemName: Joi.string()
        .min(2)
        .required(),

    location: Joi.string()
        .required(),

    description: Joi.string()
        .max(500)
        .required(),
}).messages({
    "any.required": "{#label} is required",
    "string.empty": "{#label} cannot be empty",
    "string.min": "{#label} length is too short",
    "any.only": "{#label} must be either Lost or Found",
})