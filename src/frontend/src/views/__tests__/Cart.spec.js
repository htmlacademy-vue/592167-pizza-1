import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import VueRouter from "vue-router";
import modules from "@/store/modules";
import validator from "@/common/mixins/validator";
import Cart from "@/views/Cart";
import { prepareIngredients } from "@/common/helpers";
import pizza from "@/static/pizza.json";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);
localVue.mixin(validator);

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

describe("Cart", () => {
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
    wrapper = mount(Cart, options);
  };

  afterEach(() => {
    wrapper.destroy();
    store.state["Cart"].phone = "";
  });

  it("is render", () => {
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should be show popup when click submit button", async () => {
    store.state["Builder"].ingredients = prepareIngredients(pizza.ingredients);
    store.state["Builder"].sauces = pizza.sauces;
    store.state["Builder"].doughs = pizza.dough;
    store.state["Builder"].pizzaSizes = pizza.sizes;
    store.state["Cart"].pizzas = [pizzaInfo];
    createComponent({ localVue, store, router });
    const tel = wrapper.find("input[type='tel']");
    tel.element.value = "4802384";
    tel.trigger("input");
    const submit = wrapper.find("button[type='submit']");
    await submit.trigger("click");
    const popup = wrapper.find(".popup");
    expect(popup.exists()).toBeTruthy();
  });

  it("should be error message when required field is empty", async () => {
    store.state["Builder"].sauces = pizza.sauces;
    store.state["Builder"].ingredients = prepareIngredients(pizza.ingredients);
    store.state["Builder"].doughs = pizza.dough;
    store.state["Builder"].pizzaSizes = pizza.sizes;
    store.state["Cart"].pizzas = [pizzaInfo];
    createComponent({ localVue, store, router });
    const submit = wrapper.find("button[type='submit']");
    await submit.trigger("click");
    const errorMessage = wrapper.find("input[type='tel'] + span");
    expect(errorMessage.element.textContent).toBe(
      "Поле обязательно для заполнения"
    );
  });
});
