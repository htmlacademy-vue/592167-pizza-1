import { mount, createLocalVue } from "@vue/test-utils";
import AppItemCounter from "@/common/components/AppItemCounter";

const localVue = createLocalVue();

describe("AppItemCounter", () => {
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(AppItemCounter, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("is render", () => {
    createComponent({ localVue });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("displays button minus", () => {
    createComponent({ localVue });
    const buttonMinus = wrapper.find("[data-test='button-minus']");
    expect(buttonMinus.exists()).toBeTruthy();
  });

  it("displays button plus", () => {
    createComponent({ localVue });
    const buttonPlus = wrapper.find("[data-test='button-plus']");
    expect(buttonPlus.exists()).toBeTruthy();
  });

  it("disabled button minus", () => {
    createComponent({ localVue });
    const buttonMinus = wrapper.find("[data-test='button-minus']");
    expect(buttonMinus.attributes("disabled")).toBeTruthy();
  });

  it("active button plus", () => {
    createComponent({ localVue });
    const buttonPlus = wrapper.find("[data-test='button-plus']");
    expect(buttonPlus.attributes("disabled")).toBeFalsy();
  });

  it("button plus is disable if count equal maxCount", () => {
    const propsData = {
      ingredientCount: 3,
      maxCount: 3,
    };
    createComponent({ localVue, propsData });
    const buttonPlus = wrapper.find("[data-test='button-plus'");
    expect(buttonPlus.attributes("disabled")).toBeTruthy();
  });

  it("changeIngredientCount should return incremented value", () => {
    const propsData = {
      ingredientCount: 2,
    };
    createComponent({ localVue, propsData });
    const buttonPlus = wrapper.find("[data-test='button-plus']");
    buttonPlus.trigger("click");
    expect(wrapper.emitted("changeIngredientCount").shift()).toEqual([3]);
  });

  it("changeIngredientCount should return decremented value", () => {
    const propsData = {
      ingredientCount: 2,
    };
    createComponent({ localVue, propsData });
    const buttonMinus = wrapper.find("[data-test='button-minus']");
    buttonMinus.trigger("click");
    expect(wrapper.emitted("changeIngredientCount").shift()).toEqual([1]);
  });
});
