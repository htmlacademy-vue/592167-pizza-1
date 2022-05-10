import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import modules from "@/store/modules";
import CartList from "@/modules/cart/components/CartList";
import pizza from "@/static/pizza.json";
import { prepareIngredients } from "@/common/helpers";

const localVue = createLocalVue();
localVue.use(Vuex);

const pizzaInfo = {
  id: 1,
  doughId: 1,
  pizzaName: "my pizza",
  pizzaSizeId: 2,
  quantity: 1,
  sauceId: 1,
  sum: 926,
  selectedIngredients: [
    { ingredientId: 4, quantity: 1 },
    { ingredientId: 8, quantity: 1 },
    { ingredientId: 12, quantity: 1 },
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
    store.state["Builder"].ingredients = prepareIngredients(pizza.ingredients);
    store.state["Builder"].doughs = pizza.dough;
    store.state["Builder"].sauces = pizza.sauces;
    store.state["Builder"].pizzaSizes = pizza.sizes;
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
