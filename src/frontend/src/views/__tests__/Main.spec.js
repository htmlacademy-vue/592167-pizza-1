import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import modules from "@/store/modules";
import Main from "@/views/Main";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Main", () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = new Vuex.Store({
      modules,
    });
  });

  const createComponent = (options) => {
    wrapper = mount(Main, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("is render", () => {
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });
});
