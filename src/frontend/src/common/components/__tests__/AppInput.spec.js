import { mount, createLocalVue } from "@vue/test-utils";
import AppInput from "@/common/components/AppInput";

const localVue = createLocalVue();

describe("AppInput", () => {
  let wrapper;
  const propsData = {
    name: "name",
    value: "",
  };
  const computed = {
    showError() {
      return true;
    },
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
    createComponent({ localVue, propsData, computed });
    expect(wrapper.vm.showError).toBeTruthy();
  });

  it("raises input event", () => {
    createComponent({ localVue, propsData });
    wrapper.vm.$emit("input");
    expect(wrapper.emitted().input).toBeTruthy();
  });

  it("className must contain 'text-field__input--error' if showError is true", () => {
    createComponent({ localVue, propsData, computed });
    const input = wrapper.find("input");
    expect(input.attributes("class")).toContain("text-field__input--error");
  });
});
