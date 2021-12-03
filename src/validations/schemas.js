import joi from 'joi';

const youtubeLinkRegex =
    /^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.be)\/.+$/;

const recommendations = joi.object({
    name: joi.string().min(3).required().messages({
        'string.base': `"name" should be a type of 'text'`,
        'string.empty': `"name" cannot be an empty field`,
        'string.min': `"name" should have a minimum length of {#limit}`,
        'any.required': `"name" is a required field`,
    }),
    youtubeLink: joi
        .string()
        .pattern(new RegExp(youtubeLinkRegex))
        .required()
        .messages({
            'string.base': `"youtubeLink" should be a type of 'text'`,
            'string.empty': `"youtubeLink" cannot be an empty field`,
            'string.pattern.base': `"youtubeLink" should be a valid youtube url`,
            'any.required': `"youtubeLink" is a required field`,
        }),
});

export { recommendations };
