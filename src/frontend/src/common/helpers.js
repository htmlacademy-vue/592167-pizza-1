import { AuthApiService, CrudApiService } from "@/services/api.service";
import resources from "@/common/enums/resources";

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

const prepareIngredients = (ingredients) => {
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
  sizes.sort((a, b) => (a.multiplier > b.multiplier ? 1 : -1));
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

const getSelectedIngredientsForView = (data, ingredients) => {
  return ingredients
    .filter((it) => data.includes(it.name))
    .map((it) => it.rusName.toLowerCase())
    .join(", ");
};

const preparePizzaInfo = (pizzas, ingredients) => {
  return pizzas.map((it) => {
    it.sizeView = getPizzaSizeFromValue(it.pizzaSize);
    it.sauceView = getSauceForView(it.sauce);
    it.selectedView = getSelectedIngredientsForView(
      Object.keys(it.selectedIngredients),
      ingredients
    );
    return it;
  });
};

const createResources = (notifier) => {
  return {
    [resources.AUTH]: new AuthApiService(notifier),
    [resources.ADDRESSES]: new CrudApiService(resources.ADDRESSES, notifier),
    [resources.DOUGH]: new CrudApiService(resources.DOUGH, notifier),
    [resources.INGREDIENTS]: new CrudApiService(
      resources.INGREDIENTS,
      notifier
    ),
    [resources.SAUCES]: new CrudApiService(resources.SAUCES, notifier),
    [resources.SIZES]: new CrudApiService(resources.SIZES, notifier),
    [resources.MISC]: new CrudApiService(resources.MISC, notifier),
  };
};

const setAuth = (store) => {
  store.$api.auth.setAuthHeader();
  store.dispatch("Auth/getMe");
};

const prepareAddresses = (addresses) => {
  if (addresses.length > 0) {
    const addressArray = [];
    for (const it of addresses) {
      const address = {
        name: it.name,
        fullAddress: `${it.street}, д.${it.building}`,
        comment: it.comment,
      };
      address.fullAddress += it.flat ? `, ${it.flat}` : ``;
      addressArray.push(address);
    }
    return addressArray;
  } else {
    return [];
  }
};

export {
  prepareIngredients,
  prepareSauces,
  prepareDough,
  prepareSizes,
  preparePizzaInfo,
  createResources,
  setAuth,
  prepareAddresses,
};
