import Joi from 'joi-oid'

const validUsersSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            "any.required": "Email field is required.",
            "string.email": "It looks like something is wrong with the email format."
        }),
    username: Joi.string()
        .required()
        .min(8)
        .max(16)
        .messages({
            "string.base": "Username must be a plain text.",
            "any.required": "Username field is required.",
            "string.empty": "Username can't be an empty string.",
            "string.min": "Username mast have at least 8 characters.",
            "string.max":"Username field must be up to 16 characters."
        }),
    bio: Joi.string()
        .pattern(/^[a-zA-Z0-9\s]+$/)
        .max(250)
        .messages({
            "string.pattern": "The bio should only contain alphanumeric characters and white spaces.",
            "string.max": "Your bio must be up 250 characters."
        }),
    password: Joi.string()        
        .required()
        .min(8)
        .max(12)
        .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/)
        .messages({
            "any.required": "Password field is required.",
            "string.empty": "Password can't be an empty string.",
            "string.pattern.base": "The password must have at least one lowercase character, one uppercase character, and one numeric character.",
            "string.min": "Password field must have at least 8 characters.",
            "string.max": "Password field must be up to 12 characters."
        }),
    verified: Joi.boolean(),
    verifyCode: Joi.string(),
    photo: Joi.string()
        .uri()
        .messages({
            "string.uri": "Something is wrong with the profile photo url."
        }),
    role: Joi.string()
})

export default validUsersSchema