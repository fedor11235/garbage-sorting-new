

import { createStore } from "vuex";

export default createStore({
  state: {
    scoreSuccessful: 0,
    scoreUnsuccessful: 0,
    gameProcessed: false,
  },
  getters: {},
  mutations: {
    SCORE_INCREMENT_SUCCESSFUL(state) {
        state.scoreSuccessful ++;
    },
    SCORE_INCREMENT_UNSUCCESSFUL(state) {
      state.scoreUnsuccessful ++;
    },
    SCORE_DEFAULT(state) {
      if (state.scoreSuccessful === 0 && state.scoreUnsuccessful===0) return;
      state.scoreSuccessful = 0;
    },
    GAME_START(state) {
      state.gameProcessed = true;
    },
    GAME_STOP(state) {
      state.gameProcessed = false;
    },
  },
  actions: {},
  modules: {},
});
