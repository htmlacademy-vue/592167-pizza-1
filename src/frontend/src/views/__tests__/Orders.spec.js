import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import VuexPlugins from "@/plugins/vuexPlugins";
import VueRouter from "vue-router";
import modules from "@/store/modules";
import Orders from "@/views/Orders";
import pizza from "@/static/pizza.json";
import { prepareIngredients } from "@/common/helpers";
import misc from "@/static/misc.json";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

const order = {
  id: 1,
  phone: "999999999",
  userId: "abce1edc-6c38-41f7-b928-a4f5c04b6e56",
  addressId: 1,
  orderPizzas: [
    {
      id: 1,
      name: "awesome pizza",
      quantity: 2,
      sauceId: 2,
      doughId: 2,
      sizeId: 2,
      orderId: 1,
      ingredients: [
        {
          id: 1,
          quantity: 1,
          pizzaId: 1,
          ingredientId: 4,
        },
        {
          id: 2,
          quantity: 1,
          pizzaId: 1,
          ingredientId: 3,
        },
        {
          id: 3,
          quantity: 1,
          pizzaId: 1,
          ingredientId: 7,
        },
      ],
      sizeView: "32 см",
      doughView: "толстом",
      sauceView: "сливочный",
      ingredientsForView: "томаты, лосось, блю чиз",
      sum: 970,
    },
  ],
  orderMisc: [
    {
      id: 1,
      quantity: 1,
      orderId: 1,
      miscId: 2,
      name: "Острый соус",
      sum: 10,
      img: "/public/img/sauce.svg",
    },
  ],
  orderAddress: {
    id: 1,
    name: "Домашний",
    street: "Филатова",
    building: "8",
    flat: "38",
    comment: "Наберите за 20 мин до приезда",
    userId: "abce1edc-6c38-41f7-b928-a4f5c04b6e56",
  },
  totalPrice: 1950,
};

describe("Orders", () => {
  let store;
  let wrapper;
  let router;

  beforeEach(() => {
    store = new Vuex.Store({
      modules,
      plugins: [VuexPlugins],
    });
    router = new VueRouter();
  });

  const createComponent = (options) => {
    wrapper = mount(Orders, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("is render", () => {
    createComponent({ localVue, store, router });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("if orders history is empty then should be div with class 'cart__empty'", () => {
    createComponent({ localVue, store, router });
    const cartEmpty = wrapper.find(".cart__empty > p");
    expect(cartEmpty.element.textContent).toBe("История пока пуста");
  });

  it("if orders history is not empty should be sections with class 'sheet order'", () => {
    store.state["Builder"].sauces = pizza.sauces;
    store.state["Builder"].doughs = pizza.dough;
    store.state["Builder"].ingredients = prepareIngredients(pizza.ingredients);
    store.state["Builder"].pizzaSizes = pizza.sizes;
    store.state["Cart"].additional = misc;
    store.state["Orders"].orders = [order];
    createComponent({ localVue, store, router });
    const sheetOrder = wrapper.find(".sheet.order");
    expect(sheetOrder.exists()).toBeTruthy();
  });

  it("method deleteOrder should be called when on click delete button", async () => {
    store.state["Builder"].doughs = pizza.dough;
    store.state["Builder"].sauces = pizza.sauces;
    store.state["Builder"].pizzaSizes = pizza.sizes;
    store.state["Builder"].ingredients = prepareIngredients(pizza.ingredients);
    store.state["Cart"].additional = misc;
    store.state["Orders"].orders = [order];
    createComponent({ localVue, store, router });
    const mockMethodDelete = jest.spyOn(wrapper.vm, "deleteOrder");
    const deleteButton = wrapper.find(".button--border");
    await deleteButton.trigger("click");
    expect(mockMethodDelete).toHaveBeenCalled();
  });

  it("method onRepeatOrderClick should be called when on click repeat button", async () => {
    store.state["Builder"].doughs = pizza.dough;
    store.state["Builder"].sauces = pizza.sauces;
    store.state["Builder"].ingredients = prepareIngredients(pizza.ingredients);
    store.state["Cart"].additional = misc;
    store.state["Orders"].orders = [order];
    store.state["Builder"].pizzaSizes = pizza.sizes;
    createComponent({ localVue, store, router });
    const mockMethodRepeat = jest.spyOn(wrapper.vm, "onRepeatOrderClick");
    const repeatButton = wrapper.find("[data-test='repeat-button']");
    await repeatButton.trigger("click");
    expect(mockMethodRepeat).toHaveBeenCalled();
    expect(wrapper.vm.$route.path).toBe("/cart");
  });
});
