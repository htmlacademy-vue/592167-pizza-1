import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import modules from "@/store/modules";
import Index from "@/views";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Index", () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = new Vuex.Store({
      modules,
    });
  });

  const createComponent = (options) => {
    wrapper = mount(Index, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("is render", () => {
    createComponent({ localVue, store });
    console.log(wrapper.html());
    expect(wrapper.exists()).toBeTruthy();
  });
});
