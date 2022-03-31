import pizza from "@/static/pizza.json";
import { AuthApiService } from "@/services/api.service";

const cutString = (data, start, end) => {
  return data.slice(start, end);
};

const getSauceValue = (name) => {
  switch (name) {
    case "Томатный":
      return "tomato";
    default:
      return "creamy";
  }
};

const getPizzaSizeValue = (size) => {
  switch (size) {
    case "23 см":
      return "small";
    case "32 см":
      return "normal";
    case "45 см":
      return "big";
    default:
      return "";
  }
};

const prepareIngrediensts = (ingredients) => {
  return ingredients.map((it) => {
    it.rusName = it.name;
    it.name = cutString(it.image, 20, -4);
    return it;
  });
};

const prepareSauces = (sauces) => {
  return sauces.map((it) => {
    it.slug = getSauceValue(it.name);
    return it;
  });
};

const prepareDough = (doughs) => {
  return doughs.map((it) => {
    it.slug = cutString(it.image, 18, -4);
    return it;
  });
};

const prepareSizes = (sizes) => {
  return sizes.map((it) => {
    it.slug = getPizzaSizeValue(it.name);
    return it;
  });
};

const getPizzaSizeFromValue = (size) => {
  switch (size) {
    case "small":
      return "23 см";
    case "normal":
      return "32 см";
    case "big":
      return "45 см";
    default:
      return "";
  }
};

const getSauceForView = (name) => {
  switch (name) {
    case "tomato":
      return "томатный";
    case "creamy":
      return "сливочный";
    default:
      return "";
  }
};

const getSelectedIngredientsForView = (data) => {
  return pizza.ingredients
    .filter((it) => data.includes(it.name))
    .map((it) => it.rusName.toLowerCase())
    .join(", ");
};

const preparePizzaInfo = (pizzas) => {
  return pizzas.map((it) => {
    it.sizeView = getPizzaSizeFromValue(it.pizzaSize);
    it.sauceView = getSauceForView(it.sauce);
    it.selectedView = getSelectedIngredientsForView(
      Object.keys(it.selectedIngredients)
    );
    return it;
  });
};

const prepareAdditionals = (data) => {
  return data.map((it) => {
    const imageName = cutString(it.image, 12, -4);
    it.imageSrc = `@/assets/img/${imageName}.svg`;
    return it;
  });
};

const createResources = (notifier) => {
  return {
    auth: new AuthApiService(notifier),
  };
};

const setAuth = (store) => {
  store.$api.auth.setAuthHeader();
  store.dispatch("Auth/getMe");
};

export {
  prepareIngrediensts,
  prepareSauces,
  prepareDough,
  prepareSizes,
  preparePizzaInfo,
  prepareAdditionals,
  createResources,
  setAuth,
};
