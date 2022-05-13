import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import modules from "@/store/modules";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";

const localVue = createLocalVue();
localVue.use(Vuex);

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

describe("BuilderSizeSelector", () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = new Vuex.Store({
      modules,
    });
    store.state["Builder"].pizzaSizes = sizes;
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
