<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>

        <select v-model="deliveryChoice" name="test" class="select">
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
          v-model="phone"
          type="tel"
          name="tel"
          placeholder="+7 999-999-99-99"
          :error-text="validations.phone.error"
        />
      </label>

      <div v-if="isShowAddressForm" class="cart-form__address">
        <span class="cart-form__label">Новый адрес:</span>

        <div class="cart-form__input">
          <label class="input">
            <span>Улица*</span>
            <app-input
              ref="street"
              v-model="street"
              type="text"
              name="street"
              :error-text="validations.street.error"
              :disabled="isDisabled"
            />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Дом*</span>
            <app-input
              ref="building"
              v-model="building"
              type="text"
              name="building"
              :error-text="validations.building.error"
              :disabled="isDisabled"
            />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Квартира</span>
            <app-input
              ref="flat"
              v-model="flat"
              type="text"
              name="apartment"
              :error-text="validations.flat.error"
              :disabled="isDisabled"
            />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AppInput from "@/common/components/AppInput";
import validator from "@/common/mixins/validator";

export default {
  name: "CartForm",
  components: { AppInput },
  mixins: [validator],
  data() {
    return {
      startPersonalAddressIndex: 3,
      deliveryChoice: 1,
      street: "",
      building: "",
      flat: "",
      phone: "",
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
    isDisabled() {
      return this.deliveryChoice > 2;
    },
    isShowAddressForm() {
      return this.deliveryChoice > 1;
    },
  },
  watch: {
    deliveryChoice() {
      this.street =
        this.deliveryChoice > 2
          ? this.addresses[this.deliveryChoice - this.startPersonalAddressIndex]
              .street
          : "";
      this.building =
        this.deliveryChoice > 2
          ? this.addresses[this.deliveryChoice - this.startPersonalAddressIndex]
              .building
          : "";
      this.flat =
        this.deliveryChoice > 2
          ? this.addresses[this.deliveryChoice - this.startPersonalAddressIndex]
              .flat
          : "";
      if (this.deliveryChoice !== 2) {
        this.$clearValidationErrors();
      }
    },
    phone() {
      this.$clearValidationErrors();
    },
    street() {
      this.$clearValidationErrors();
    },
    building() {
      this.$clearValidationErrors();
    },
  },
  methods: {
    validationFields() {
      const fields = {
        phone: this.phone,
        street: this.street,
        building: this.building,
      };
      this.validations["street"].needValidation = +this.deliveryChoice === 2;
      this.validations["building"].needValidation = +this.deliveryChoice === 2;
      return this.$validateFields(fields, this.validations);
    },
  },
};
</script>
