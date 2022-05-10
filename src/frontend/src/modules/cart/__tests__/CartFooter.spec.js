import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import VueRouter from "vue-router";
import modules from "@/store/modules";
import CartFooter from "@/modules/cart/CartFooter";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

describe("CartFooter", () => {
  let store;
  let wrapper;
  let router;

  beforeEach(() => {
    store = new Vuex.Store({
      modules,
    });
    router = new VueRouter();
  });

  const createComponent = (options) => {
    wrapper = mount(CartFooter, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("is render", () => {
    createComponent({ localVue, store, router });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("if click one more button then called method addNewPizza", () => {
    createComponent({ localVue, store, router });
    const mockMethod = jest.spyOn(wrapper.vm, "addNewPizza");
    const button = wrapper.find(".button--arrow");
    button.trigger("click");
    expect(mockMethod).toHaveBeenCalled();
  });

  it("if click one more button then builder store should be reset", () => {
    store.state["Builder"].pizzaName = "some pizza name";
    store.state["Builder"].selectedIngredients = [
      {
        ingredientId: 1,
        quantity: 2,
      },
      {
        ingredientId: 4,
        quantity: 1,
      },
    ];

    createComponent({ localVue, store, router });
    const button = wrapper.find(".button--arrow");
    button.trigger("click");
    expect(store.state["Builder"].pizzaName).toBe("");
    expect(store.state["Builder"].selectedIngredients).toEqual([]);
  });

  it("raises button event", () => {
    createComponent({ localVue, store, router });
    wrapper.vm.$emit("makeOrder");
    expect(wrapper.emitted().makeOrder).toBeTruthy();
  });
});
