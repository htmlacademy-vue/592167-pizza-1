import { mount, createLocalVue } from "@vue/test-utils";
import BuilderIngredientPicture from "@/modules/builder/components/BuilderIngredientPicture";

const localVue = createLocalVue();

describe("BuilderIngredientPicture", () => {
  let wrapper;
  let propsData = {
    ingredientName: "mushrooms",
    ingredientRusName: "Грибы",
  };

  const createComponent = (options) => {
    wrapper = mount(BuilderIngredientPicture, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("is render", () => {
    createComponent({ localVue, propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("className should contain 'filling--mushrooms'", () => {
    createComponent({ localVue, propsData });
    expect(wrapper.attributes("class")).toContain("filling--mushrooms");
  });

  it("element should contain 'Грибы'", () => {
    createComponent({ localVue, propsData });
    expect(wrapper.element.textContent.trim()).toBe("Грибы");
  });
});
