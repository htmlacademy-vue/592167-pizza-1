import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import VuexPlugins from "@/plugins/vuexPlugins";
import VueRouter from "vue-router";
import modules from "@/store/modules";
import Profile from "@/views/Profile";
import user from "@/static/user.json";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

const address = {
  id: 1,
  name: "Домашний",
  street: "Филатова",
  building: 8,
  flat: 38,
  comment: "Наберите за 20 мин до приезда",
  userId: "abce1edc-6c38-41f7-b928-a4f5c04b6e56",
};

describe("Profile", () => {
  let store;
  let wrapper;
  let router;

  beforeEach(() => {
    store = new Vuex.Store({
      modules,
      plugins: [VuexPlugins],
    });
    router = new VueRouter();
    store.state["Auth"].user = user;
  });

  const createComponent = (options) => {
    wrapper = mount(Profile, options);
  };

  afterEach(() => {
    wrapper.destroy();
    store.state["Auth"].user = {};
  });

  it("is render", () => {
    createComponent({ localVue, store, router });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("should be show address when address is in profile addresses", () => {
    store.state["Profile"].addresses = [address];
    createComponent({ localVue, store, router });
    const addressList = wrapper.find(".layout__address");
    const addressFullName = wrapper.find("[data-test='address-full-name']");
    expect(addressList.exists()).toBeTruthy();
    expect(addressFullName.text().replace(/[\n\r ]/g, "")).toBe(
      "Ул.Филатова,д.8,кв.38"
    );
  });

  it("should be show new address form when click button 'add-address'", async () => {
    createComponent({ localVue, store, router });
    const addButton = wrapper.find("[data-test='add-address']");
    await addButton.trigger("click");
    const newAddressForm = wrapper.find("[data-test='new-address-form']");
    const buttonDeleteAddress = wrapper.find(
      "[data-test='button-delete-address']"
    );
    expect(newAddressForm.exists()).toBeTruthy();
    expect(buttonDeleteAddress.exists()).toBeFalsy();
  });

  it("should be visible button delete address when click button change address", () => {
    store.state["Profile"].addresses = [address];
    createComponent({ localVue, store, router });
    const buttonChange = wrapper.find("[data-test='button-change']");
    expect(buttonChange.exists()).toBeTruthy();
  });
});
