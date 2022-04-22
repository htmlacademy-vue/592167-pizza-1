<template>
  <form action="#" method="post" class="layout-form" @submit.prevent>
    <cart-main>
      <template v-slot:cartForm>
        <div class="cart__form">
          <div class="cart-form">
            <label class="cart-form__select">
              <span class="cart-form__label">Получение заказа:</span>

              <select
                :value="receivingOrder"
                name="test"
                class="select"
                @change="onReceivingOrderChange"
              >
                <option value="1">Заберу сам</option>
                <option value="2">Новый адрес</option>
                <option
                  v-for="(address, idx) in addresses"
                  :key="address.id"
                  :value="startPersonalAddressIndex + idx"
                >
                  {{ address.name }}
                </option>
              </select>
            </label>

            <label class="input input--big-label">
              <span>Контактный телефон:</span>
              <app-input
                ref="phone"
                :value="phone"
                type="tel"
                name="tel"
                placeholder="+7 999-999-99-99"
                :error-text="validations.phone.error"
                @input="changePhone"
              />
            </label>

            <div v-if="isShowAddressForm" class="cart-form__address">
              <span class="cart-form__label">Новый адрес:</span>

              <div class="cart-form__input">
                <label class="input">
                  <span>Улица*</span>
                  <app-input
                    ref="street"
                    :value="address.street"
                    type="text"
                    name="street"
                    :error-text="validations.street.error"
                    :disabled="isDisabled"
                    @input="changeStreet"
                  />
                </label>
              </div>

              <div class="cart-form__input cart-form__input--small">
                <label class="input">
                  <span>Дом*</span>
                  <app-input
                    ref="building"
                    :value="address.building"
                    type="text"
                    name="building"
                    :error-text="validations.building.error"
                    :disabled="isDisabled"
                    @input="changeBuilding"
                  />
                </label>
              </div>

              <div class="cart-form__input cart-form__input--small">
                <label class="input">
                  <span>Квартира</span>
                  <app-input
                    ref="flat"
                    :value="address.flat"
                    type="text"
                    name="apartment"
                    :error-text="validations.flat.error"
                    :disabled="isDisabled"
                    @input="changeFlat"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </template>
    </cart-main>
    <cart-footer
      v-if="pizzas.length > 0"
      @makeOrder="onOrderClick"
    ></cart-footer>
    <transition name="slide-popup" mode="out-in">
      <app-popup v-if="isOpenPopup" @closePopup="onClosePopupClick" />
    </transition>
  </form>
</template>

<script>
import CartMain from "@/modules/cart/CartMain";
import CartFooter from "@/modules/cart/CartFooter";
import AppPopup from "@/common/components/AppPopup";
import AppInput from "@/common/components/AppInput";
import { mapActions, mapGetters } from "vuex";
import { MY_FIRST_ADDRESS, NEW_ADDRESS, PICK_UP_MYSELF } from "@/constants";
import validator from "@/common/mixins/validator";

export default {
  name: "Cart",
  components: { CartMain, CartFooter, AppPopup, AppInput },
  mixins: [validator],
  data() {
    return {
      startPersonalAddressIndex: MY_FIRST_ADDRESS,
      isOpenPopup: false,
      validations: {
        phone: {
          error: "",
          rules: ["required"],
        },
        street: {
          error: "",
          rules: ["required"],
        },
        building: {
          error: "",
          rules: ["required"],
        },
        flat: {
          error: "",
          rules: [""],
        },
      },
    };
  },
  computed: {
    ...mapGetters("Cart", ["receivingOrder", "pizzas", "address", "phone"]),
    ...mapGetters("Auth", ["isAuthenticated"]),
    ...mapGetters("Profile", ["addresses"]),
    isDisabled() {
      return this.receivingOrder > NEW_ADDRESS;
    },
    isShowAddressForm() {
      return this.receivingOrder > PICK_UP_MYSELF;
    },
  },
  watch: {
    receivingOrder() {
      this.addAddressFromUserAddresses(this.receivingOrder);
      if (this.receivingOrder !== NEW_ADDRESS) {
        this.$clearValidationErrors();
      }
    },
    phone() {
      this.$clearValidationErrors();
    },
    "address.street"() {
      this.$clearValidationErrors();
    },
    "address.building"() {
      this.$clearValidationErrors();
    },
  },
  methods: {
    ...mapActions("Cart", [
      "changeAddressField",
      "changeReceivingOrder",
      "addPhone",
      "addAddressFromUserAddresses",
      "resetCartState",
      "addAddress",
    ]),
    ...mapActions("Orders", ["addOrder"]),
    onOrderClick() {
      if (this.validationFields()) {
        this.isOpenPopup = true;
      }
    },
    onReceivingOrderChange(evt) {
      this.changeReceivingOrder(
        +evt.target.options[[evt.target.options.selectedIndex]].value
      );
    },
    changePhone(phone) {
      this.addPhone(phone);
    },
    changeStreet(street) {
      this.changeAddressField({
        street,
      });
    },
    changeBuilding(building) {
      this.changeAddressField({
        building,
      });
    },
    changeFlat(flat) {
      this.changeAddressField({
        flat,
      });
    },
    validationFields() {
      const fields = {
        phone: this.phone,
        street: this.address.street,
        building: this.address.building,
      };
      this.validations["street"].needValidation =
        +this.receivingOrder === NEW_ADDRESS;
      this.validations["building"].needValidation =
        +this.receivingOrder === NEW_ADDRESS;
      return this.$validateFields(fields, this.validations);
    },
    async onClosePopupClick() {
      this.isOpenPopup = false;
      // let link = "/";
      // if (this.isAuthenticated) {
      //   if (+this.receivingOrder === NEW_ADDRESS) {
      //     this.addAddress({
      //       street: this.$refs.street.value,
      //       building: this.$refs.building.value,
      //       flat: this.$refs.flat.value,
      //     });
      //   }
      //   link = "/orders";
      //   await this.addOrder();
      // }
      // this.resetCartState();
      // await this.$router.push(link);
    },
  },
};
</script>

<style lang="scss" scoped>
.slide-popup-enter-active {
  transition: all 0.4s;
}
.slide-popup-enter {
  opacity: 0;
  margin-top: 100px;
}
.slide-popup-leave-active {
  transition: all 0.4s;
  opacity: 0;
  margin-top: 100px;
}
</style>
