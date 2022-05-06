import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import modules from "@/store/modules";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import pizza from "@/static/pizza.json";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("BuilderSizeSelector", () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = new Vuex.Store({
      modules,
    });
    store.state["Builder"].pizzaSizes = pizza.sizes;
  });

  const createComponent = (options) => {
    wrapper = mount(BuilderSizeSelector, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("is render", () => {
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("div with class diameter should be empty when Builder/pizzaSizes is empty", () => {
    store.state["Builder"].pizzaSizes = [];
    createComponent({ localVue, store });
    const diameter = wrapper.find(".diameter");
    expect(Array.from(diameter.element.children)).toEqual([]);
  });

  it("pizzaSizeId should be 2 if click input with class='diameter__input--normal'", () => {
    createComponent({ localVue, store });
    const inputNormal = wrapper.find(".diameter__input--normal");
    inputNormal.trigger("click");
    expect(store.state["Builder"].pizzaSizeId).toBe(2);
  });
});
