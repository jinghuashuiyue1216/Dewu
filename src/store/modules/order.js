const order = {
  namespaced: true,
  state: {
    cars: [],
  },
  getters: {
    getCars(state) {
      return state.cars;
    },
  },
  mutations: {
    clearCars(state) {
      state.cars = [];
    },
    removeProduct(state, productId) {
      state.cars.splice(
        state.cars.findIndex((item) => item === productId),
        1
      );
    },
    addCars(state, productId) {
      if (state.cars.findIndex((el) => el === productId) === -1) {
        state.cars.push(productId);
      }
    },
  },
  actions: {},
};

export default order;
