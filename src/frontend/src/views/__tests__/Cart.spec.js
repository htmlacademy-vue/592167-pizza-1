import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import VueRouter from "vue-router";
import modules from "@/store/modules";
import validator from "@/common/mixins/validator";
import Cart from "@/views/Cart";
import { prepareIngredients } from "@/common/helpers";

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
const ingredients = [
  { id: 4, name: "Ветчина", image: "/public/img/filling/ham.svg", price: 42 },
  { id: 8, name: "Чили", image: "/public/img/filling/chile.svg", price: 21 },
  {
    id: 12,
    name: "Лосось",
    image: "/public/img/filling/salmon.svg",
    price: 50,
  },
];
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
const dough = [
  {
    id: 1,
    name: "Тонкое",
    image: "/public/img/dough-light.svg",
    description: "Из твердых сортов пшеницы",
    price: 300,
  },
  {
    id: 2,
    name: "Толстое",
    image: "/public/img/dough-large.svg",
    description: "Из твердых сортов пшеницы",
    price: 300,
  },
];
const sauces = [
  {
    id: 1,
    name: "Томатный",
    price: 50,
  },
  {
    id: 2,
    name: "Сливочный",
    price: 50,
  },
];

describe("Cart", () => {
  let store;
  let wrapper;
  let router;

  beforeEach(() => {
    store = new Vuex.Store({
      modules,
    });
    store.state["Builder"].ingredients = prepareIngredients(ingredients);
    store.state["Builder"].sauces = sauces;
    store.state["Builder"].doughs = dough;
    store.state["Builder"].pizzaSizes = sizes;
    store.state["Cart"].pizzas = [pizzaInfo];
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
    createComponent({ localVue, store, router });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should be show popup when click submit button", async () => {
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
    createComponent({ localVue, store, router });
    const submit = wrapper.find("button[type='submit']");
    await submit.trigger("click");
    const errorMessage = wrapper.find("input[type='tel'] + span");
    expect(errorMessage.text()).toBe("Поле обязательно для заполнения");
  });
});
