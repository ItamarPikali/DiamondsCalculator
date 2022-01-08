const Joi = require("joi");

class Credentials {
  constructor(credentials) {
    this.username = credentials.username;
    this.password = credentials.password;
  }

  static #validationSchema = Joi.object({
    username: Joi.string().required().min(3),
    password: Joi.string().required().min(4),
  });

  validate() {
    const result = Credentials.#validationSchema.validate(this, {
      abortEarly: false,
    });
    return result.error ? result.error.details.map((err) => err.message) : null;
  }
}

module.exports = Credentials;
