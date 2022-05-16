import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import modules from "@/store/modules";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";

const localVue = createLocalVue();
localVue.use(Vuex);

const ingredients = [
  {
    id: 1,
    name: "Грибы",
    image: "/public/img/filling/mushrooms.svg",
    price: 33,
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

describe("BuilderPriceCounter", () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = new Vuex.Store({
      modules,
    });
    store.state["Builder"].ingredients = ingredients;
    store.state["Builder"].sauces = sauces;
    store.state["Builder"].doughs = dough;
    store.state["Builder"].pizzaSizes = sizes;
  });

  const createComponent = (options) => {
    wrapper = mount(BuilderPriceCounter, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("is render", () => {
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("button should be disabled when selectedIngredients is empty or pizzaName is empty", () => {
    createComponent({ localVue, store });
    const button = wrapper.find("button");
    expect(button.attributes("disabled")).toBeTruthy();
  });

  it("button should be enabled when selectedIngredients is not empty and pizzaName is not empty", () => {
    store.state["Builder"].selectedIngredients.push({
      ingredientId: 1,
      quantity: 2,
    });
    store.state["Builder"].pizzaName = "my name";
    createComponent({ localVue, store });
    const button = wrapper.find("button");
    expect(button.attributes("disabled")).toBeFalsy();
  });
});
