import { createStore } from "vuex";
import TrashType from "@/models/TrashType";

export default createStore({
  state: {
    scoreSuccessful: 0,
    scoreUnsuccessful: 0,
    gameProcessed: false,
    timeDrop: 1000,
    trashTypes: [
      {
        text: "Вторсырье",
        type: "yellow",
        color: "#fad70b",
      },
      {
        text: "Смешанные",
        type: "green",
        color: "#8fcf13",
      },
      {
        text: "Бытовые",
        type: "blue",
        color: "#0a61e7",
      },
      {
        text: "Опасные",
        type: "red",
        color: "#ce1227",
      },
    ] as Array<TrashType>,
  },
  mutations: {
    SCORE_INCREMENT_SUCCESSFUL(state) {
      state.scoreSuccessful++;
    },
    SCORE_INCREMENT_UNSUCCESSFUL(state) {
      state.scoreUnsuccessful++;
    },
    SCORE_DEFAULT(state) {
      if (state.scoreSuccessful !== 0 && state.scoreUnsuccessful !== 0) {
        state.scoreSuccessful = 0;
        state.scoreUnsuccessful = 0;
      }
    },
    GAME_START(state) {
      state.gameProcessed = true;
    },
    GAME_STOP(state) {
      state.gameProcessed = false;
    },
  },
});
