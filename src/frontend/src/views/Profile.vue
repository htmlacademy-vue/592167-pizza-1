<template>
  <div>
    <main class="layout">
      <div class="layout__sidebar sidebar">
        <router-link to="/" class="logo layout__logo">
          <img
            src="@/assets/img/logo.svg"
            alt="V!U!E! Pizza logo"
            width="90"
            height="40"
          />
        </router-link>

        <router-link to="/orders" class="layout__link"
          >История заказов</router-link
        >
        <a class="layout__link layout__link--active">Мои данные</a>
      </div>

      <div class="layout__content">
        <div class="layout__title">
          <h1 class="title title--big">Мои данные</h1>
        </div>

        <div class="user">
          <picture>
            <source
              type="image/webp"
              srcset="
                ../assets/img/users/user5@2x.webp 1x,
                ../assets/img/users/user5@4x.webp 2x
              "
            />
            <img
              src="@/assets/img/users/user5@2x.jpg"
              srcset="../assets/img/users/user5@4x.jpg"
              :alt="userInfo.name"
              width="72"
              height="72"
            />
          </picture>
          <div class="user__name">
            <span>{{ userInfo.name }}</span>
          </div>
          <p class="user__phone">
            Контактный телефон: <span>{{ userInfo.phone }}</span>
          </p>
        </div>

        <div v-for="(address, i) in addresses" :key="i" class="layout__address">
          <div class="sheet address-form">
            <div class="address-form__header">
              <b>{{ address.name }}</b>
              <div class="address-form__edit">
                <button
                  data-test="button-change"
                  type="button"
                  class="icon"
                  @click="editAddress(address.id)"
                >
                  <span class="visually-hidden">Изменить адрес</span>
                </button>
              </div>
            </div>
            <p data-test="address-full-name">
              Ул. {{ address.street }}, д.{{ address.building }}
              {{ address.flat ? ", кв." + address.flat : "" }}
            </p>
            <small>{{ address.comment }}</small>
          </div>
        </div>

        <div
          v-if="showForm"
          class="layout__address"
          data-test="new-address-form"
        >
          <form
            action="#"
            method="post"
            class="address-form address-form--opened sheet"
            @submit.prevent="saveAddress"
          >
            <div class="address-form__header">
              <b>Адрес №{{ addressCount }}</b>
            </div>

            <div class="address-form__wrapper">
              <div class="address-form__input">
                <label class="input">
                  <span>Название адреса*</span>
                  <input
                    v-model="name"
                    type="text"
                    name="addr-name"
                    placeholder="Введите название адреса"
                    required
                  />
                </label>
              </div>
              <div
                class="address-form__input address-form__input--size--normal"
              >
                <label class="input">
                  <span>Улица*</span>
                  <input
                    v-model="street"
                    type="text"
                    name="addr-street"
                    placeholder="Введите название улицы"
                    required
                  />
                </label>
              </div>
              <div class="address-form__input address-form__input--size--small">
                <label class="input">
                  <span>Дом*</span>
                  <input
                    v-model="building"
                    type="text"
                    name="addr-house"
                    placeholder="Введите номер дома"
                    required
                  />
                </label>
              </div>
              <div class="address-form__input address-form__input--size--small">
                <label class="input">
                  <span>Квартира</span>
                  <input
                    v-model="flat"
                    type="text"
                    name="addr-apartment"
                    placeholder="Введите № квартиры"
                  />
                </label>
              </div>
              <div class="address-form__input">
                <label class="input">
                  <span>Комментарий</span>
                  <input
                    v-model="comment"
                    type="text"
                    name="addr-comment"
                    placeholder="Введите комментарий"
                  />
                </label>
              </div>
            </div>

            <div class="address-form__buttons">
              <button
                v-if="showDeleteButton"
                data-test="button-delete-address"
                type="button"
                class="button button--transparent"
                @click="onDeleteAddress"
              >
                Удалить
              </button>
              <button type="submit" class="button">Сохранить</button>
            </div>
          </form>
        </div>

        <div class="layout__button">
          <button
            data-test="add-address"
            type="button"
            class="button button--border"
            @click="showFormAddNewAddress"
          >
            Добавить новый адрес
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Profile",
  data() {
    return {
      name: "",
      street: "",
      building: "",
      flat: "",
      comment: "",
      addressCount: 0,
      showForm: false,
      showDeleteButton: false,
      addressId: null,
    };
  },
  computed: {
    ...mapGetters("Auth", ["userInfo"]),
    ...mapGetters("Profile", ["addresses"]),
  },
  methods: {
    ...mapActions("Profile", ["addAddress", "changeAddress", "deleteAddress"]),
    showFormAddNewAddress() {
      this.showForm = true;
      this.showDeleteButton = false;
      this.addressCount = this.addresses.length + 1;
      this.clearFormFields();
    },
    saveAddress() {
      const address = {
        name: this.name,
        street: this.street,
        building: this.building,
        flat: this.flat,
        comment: this.comment,
        userId: this.userInfo.id,
      };

      if (this.showDeleteButton) {
        address.id = this.addressId;
        this.changeAddress(address);
      } else {
        this.addAddress(address);
      }

      this.clearFormFields();
      this.closeAddressForm();
    },
    editAddress(id) {
      this.openAddressForm();
      this.showDeleteButton = true;
      this.addressCount = id;

      const address = this.addresses.find((it) => it.id === id);
      this.name = address.name;
      this.street = address.street;
      this.building = address.building;
      this.flat = address.flat;
      this.comment = address.comment;

      this.addressId = id;
    },
    onDeleteAddress() {
      this.deleteAddress(this.addressId);
      this.closeAddressForm();
    },
    clearFormFields() {
      this.name = "";
      this.street = "";
      this.building = "";
      this.flat = "";
      this.comment = "";
    },
    openAddressForm() {
      this.showForm = true;
    },
    closeAddressForm() {
      this.showForm = false;
    },
  },
};
</script>
