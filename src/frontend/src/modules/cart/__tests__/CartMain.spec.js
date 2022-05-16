import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import VueRouter from "vue-router";
import modules from "@/store/modules";
import CartMain from "@/modules/cart/CartMain";
import { prepareIngredients } from "@/common/helpers";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

const ingredients = [
  { id: 5, name: "Ананас", image: "/public/img/filling/ananas.svg", price: 25 },
  { id: 6, name: "Бекон", image: "/public/img/filling/bacon.svg", price: 42 },
  { id: 7, name: "Лук", image: "/public/img/filling/onion.svg", price: 21 },
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

const pizzaInfo = {
  id: 1,
  doughId: 1,
  pizzaName: "my pizza",
  pizzaSizeId: 2,
  quantity: 1,
  sauceId: 1,
  sum: 926,
  selectedIngredients: [
    { ingredientId: 5, quantity: 1 },
    { ingredientId: 6, quantity: 1 },
    { ingredientId: 7, quantity: 1 },
  ],
};

describe("CartMain", () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = new Vuex.Store({
      modules,
    });
  });

  const createComponent = (options) => {
    wrapper = mount(CartMain, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("is render", () => {
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("if pizzas length equal 0 then should be div with class 'cart__empty'", () => {
    createComponent({ localVue, store });
    const div = wrapper.find(".cart__empty");
    const cartEmptyText = div.find("p");
    expect(div.attributes("class")).toContain("cart__empty");
    expect(cartEmptyText.text()).toBe("В корзине нет ни одного товара");
  });

  it("if pizza length more 0 then should not be div with class 'cart__empty'", () => {
    store.state["Cart"].pizzas = [pizzaInfo];
    store.state["Builder"].ingredients = prepareIngredients(ingredients);
    store.state["Builder"].doughs = dough;
    store.state["Builder"].pizzaSizes = sizes;
    store.state["Builder"].sauces = sauces;
    createComponent({ localVue, store });
    const div = wrapper.find(".cart__empty");
    expect(div.exists()).toBeFalsy();
  });
});
