const joi = require("joi");
class DiamondModel {
  constructor(carat, weight, cut, clarity, color) {
    if (arguments.length === 5) {
      this.carat = carat;
      this.weight = weight || 0;
      this.cut = cut;
      this.clarity = clarity;
      this.color = color;
    } else if (arguments.length === 1) {
      const diamond = arguments[0];
      this.carat = diamond.carat;
      this.weight = diamond.weight;
      this.cut = diamond.cut;
      this.clarity = diamond.clarity;
      this.color = diamond.color;
    } else throw "DiamondModel structure error";
  }

  static #validationScheme = joi.object({
    carat: joi.number().required(),
    weight: joi.number().required(),
    cut: joi.number().required(),
    clarity: joi.number().required(),
    color: joi.number().required(),
  });

  validate() {
    const result = DiamondModel.#validationScheme.validate(this, {
      abortEarly: false,
    });
    return result.error ? result.error.details : {};
  }
}

module.exports = DiamondModel;
