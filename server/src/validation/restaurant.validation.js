import Joi from "joi";

export const validateRestaurantCity = (restaurantObject) => {
  const Schema = Joi.object({
    city: Joi.string().required(),
  });

  return Schema.validateAsync(restaurantObject);
};

export const validateSearchString = (restaurantObject) => {
  const Schema = Joi.object({
    validateSearchString: Joi.string().required(),
  });

  return Schema.validateAsync(restaurantObject);
};
