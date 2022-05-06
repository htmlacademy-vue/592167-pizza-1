import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import modules from "@/store/modules";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import pizza from "@/static/pizza.json";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("BuilderPizzaView", () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = new Vuex.Store({
      modules,
    });
    store.state["Builder"].ingredients = pizza.ingredients;
    store.state["Builder"].sauces = pizza.sauces;
  });

  const createComponent = (options) => {
    wrapper = mount(BuilderPizzaView, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("is render", () => {
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("element should 'div' with class 'pizza__filling--mushrooms pizza__filling--second' if selectedIngredients equal {ingredientId: 1, quantity: 2}", () => {
    store.state["Builder"].selectedIngredients.push({
      ingredientId: 1,
      quantity: 2,
    });
    createComponent({ localVue, store });
    const div = wrapper.find(".pizza__filling--mushrooms");
    expect(div.attributes("class")).toContain("pizza__filling--second");
  });

  it("div with class='pizza' should contain 'pizza--foundation--big-creamy' when doughId=2 and sauceId=2", () => {
    store.state["Builder"].doughId = 2;
    store.state["Builder"].sauceId = 2;
    createComponent({ localVue, store });
    const div = wrapper.find(".pizza");
    expect(div.attributes("class")).toContain("pizza--foundation--big-creamy");
  });
});
