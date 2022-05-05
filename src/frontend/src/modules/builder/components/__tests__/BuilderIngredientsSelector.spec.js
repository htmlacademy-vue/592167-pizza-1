import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import modules from "@/store/modules";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import pizza from "@/static/pizza.json";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("BuilderIngredientsSelector", () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = new Vuex.Store({
      modules,
    });
    store.state["Builder"].ingredients = pizza.ingredients;
    store.state["Builder"].sauces = pizza.sauces;
  });

  const createComponent = (options) => {
    wrapper = mount(BuilderIngredientsSelector, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("is render", () => {
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("sauceId should be equal 2 when radio-button 'creamy' click", () => {
    createComponent({ localVue, store });
    const creamyRadioButton = wrapper.find("input[value='creamy']");
    creamyRadioButton.trigger("click");
    expect(store.state["Builder"].sauceId).toBe(2);
  });

  it("sauceId should be equal 1 when radio-button 'tomato' click", () => {
    createComponent({ localVue, store });
    const tomatoRadioButton = wrapper.find("input[value='tomato']");
    tomatoRadioButton.trigger("click");
    expect(store.state["Builder"].sauceId).toBe(1);
  });

  it("selectedIngredients should be equal {ingredientId: 1, quantity: 2} when double click button--plus", () => {
    const maxCount = 2;
    for (let i = 0; i < maxCount; i++) {
      createComponent({ localVue, store });
      const ingredient = wrapper.find(".ingredients__item");
      const counter = ingredient.find(".counter");
      const buttonPlus = counter.find(".counter__button--plus");
      buttonPlus.trigger("click");
      if (i < maxCount - 1) {
        wrapper.destroy();
      }
    }
    expect(store.state["Builder"].selectedIngredients).toEqual([
      { ingredientId: 1, quantity: 2 },
    ]);
  });
});
