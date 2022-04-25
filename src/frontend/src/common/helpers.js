import { AuthApiService, CrudApiService } from "@/services/api.service";
import resources from "@/common/enums/resources";
import { NEW_ADDRESS } from "@/constants";
import { uniqueId } from "lodash";

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

const prepareSizeForView = (pizzaSizes, sizeId) => {
  return pizzaSizes.find((it) => it.id === sizeId).name;
};

const changeEndOfWord = (word) => {
  return word.replace("ое", "ом");
};

const prepareDoughForView = (doughs, doughId) => {
  return changeEndOfWord(
    doughs.find((it) => it.id === doughId).name.toLowerCase()
  );
};

const prepareSauceForView = (sauces, sauceId) => {
  return sauces.find((it) => it.id === sauceId).name.toLowerCase();
};

const prepareIngredientsForView = (data, ingredients) => {
  const ingredientsId = data.map((it) => it.ingredientId);
  return ingredients
    .filter((it) => ingredientsId.includes(it.id))
    .map((it) => it.rusName.toLowerCase())
    .join(", ");
};

const preparePizzaInfo = (pizzas, ingredients, pizzaSizes, doughs, sauces) => {
  return pizzas.map((it) => {
    it.sizeView = prepareSizeForView(pizzaSizes, it.pizzaSizeId);
    it.doughView = prepareDoughForView(doughs, it.doughId);
    it.sauceView = prepareSauceForView(sauces, it.sauceId);
    it.selectedView = prepareIngredientsForView(
      it.selectedIngredients,
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
    [resources.ORDERS]: new CrudApiService(resources.ORDERS, notifier),
  };
};

const setAuth = (store) => {
  store.$api.auth.setAuthHeader();
  store.dispatch("Auth/getMe");
};

const prepareAddressForOrder = (orderAddress, receivingOrder) => {
  let address = null;
  if (+receivingOrder === NEW_ADDRESS) {
    address = {
      street: orderAddress.street,
      building: orderAddress.building,
      flat: orderAddress.flat,
      comment: orderAddress.comment,
    };
  } else if (+receivingOrder > NEW_ADDRESS) {
    address = {
      id: +receivingOrder - NEW_ADDRESS,
    };
  }
  return address;
};

const preparePizzaForOrder = (pizzas) => {
  return pizzas.map((item) => ({
    name: item.pizzaName,
    sauceId: item.sauceId,
    doughId: item.doughId,
    sizeId: item.pizzaSizeId,
    quantity: item.quantity,
    ingredients: item.selectedIngredients,
  }));
};

const calcSumPizza = (pizza, ingredients, pizzaSizes, doughs, sauces) => {
  // мультипликатор размера х (стоимость теста + соус + ингредиенты)
  let ingredientsPrice = 0;
  pizza.ingredients.map((it) => {
    const ingredient = ingredients.find((el) => el.id === it.ingredientId);
    ingredientsPrice += ingredient.price * it.quantity;
  });
  const multiplier = pizzaSizes.find((it) => it.id === pizza.sizeId).multiplier;
  const doughPrice = doughs.find((it) => it.id === pizza.doughId).price;
  const saucePrice = sauces.find((it) => it.id === pizza.sauceId).price;

  return multiplier * (doughPrice + saucePrice + ingredientsPrice);
};

const getMiscInfo = (misc, additional) => {
  return additional.find((it) => it.id === misc.miscId);
};

const calcTotalPrice = (order) => {
  let totalPrice = 0;
  order.orderPizzas.map((pizza) => {
    totalPrice += pizza.sum * pizza.quantity;
  });
  order.orderMisc?.map((misc) => {
    totalPrice += misc.sum * misc.quantity;
  });
  return totalPrice;
};

const prepareOrdersForView = (
  orders,
  pizzaSizes,
  doughs,
  sauces,
  ingredients,
  additional
) => {
  orders.map((order) => {
    order.orderPizzas.map((pizza) => {
      pizza.sizeView = prepareSizeForView(pizzaSizes, pizza.sizeId);
      pizza.doughView = prepareDoughForView(doughs, pizza.doughId);
      pizza.sauceView = prepareSauceForView(sauces, pizza.sauceId);
      pizza.ingredientsForView = prepareIngredientsForView(
        pizza.ingredients,
        ingredients
      );
      pizza.sum = calcSumPizza(pizza, ingredients, pizzaSizes, doughs, sauces);
      return pizza;
    });
    order.orderMisc?.map((misc) => {
      const miscInfo = getMiscInfo(misc, additional);
      misc.name = miscInfo.name;
      misc.sum = miscInfo.price;
      misc.img = miscInfo.image;
      return misc;
    });
    order.totalPrice = calcTotalPrice(order);
  });
  return orders;
};

const prepareAddressFromOrderToCart = (data) => {
  const address = {
    street: "",
    building: "",
    flat: "",
    comment: "",
  };
  let receivingOrder = 1;

  if (data) {
    address.street = data.street;
    address.building = data.building;
    address.flat = data.flat;
    address.comment = data.comment;
    receivingOrder = data.id + NEW_ADDRESS;
  }

  return {
    receivingOrder,
    address,
  };
};

const prepareOrderForCart = (order) => {
  const prepareAddress = prepareAddressFromOrderToCart(order.orderAddress);
  const pizzas = order.orderPizzas.map((_, idx) => {
    const item = order.orderPizzas[idx];
    const selectedIngredients = item.ingredients.map((_, ingredientIdx) => ({
      ingredientId: item.ingredients[ingredientIdx].ingredientId,
      quantity: item.ingredients[ingredientIdx].quantity,
    }));

    return {
      id: uniqueId(),
      doughId: item.doughId,
      pizzaName: item.name,
      pizzaSizeId: item.sizeId,
      quantity: item.quantity,
      sauceId: item.sauceId,
      sum: item.sum,
      selectedIngredients,
    };
  });

  let selectedAdditional = [];
  if (order.orderMisc) {
    selectedAdditional = order.orderMisc.map((_, idx) => ({
      miscId: order.orderMisc[idx].miscId,
      quantity: order.orderMisc[idx].quantity,
    }));
  }

  return {
    pizzas,
    selectedAdditional,
    receivingOrder: prepareAddress.receivingOrder,
    phone: order.phone,
    address: prepareAddress.address,
    totalPrice: order.totalPrice,
  };
};

export {
  prepareIngredients,
  prepareSauces,
  prepareDough,
  prepareSizes,
  prepareSizeForView,
  preparePizzaInfo,
  createResources,
  setAuth,
  preparePizzaForOrder,
  prepareOrdersForView,
  prepareAddressForOrder,
  calcSumPizza,
  prepareOrderForCart,
};
