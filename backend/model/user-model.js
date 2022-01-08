const Joi = require("joi");

class userModel {
  constructor(userId, userFirstName, userLastName, chosenUserName, password) {
    if (arguments.length === 5) {
      this.userId = userId;
      this.userFirstName = userFirstName;
      this.userLastName = userLastName;
      this.chosenUserName = chosenUserName;
      this.password = password;
    } else if (arguments.length === 1) {
      const user = arguments[0];
      this.userId = user.userId;
      this.userFirstName = user.userFirstName;
      this.userLastName = user.userLastName;
      this.chosenUserName = user.chosenUserName;
      this.password = user.password;
    } else throw "structure error";
  }

  toString() {
    return `${this.userId} - ${this.userFirstName}-${this.userLastName}-${this.chosenUserName}-${this.password}`;
  }

  static #validationScheme = Joi.object({
    userId: Joi.any(),
    userFirstName: Joi.string().required().min(2),
    userLastName: Joi.string().required().min(2),
    chosenUserName: Joi.string().required().min(4),
    password: Joi.string().required().min(4),
  });

  validate() {
    const result = userModel.#validationScheme.validate(this, {
      abortEarly: false,
    });
    const errObj = {};
    if (result.error) {
      result.error.details.map((err) => {
        errObj[err.path[0]] = err.message;
      });
      console.log(errObj);
      return errObj;
    }
    return this.null;
  }
}

module.exports = userModel;
