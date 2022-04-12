import { AuthApiService, CrudApiService } from "@/services/api.service";
import resources from "@/common/enums/resources";
import { NEW_ADDRESS } from "@/constants";
// import {DOUGH_PRICE, NEW_ADDRESS, SAUCES_PRICE, SIZE_MULTIPLIER} from "@/constants";

// Удаляет таблицы из базы, чтобы привести ее к начальному состоянию.
// Можно удалять не все, а только словарные значения
// DROP TABLE IF EXISTS address, dough, ingredient, misc, miscorder, "order", pizza, pizzaingredient, sauce, size, "user", usercredentials;

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

const prepareIngredientsForView = (data, ingredients) => {
  const ingredientsId = data.map((it) => it.ingredientId);
  return ingredients
    .filter((it) => ingredientsId.includes(it.id))
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
    [resources.ORDERS]: new CrudApiService(resources.ORDERS, notifier),
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
  console.log(receivingOrder);
  console.log(orderAddress);
  console.log(address);
  return address;
};

const preparePizzaForOrder = (
  pizzas,
  ingredients,
  doughs,
  sauces,
  pizzaSizes
) => {
  return Array(pizzas.length)
    .fill({})
    .map((_, idx) => {
      const selectedIngredients = Object.keys(pizzas[idx].selectedIngredients);
      return {
        name: pizzas[idx].pizzaName,
        sauceId: sauces.find((it) => it.slug === pizzas[idx].sauce).id,
        doughId: doughs.find((it) => it.slug === pizzas[idx].dough).id,
        sizeId: pizzaSizes.find((it) => it.slug === pizzas[idx].pizzaSize).id,
        quantity: pizzas[idx].count,
        ingredients: Array(selectedIngredients.length)
          .fill({})
          .map((_, ingredientIdx) => ({
            ingredientId: ingredients.find(
              (it) => it.name === selectedIngredients[ingredientIdx]
            ).id,
            quantity:
              pizzas[idx].selectedIngredients[
                selectedIngredients[ingredientIdx]
              ],
          })),
      };
    });
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

const prepareMiscForOrder = (additional, selectedAdditional) => {
  let misc = [];
  const selectedMisc = Object.keys(selectedAdditional);
  if (selectedMisc.length > 0) {
    misc = Array(Object.keys(selectedMisc).length)
      .fill({})
      .map((_, idx) => ({
        miscId: additional.find((it) => it.name === selectedMisc[idx]).id,
        quantity: selectedAdditional[selectedMisc[idx]],
      }));
  }
  return misc;
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
  prepareAddresses,
  preparePizzaForOrder,
  prepareMiscForOrder,
  prepareOrdersForView,
  prepareAddressForOrder,
};
