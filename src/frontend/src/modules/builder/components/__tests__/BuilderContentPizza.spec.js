import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import modules from "@/store/modules";
import BuilderContentPizza from "@/modules/builder/components/BuilderContentPizza";
import pizza from "@/static/pizza.json";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("BuilderContentPizza", () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = new Vuex.Store({
      modules,
    });

    store.state["Builder"].ingredients = pizza.ingredients;
    store.state["Builder"].doughs = pizza.dough;
    store.state["Builder"].sauces = pizza.sauces;
    store.state["Builder"].pizzaSizes = pizza.sizes;
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
