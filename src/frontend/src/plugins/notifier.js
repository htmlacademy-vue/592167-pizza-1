export default class Notifier {
  #store;
  constructor(store) {
    this.#store = store;
  }

  success(text) {
    this.#store.dispatch("createNotification", {
      text,
      type: "success",
    });
  }

  error(text) {
    this.#store.dispatch("createNotification", {
      text,
      type: "error",
    });
  }
}
