<template>
  <div class="score" :style="{ backgroundColor: selectColor }">
    <img
      class="score__img"
      :src="require(`@/assets/img/${type}.png`)"
      :alt="type"
    />
    {{ selectScore }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";

export default defineComponent({
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState(["scoreSuccessful", "scoreUnsuccessful"]),
    selectColor(): string {
      if (this.type === "ok") {
        return "#aadd65";
      }
      if (this.type === "no") {
        return "#d10079";
      }
      return "";
    },
    selectScore(): string {
      if (this.type === "ok") {
        return this.scoreSuccessful;
      }
      if (this.type === "no") {
        return this.scoreUnsuccessful;
      }
      return "";
    },
  },
});
</script>

<style>
.score {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 112px;
  height: 58px;
  border-radius: 38px;
  font-size: 28px;
  font-weight: 600;
  color: white;
}
.score__img {
  width: 28px;
}
</style>
