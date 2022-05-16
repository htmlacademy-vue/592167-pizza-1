import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import modules from "@/store/modules";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";

const localVue = createLocalVue();
localVue.use(Vuex);

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

describe("BuilderDoughSelector", () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = new Vuex.Store({
      modules,
    });
  });

  const createComponent = (options) => {
    wrapper = mount(BuilderDoughSelector, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("is render", () => {
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("dough list should be empty when 'Builder/doughs' is empty", () => {
    createComponent({ localVue, store });
    const doughList = wrapper.find(".dough");
    expect(Array.from(doughList.element.children)).toEqual([]);
  });

  it("dough list should not be empty when 'Builder/doughs' is not empty", () => {
    store.state["Builder"].doughs = dough;
    createComponent({ localVue, store });
    const doughList = wrapper.find(".dough");
    expect(Array.from(doughList.element.children).length > 0).toBeTruthy();
  });

  it("doughId should be equal 2 when 'large' radio-button click", () => {
    createComponent({ localVue, store });
    const largeRadioButton = wrapper.find("input[value='large']");
    largeRadioButton.trigger("click");
    expect(store.state["Builder"].doughId).toBe(2);
  });

  it("doughId should be equal 1 when 'light' radio-button click", () => {
    store.state["Builder"].doughId = 2;
    createComponent({ localVue, store });
    const lightRadioButton = wrapper.find("input[value='light']");
    lightRadioButton.trigger("click");
    expect(store.state["Builder"].doughId).toBe(1);
  });
});
