import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import modules from "@/store/modules";
import CartList from "@/modules/cart/components/CartList";
import { prepareIngredients } from "@/common/helpers";

const localVue = createLocalVue();
localVue.use(Vuex);

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
    { ingredientId: 1, quantity: 1 },
    { ingredientId: 2, quantity: 1 },
    { ingredientId: 3, quantity: 1 },
  ],
};

describe("CartList", () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = new Vuex.Store({
      modules,
    });
    store.state["Cart"].pizzas = [pizzaInfo];
    store.state["Builder"].ingredients = prepareIngredients(ingredients);
    store.state["Builder"].doughs = dough;
    store.state["Builder"].sauces = sauces;
    store.state["Builder"].pizzaSizes = sizes;
  });

  const createComponent = (options) => {
    wrapper = mount(CartList, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("cart list should be empty when Cart/pizzas is empty", () => {
    store.state["Cart"].pizzas = [];
    createComponent({ localVue, store });
    expect(Array.from(wrapper.element.children)).toEqual([]);
  });

  it("is render", () => {
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("cart list should contain element with class 'cart-list__item'", () => {
    createComponent({ localVue, store });
    const cartListItem = wrapper.find(".cart-list__item");
    expect(cartListItem.attributes("class")).toContain("cart-list__item");
  });

  it("if click button plus then first pizza quantity should be equal 2", () => {
    createComponent({ localVue, store });
    const cartListItem = wrapper.find(".cart-list__item");
    const buttonPlus = cartListItem.find("button[data-test='button-plus']");
    buttonPlus.trigger("click");
    expect(store.state["Cart"].pizzas[0].quantity).toBe(2);
  });
});
