import {
  prepareIngredients,
  prepareSauces,
  prepareDough,
  prepareSizes,
  prepareSizeForView,
  calcSumPizza,
} from "@/common/helpers";
import pizza from "@/static/pizza.json";

describe("test helpers function", () => {
  it("test prepareIngredients", () => {
    const data = [
      {
        id: 1,
        name: "Грибы",
        image: "/public/img/filling/mushrooms.svg",
        price: 33,
      },
      {
        id: 2,
        name: "Чеддер",
        image: "/public/img/filling/cheddar.svg",
        price: 42,
      },
    ];
    const expected = [
      {
        id: 1,
        name: "mushrooms",
        rusName: "Грибы",
        image: "/public/img/filling/mushrooms.svg",
        price: 33,
      },
      {
        id: 2,
        name: "cheddar",
        rusName: "Чеддер",
        image: "/public/img/filling/cheddar.svg",
        price: 42,
      },
    ];
    expect(prepareIngredients(data)).toEqual(expected);
  });

  it("test prepareSauces", () => {
    const data = [
      {
        id: 1,
        name: "Томатный",
        price: 50,
      },
    ];
    const expected = [
      {
        id: 1,
        name: "Томатный",
        price: 50,
        slug: "tomato",
      },
    ];
    expect(prepareSauces(data)).toEqual(expected);
  });

  it("test prepareDough", () => {
    const data = [
      {
        id: 1,
        name: "Тонкое",
        image: "/public/img/dough-light.svg",
        description: "Из твердых сортов пшеницы",
        price: 300,
      },
    ];
    const expected = [
      {
        id: 1,
        name: "Тонкое",
        image: "/public/img/dough-light.svg",
        description: "Из твердых сортов пшеницы",
        price: 300,
        slug: "light",
      },
    ];
    expect(prepareDough(data)).toEqual(expected);
  });

  it("test prepareSizes", () => {
    const data = [
      {
        id: 1,
        name: "23 см",
        image: "/public/img/diameter.svg",
        multiplier: 1,
      },
    ];
    const expected = [
      {
        id: 1,
        name: "23 см",
        image: "/public/img/diameter.svg",
        multiplier: 1,
        slug: "small",
      },
    ];
    expect(prepareSizes(data)).toEqual(expected);
  });

  it("test prepareSizeForView", () => {
    const pizzaSizeId = pizza.sizes[1].id;
    const pizzaNameForView = pizza.sizes[1].name;
    expect(prepareSizeForView(pizza.sizes, pizzaSizeId)).toBe(pizzaNameForView);
  });

  it("test calcSumPizza", () => {
    const pizzaInfo = {
      doughId: 1,
      sauceId: 1,
      sizeId: 1,
      ingredients: [
        {
          ingredientId: 2,
          quantity: 2,
        },
        {
          ingredientId: 4,
          quantity: 3,
        },
        {
          ingredientId: 8,
          quantity: 1,
        },
      ],
    };
    const totalSumSmallSize = 581;
    expect(
      calcSumPizza(
        pizzaInfo,
        pizza.ingredients,
        pizza.sizes,
        pizza.dough,
        pizza.sauces
      )
    ).toBe(totalSumSmallSize);
    pizzaInfo.sizeId = 2;
    const totalSumNormalSize = 1162;
    expect(
      calcSumPizza(
        pizzaInfo,
        pizza.ingredients,
        pizza.sizes,
        pizza.dough,
        pizza.sauces
      )
    ).toBe(totalSumNormalSize);
    pizzaInfo.sizeId = 3;
    const totalSumBigSize = 1743;
    expect(
      calcSumPizza(
        pizzaInfo,
        pizza.ingredients,
        pizza.sizes,
        pizza.dough,
        pizza.sauces
      )
    ).toBe(totalSumBigSize);
  });
});
