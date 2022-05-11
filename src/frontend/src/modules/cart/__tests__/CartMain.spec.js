import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import VueRouter from "vue-router";
import modules from "@/store/modules";
import CartMain from "@/modules/cart/CartMain";
import { prepareIngredients } from "@/common/helpers";
import pizza from "@/static/pizza.json";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

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

describe("CartMain", () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = new Vuex.Store({
      modules,
    });
  });

  const createComponent = (options) => {
    wrapper = mount(CartMain, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("is render", () => {
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("if pizzas length equal 0 then should be div with class 'cart__empty'", () => {
    createComponent({ localVue, store });
    const div = wrapper.find(".cart__empty");
    const cartEmptyText = div.find("p");
    expect(div.attributes("class")).toContain("cart__empty");
    expect(cartEmptyText.element.textContent).toBe(
      "В корзине нет ни одного товара"
    );
  });

  it("if pizza length more 0 then should not be div with class 'cart__empty'", () => {
    store.state["Cart"].pizzas = [pizzaInfo];
    store.state["Builder"].ingredients = prepareIngredients(pizza.ingredients);
    store.state["Builder"].doughs = pizza.dough;
    store.state["Builder"].pizzaSizes = pizza.sizes;
    store.state["Builder"].sauces = pizza.sauces;
    createComponent({ localVue, store });
    const div = wrapper.find(".cart__empty");
    expect(div.exists()).toBeFalsy();
  });
});
