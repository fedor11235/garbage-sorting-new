

import { createStore } from "vuex";

export default createStore({
  state: {
    scoreSuccessful: 0,
    scoreUnsuccessful: 0,
    gameProcessed: false,
  },
  getters: {},
  mutations: {
    // SCORE_INCREASE(state) {
    //     state.scoreSuccessful ++;
    // },
    // SCORE_DECREASE(state) {
    //   state.scoreSuccessful --;
    // },
    // SCORE_DEFAULT(state) {
    //   if (state.scoreSuccessful === 0) return;
    //   state.scoreSuccessful = 0;
    // },
    // GAME_START(state) {
    //   state.gameProcessed = true;
    // },
    // GAME_STOP(state) {
    //   state.gameProcessed = false;
    // },
  },
  actions: {},
  modules: {},
});
