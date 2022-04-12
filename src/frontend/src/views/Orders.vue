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

        <a class="layout__link layout__link--active">История заказов</a>
        <router-link to="/profile" class="layout__link">
          Мои данные
        </router-link>
      </div>

      <div class="layout__content">
        <div class="layout__title">
          <h1 class="title title--big">История заказов</h1>
        </div>

        <template v-if="isOrders">
          <section v-for="order in orders" :key="order.id" class="sheet order">
            <div class="order__wrapper">
              <div class="order__number">
                <b>Заказ #{{ order.id }}</b>
              </div>

              <div class="order__sum">
                <span>Сумма заказа: {{ order.totalPrice }} ₽</span>
              </div>

              <div class="order__button">
                <button
                  type="button"
                  class="button button--border"
                  @click="deleteOrder(order.id)"
                >
                  Удалить
                </button>
              </div>
              <div class="order__button">
                <button type="button" class="button">Повторить</button>
              </div>
            </div>

            <ul class="order__list">
              <li
                v-for="pizza in order.orderPizzas"
                :key="pizza.id"
                class="order__item"
              >
                <div class="product">
                  <img
                    src="@/assets/img/product.svg"
                    class="product__img"
                    width="56"
                    height="56"
                    :alt="pizza.name"
                  />
                  <div class="product__text">
                    <h2>{{ pizza.name }}</h2>
                    <ul>
                      <li>
                        {{ pizza.sizeView }}, на {{ pizza.doughView }} тесте
                      </li>
                      <li>Соус: {{ pizza.sauceView }}</li>
                      <li>Начинка: {{ pizza.ingredientsForView }}</li>
                    </ul>
                  </div>
                </div>

                <p class="order__price">
                  {{
                    pizza.quantity > 1
                      ? pizza.quantity + "x" + pizza.sum
                      : pizza.sum
                  }}
                  ₽
                </p>
              </li>
            </ul>

            <ul class="order__additional">
              <li v-for="misc in order.orderMisc" :key="misc.id">
                <img :src="misc.img" width="20" height="30" :alt="misc.name" />
                <p>
                  <span>{{ misc.name }}</span>
                  <b
                    >{{
                      misc.quantity > 1
                        ? misc.quantity + " x " + misc.sum
                        : misc.sum
                    }}
                    ₽</b
                  >
                </p>
              </li>
            </ul>

            <p class="order__address">
              Адрес доставки:
              {{ order.addressId ? order.orderAddress.name : "Заберу сам" }}
            </p>
          </section>
        </template>
        <template v-else>
          <div class="sheet cart__empty">
            <p>История пока пуста</p>
          </div>
        </template>
      </div>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Orders",
  computed: {
    ...mapGetters("Orders", ["isOrders", "orders"]),
  },
  methods: {
    ...mapActions("Orders", ["deleteOrder"]),
  },
};
</script>
