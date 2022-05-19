import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import VuexPlugins from "@/plugins/vuexPlugins";
import VueRouter from "vue-router";
import modules from "@/store/modules";
import Orders from "@/views/Orders";
import { prepareIngredients } from "@/common/helpers";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

const ingredients = [
  { id: 3, name: "Салями", image: "/public/img/filling/salami.svg", price: 42 },
  { id: 4, name: "Ветчина", image: "/public/img/filling/ham.svg", price: 42 },
  { id: 7, name: "Лук", image: "/public/img/filling/onion.svg", price: 21 },
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
const misc = [
  {
    id: 1,
    name: "Cola-Cola 0,5 литра",
    image: "/public/img/cola.svg",
    price: 56,
  },
  {
    id: 2,
    name: "Острый соус",
    image: "/public/img/sauce.svg",
    price: 10,
  },
  {
    id: 3,
    name: "Картошка из печи",
    image: "/public/img/potato.svg",
    price: 170,
  },
];

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
      sum: 910,
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
    store.state["Builder"].sauces = sauces;
    store.state["Builder"].doughs = dough;
    store.state["Builder"].ingredients = prepareIngredients(ingredients);
    store.state["Builder"].pizzaSizes = sizes;
    store.state["Cart"].additional = misc;
    store.state["Orders"].orders = [order];
    store.state["Orders"].isLoaded = false;
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
    store.state["Orders"].orders = [];
    createComponent({ localVue, store, router });
    const cartEmpty = wrapper.find(".cart__empty > p");
    expect(cartEmpty.text()).toBe("История пока пуста");
  });

  it("if orders history is not empty should be sections with class 'sheet order'", () => {
    createComponent({ localVue, store, router });
    const sheetOrder = wrapper.find(".sheet.order");
    expect(sheetOrder.exists()).toBeTruthy();
  });

  it("method deleteOrder should be called when on click delete button", async () => {
    createComponent({ localVue, store, router });
    const mockMethodDelete = jest.spyOn(wrapper.vm, "deleteOrder");
    const deleteButton = wrapper.find(".button--border");
    await deleteButton.trigger("click");
    expect(mockMethodDelete).toHaveBeenCalled();
  });

  it("method onRepeatOrderClick should be called when on click repeat button", async () => {
    const cartInfo = {
      pizzas: [
        {
          id: "1",
          pizzaName: "awesome pizza",
          quantity: 2,
          sauceId: 2,
          doughId: 2,
          pizzaSizeId: 2,
          selectedIngredients: [
            {
              ingredientId: 4,
              quantity: 1,
            },
            {
              ingredientId: 3,
              quantity: 1,
            },
            {
              ingredientId: 7,
              quantity: 1,
            },
          ],
          sum: 910,
        },
      ],
      selectedAdditional: [
        {
          miscId: 2,
          quantity: 1,
        },
      ],
      receivingOrder: 3,
      phone: order.phone,
      address: {
        street: "Филатова",
        building: "8",
        flat: "38",
        comment: "Наберите за 20 мин до приезда",
      },
      totalPrice: order.totalPrice,
      additional: misc,
    };
    createComponent({ localVue, store, router });
    const mockMethodRepeat = jest.spyOn(wrapper.vm, "onRepeatOrderClick");
    const repeatButton = wrapper.find("[data-test='repeat-button']");
    await repeatButton.trigger("click");
    expect(store.state["Cart"]).toEqual(cartInfo);
    expect(mockMethodRepeat).toHaveBeenCalled();
    expect(wrapper.vm.$route.path).toBe("/cart");
  });
});
