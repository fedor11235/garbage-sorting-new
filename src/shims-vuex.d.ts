import { ComponentCustomProperties } from "vue";
import { Store } from "vuex";

declare module "@vue/runtime-core" {
  interface State {
    count: number;
    scoreSuccessful: number;
    scoreUnsuccessful: number;
    gameProcessed: boolean;
  }

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
