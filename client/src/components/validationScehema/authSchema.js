import Joi from 'joi';

export const authSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required().label("Email"),
  password: Joi.string().min(6).required().label("Password")
});


export const signinSchema = Joi.object({
    first_name: Joi.string()
    .min(2)
    .max(30)
    .required()
    .label('First Name'),

  last_name: Joi.string()
    .min(2)
    .max(30)
    .required()
    .label('Last Name'),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .label('Email'),

  password: Joi.string()
  .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$'))
  .required()
  .label('Password')
  .messages({
    'string.pattern.base': 'Password must contain uppercase, lowercase, number, and special character',
  })

});

export const formSchema = Joi.object({
  title: Joi.string().trim().required().label("Title"),
  description: Joi.string().trim().required().label("Description"),
  status: Joi.string().valid('Pending', 'Completed').required().label("Status")
})
