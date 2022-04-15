<template>
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

<script>
import { mapActions, mapGetters } from "vuex";
import AppInput from "@/common/components/AppInput";
import validator from "@/common/mixins/validator";

export default {
  name: "CartForm",
  components: { AppInput },
  mixins: [validator],
  data() {
    return {
      startPersonalAddressIndex: 3,
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
    ...mapGetters("Auth", ["isAuthenticated"]),
    ...mapGetters("Profile", ["addresses"]),
    ...mapGetters("Cart", ["receivingOrder", "address", "phone"]),
    isDisabled() {
      return this.receivingOrder > 2;
    },
    isShowAddressForm() {
      return this.receivingOrder > 1;
    },
  },
  watch: {
    receivingOrder() {
      this.addAddressFromUserAddresses(this.receivingOrder);
      if (this.receivingOrder !== 2) {
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
      "changeReceivingOrder",
      "addAddressFromUserAddresses",
      "addPhone",
      "changeAddressField",
    ]),
    validationFields() {
      const fields = {
        phone: this.phone,
        street: this.$refs.street.value,
        building: this.address.building,
      };
      this.validations["street"].needValidation = +this.receivingOrder === 2;
      this.validations["building"].needValidation = +this.receivingOrder === 2;
      return this.$validateFields(fields, this.validations);
    },
    giveAddressFields() {
      return [
        this.receivingOrder,
        {
          street: this.$refs.street.value,
          building: this.$refs.building.value,
          flat: this.$refs.flat.value,
        },
      ];
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
  },
};
</script>
