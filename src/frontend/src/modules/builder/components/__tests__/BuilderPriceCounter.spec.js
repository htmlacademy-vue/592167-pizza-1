import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import modules from "@/store/modules";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";
import pizza from "@/static/pizza.json";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("BuilderPriceCounter", () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = new Vuex.Store({
      modules,
    });
    store.state["Builder"].ingredients = pizza.ingredients;
    store.state["Builder"].sauces = pizza.sauces;
    store.state["Builder"].doughs = pizza.dough;
    store.state["Builder"].pizzaSizes = pizza.sizes;
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
