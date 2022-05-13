import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import VueRouter from "vue-router";
import VuexPlugins from "@/plugins/vuexPlugins";
import modules from "@/store/modules";
import validator from "@/common/mixins/validator";
import Login from "@/views/Login";
import "@/plugins/vuePlugins";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);
localVue.mixin(validator);

describe("Login", () => {
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
    wrapper = mount(Login, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("is render", () => {
    createComponent({ localVue, store, router });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("fields email and password are required", async () => {
    createComponent({ localVue, store, router });
    const form = wrapper.find("form");
    await form.trigger("submit");
    const emailErrorMessage = wrapper.find("input[type='text'] + span");
    expect(emailErrorMessage.text()).toBe("Поле обязательно для заполнения");
    const passwordErrorMessage = wrapper.find("input[type='password'] + span");
    expect(passwordErrorMessage.text()).toBe("Поле обязательно для заполнения");
  });

  it("if email is invalid format then should be error message: 'Электронная почта имеет неверный формат'", async () => {
    createComponent({ localVue, store, router });
    const email = wrapper.find("input[type='text']");
    email.element.value = "4802384";
    await email.trigger("input");
    const form = wrapper.find("form");
    await form.trigger("submit");
    const emailErrorMessage = wrapper.find("input[type='text'] + span");
    expect(emailErrorMessage.text()).toBe(
      "Электронная почта имеет неверный формат"
    );
  });

  it("if email and password valid then form should be successfully send", async () => {
    createComponent({ localVue, store, router });
    // wrapper.vm.$api.auth.login = jest.fn;
    const spyLogin = jest.spyOn(wrapper.vm, "loginUser");
    await wrapper.find("input[type='text']").setValue("user@example.com");
    await wrapper.find("input[type='password']").setValue("user@example.com");
    await wrapper.find("form").trigger("submit");
    expect(spyLogin).toHaveBeenCalled();
  });
});
