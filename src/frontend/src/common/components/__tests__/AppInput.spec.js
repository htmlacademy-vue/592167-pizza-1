import { mount, createLocalVue } from "@vue/test-utils";
import AppInput from "@/common/components/AppInput";

const localVue = createLocalVue();

describe("AppInput", () => {
  let wrapper;
  const propsData = {
    name: "name",
    value: "",
  };

  const createComponent = (options) => {
    wrapper = mount(AppInput, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("is render", () => {
    createComponent({ localVue, propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("show error message", () => {
    propsData.errorText = "Some error text";
    createComponent({ localVue, propsData });
    const spanError = wrapper.find(".text-field__text--error");
    expect(spanError.exists()).toBeTruthy();
  });

  it("raises input event", () => {
    createComponent({ localVue, propsData });
    const input = wrapper.find("input");
    input.element.value = "some text";
    input.trigger("input");
    expect(wrapper.emitted().input).toBeTruthy();
  });

  it("className must contain 'text-field__input--error' if showError is true", () => {
    propsData.errorText = "Some error text";
    createComponent({ localVue, propsData });
    const input = wrapper.find("input");
    expect(input.attributes("class")).toContain("text-field__input--error");
  });
});
