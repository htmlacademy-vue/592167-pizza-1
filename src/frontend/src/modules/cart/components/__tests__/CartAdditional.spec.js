import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import modules from "@/store/modules";
import CartAdditional from "@/modules/cart/components/CartAdditional";
import misc from "@/static/misc.json";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("CartAdditional", () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = new Vuex.Store({
      modules,
    });
    store.state["Cart"].additional = misc;
  });

  const createComponent = (options) => {
    wrapper = mount(CartAdditional, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("is render", () => {
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("additional list should be empty when Cart/additional is empty", () => {
    store.state["Cart"].additional = [];
    createComponent({ localVue, store });
    const additionalList = wrapper.find(".additional-list");
    expect(Array.from(additionalList.element.children)).toEqual([]);
  });

  it("selectedAdditional should be equal [{miscId: 1, quantity: 1}]", () => {
    createComponent({ localVue, store });
    const additionalList = wrapper.find(".additional-list__item");
    const buttonPlus = additionalList.find("button[data-test='button-plus']");
    buttonPlus.trigger("click");
    expect(store.state["Cart"].selectedAdditional).toEqual([
      { miscId: 1, quantity: 1 },
    ]);
  });
});
