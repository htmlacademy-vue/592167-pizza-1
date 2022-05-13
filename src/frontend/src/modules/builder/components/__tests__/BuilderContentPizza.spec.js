import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import modules from "@/store/modules";
import BuilderContentPizza from "@/modules/builder/components/BuilderContentPizza";

const localVue = createLocalVue();
localVue.use(Vuex);

const ingredients = [
  {
    id: 2,
    name: "Чеддер",
    image: "/public/img/filling/cheddar.svg",
    price: 42,
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

describe("BuilderContentPizza", () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = new Vuex.Store({
      modules,
    });

    store.state["Builder"].ingredients = ingredients;
    store.state["Builder"].doughs = dough;
    store.state["Builder"].sauces = sauces;
    store.state["Builder"].pizzaSizes = sizes;
  });

  const createComponent = (options) => {
    wrapper = mount(BuilderContentPizza, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("is render", () => {
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("dispatch 'updatePizzaName' when event input value is 'some text'", () => {
    createComponent({ localVue, store });
    const input = wrapper.find("input");
    const someText = "some text";
    input.element.value = someText;
    input.trigger("input");
    expect(store.state["Builder"].pizzaName).toBe(someText);
  });

  it("input value should be equal 'some text' when 'Builder/pizzaName' equal 'some text'", () => {
    const someText = "some text";
    store.state["Builder"].pizzaName = someText;
    createComponent({ localVue, store });
    const input = wrapper.find("input");
    expect(input.element.value).toBe(someText);
  });
});
