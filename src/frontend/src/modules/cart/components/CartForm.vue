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
        <input type="text" name="tel" placeholder="+7 999-999-99-99" />
      </label>

      <div v-if="deliveryChoice > '1'" class="cart-form__address">
        <span class="cart-form__label">Новый адрес:</span>

        <div class="cart-form__input">
          <label class="input">
            <span>Улица*</span>
            <input
              type="text"
              name="street"
              :style="
                deliveryChoice > '2' ? 'background-color: #f7f4f4' : 'none'
              "
              :disabled="deliveryChoice > '2'"
              :value="
                deliveryChoice > '2'
                  ? addresses[deliveryChoice - startPersonalAddressIndex].street
                  : ''
              "
            />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Дом*</span>
            <input
              type="text"
              name="house"
              :style="
                deliveryChoice > '2' ? 'background-color: #f7f4f4' : 'none'
              "
              :disabled="deliveryChoice > '2'"
              :value="
                deliveryChoice > '2'
                  ? addresses[deliveryChoice - startPersonalAddressIndex]
                      .building
                  : ''
              "
            />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Квартира</span>
            <input
              type="text"
              name="apartment"
              :style="
                deliveryChoice > '2' ? 'background-color: #f7f4f4' : 'none'
              "
              :disabled="deliveryChoice > '2'"
              :value="
                deliveryChoice > '2'
                  ? addresses[deliveryChoice - startPersonalAddressIndex].flat
                  : ''
              "
            />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CartForm",
  data() {
    return {
      deliveryChoice: 1,
      startPersonalAddressIndex: 3,
    };
  },
  computed: {
    ...mapGetters("Auth", ["isAuthenticated"]),
    ...mapGetters("Profile", ["addresses"]),
  },
};
</script>
