import { createStore } from "vuex";
import order from "./modules/order";

const store = createStore({
  state: {},
  modules: {
    order,
  },
});

export default store;
