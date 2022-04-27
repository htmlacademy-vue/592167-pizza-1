import { mount, createLocalVue } from "@vue/test-utils";
import AppButtonCounter from "@/common/components/AppButtonCounter";

const localVue = createLocalVue();

describe("AppButtonCounter", () => {
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(AppButtonCounter, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("is render", async () => {
    createComponent({ localVue });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("displays button", () => {
    createComponent({ localVue });
    const button = wrapper.find(".counter__button");
    expect(button.exists()).toBeTruthy();
  });

  it("raises the click event on button", async () => {
    createComponent({ localVue });
    wrapper.vm.$emit("changeCount");
    expect(wrapper.emitted().changeCount).toBeTruthy();
  });

  it("contained class name", () => {
    createComponent({
      localVue,
      propsData: {
        differential: "some-class",
      },
    });
    const button = wrapper.find(".counter__button");
    expect(button.attributes("class")).toContain("some-class");
  });

  it("button must be disabled", () => {
    createComponent({
      localVue,
      propsData: {
        isDisabled: false,
      },
    });
    const button = wrapper.find(".counter__button");
    expect(button.attributes("disabled")).toBeFalsy();
  });
});
