import {
  prepareIngredients,
  prepareSauces,
  prepareDough,
  prepareSizes,
  prepareSizeForView,
  calcSumPizza,
} from "@/common/helpers";

const ingredients = [
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
  { id: 3, name: "Салями", image: "/public/img/filling/salami.svg", price: 42 },
  { id: 4, name: "Ветчина", image: "/public/img/filling/ham.svg", price: 42 },
  { id: 5, name: "Ананас", image: "/public/img/filling/ananas.svg", price: 25 },
  { id: 6, name: "Бекон", image: "/public/img/filling/bacon.svg", price: 42 },
  { id: 7, name: "Лук", image: "/public/img/filling/onion.svg", price: 21 },
  { id: 8, name: "Чили", image: "/public/img/filling/chile.svg", price: 21 },
  {
    id: 9,
    name: "Халапеньо",
    image: "/public/img/filling/jalapeno.svg",
    price: 25,
  },
  {
    id: 10,
    name: "Маслины",
    image: "/public/img/filling/olives.svg",
    price: 25,
  },
  {
    id: 11,
    name: "Томаты",
    image: "/public/img/filling/tomatoes.svg",
    price: 35,
  },
  {
    id: 12,
    name: "Лосось",
    image: "/public/img/filling/salmon.svg",
    price: 50,
  },
  {
    id: 13,
    name: "Моцарелла",
    image: "/public/img/filling/mozzarella.svg",
    price: 35,
  },
  {
    id: 14,
    name: "Пармезан",
    image: "/public/img/filling/parmesan.svg",
    price: 35,
  },
  {
    id: 15,
    name: "Блю чиз",
    image: "/public/img/filling/blue_cheese.svg",
    price: 50,
  },
];
const sizes = [
  {
    id: 1,
    name: "23 см",
    image: "/public/img/diameter.svg",
    multiplier: 1,
  },
  {
    id: 2,
    name: "32 см",
    image: "/public/img/diameter.svg",
    multiplier: 2,
  },
  {
    id: 3,
    name: "45 см",
    image: "/public/img/diameter.svg",
    multiplier: 3,
  },
];
const dough = [
  {
    id: 1,
    name: "Тонкое",
    image: "/public/img/dough-light.svg",
    description: "Из твердых сортов пшеницы",
    price: 300,
  },
  {
    id: 2,
    name: "Толстое",
    image: "/public/img/dough-large.svg",
    description: "Из твердых сортов пшеницы",
    price: 300,
  },
];
const sauces = [
  {
    id: 1,
    name: "Томатный",
    price: 50,
  },
  {
    id: 2,
    name: "Сливочный",
    price: 50,
  },
];

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
    const pizzaSizeId = sizes[1].id;
    const pizzaNameForView = sizes[1].name;
    expect(prepareSizeForView(sizes, pizzaSizeId)).toBe(pizzaNameForView);
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
    expect(calcSumPizza(pizzaInfo, ingredients, sizes, dough, sauces)).toBe(
      totalSumSmallSize
    );
    pizzaInfo.sizeId = 2;
    const totalSumNormalSize = 1162;
    expect(calcSumPizza(pizzaInfo, ingredients, sizes, dough, sauces)).toBe(
      totalSumNormalSize
    );
    pizzaInfo.sizeId = 3;
    const totalSumBigSize = 1743;
    expect(calcSumPizza(pizzaInfo, ingredients, sizes, dough, sauces)).toBe(
      totalSumBigSize
    );
  });
});
