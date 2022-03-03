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

export { prepareIngrediensts, prepareSauces, prepareDough, prepareSizes };
