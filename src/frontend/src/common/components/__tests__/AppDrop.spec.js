import { mount, createLocalVue } from "@vue/test-utils";
import AppDrop from "@/common/components/AppDrop";

const localVue = createLocalVue();

describe("AppDrop", () => {
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(AppDrop, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("is render", () => {
    createComponent({ localVue });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("drop stop", () => {
    createComponent({ localVue });
    const spyDrop = jest.spyOn(wrapper.vm, "onDrop");
    const dataTransfer = {
      getData: (payload) => {
        if (payload) {
          return JSON.stringify({ ingredientId: 1 });
        }
      },
    };
    wrapper.find("div").trigger("drop", { dataTransfer });
    expect(spyDrop).toHaveBeenCalled();
  });
});
