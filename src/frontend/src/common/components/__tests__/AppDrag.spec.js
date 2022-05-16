import { mount, createLocalVue } from "@vue/test-utils";
import AppDrag from "@/common/components/AppDrag";

const localVue = createLocalVue();

describe("AppDrag", () => {
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(AppDrag, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("is render", () => {
    createComponent({ localVue });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("start drag", async () => {
    const propsData = {
      ingredientId: 1,
      ingredientCount: 0,
    };
    const slots = {
      default: {
        template: "<span class='filling filling--mushrooms'>Грибы</span>",
      },
    };
    // const slots = {};
    createComponent({ localVue, propsData, slots });
    const spyDrag = jest.spyOn(wrapper.vm, "onDrag");
    const dataTransfer = {
      effectAllowed: null,
      dropEffect: null,
      setData: jest.fn,
    };
    wrapper.find("div").trigger("dragstart", { dataTransfer });
    expect(spyDrag).toHaveBeenCalled();
  });
});
