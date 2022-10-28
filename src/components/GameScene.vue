<template>
  <div class="scene">
    <div class="game">
      <div  class="game__title">Выберите правильный бак для сортировки мусора</div>
      <ScoreLabel class="game__successful-attempts" type="ok" />
      <ScoreLabel class="game__unsuccessful-attempts" type="no" />
      <div class="wasteboxes">
        <div>
          <div class="wasteboxes__title wasteboxes__title_yellow">Вторсырье</div>
          <WasteItem type="yellow" />
        </div>
        <div>
          <div class="wasteboxes__title wasteboxes__title_green">Смешанные</div>
          <WasteItem type="green" />
        </div>
        <div>
          <div class="wasteboxes__title wasteboxes__title_blue">Бытовые</div>
          <WasteItem type="blue" />
        </div>
        <div>
          <div class="wasteboxes__title wasteboxes__title_red">Вторсырье</div>
          <WasteItem type="red" />
        </div>
      </div>
      </div>
    </div>
</template>

<script lang="ts">
/* eslint-disable */
import { defineComponent } from "vue";
import { mapState, mapMutations } from "vuex";
import WasteItem from "@/components/WasteItem.vue";
import ScoreLabel from "@/components/ScoreLabel.vue";
export default defineComponent({
  components: {
    WasteItem,
    ScoreLabel
  },
  data() {
    return {
      dragObject: {
        elem: null,
        offsetLeft: 0,
        offsetTop: 0,
      },
      garbageList: [] as any,
      trashList: [
        { type: "plastic", ref: "trachPlastic", color: "red" },
        { type: "paper", ref: "trachPaper", color: "green" },
        { type: "glass", ref: "trachGlass", color: "yellow" },
      ],
      mooveX: 0,
      mooveY: 0,
      garbageWidth: 80,
      garbageHeight: 40,
      garbageMinAmount: 15,
      garbageMaxAmount: 25,
      garbageEndТumber: 0,
    };
  },
  computed: {
    ...mapState(["score", "gameProcessed"]),
  },
  mounted() {
    // this.generationGarbage()
  },
  methods: {
    ...mapMutations({
      scoreIncrease: "SCORE_INCREASE",
      scoreDecrease: "SCORE_DECREASE",
    }),
  },
});
</script>

<style>
.scene {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100vh;
  width: 100vw;
  background-color: #47bf7e;
}
.game {
  position: relative;
  overflow:hidden;
  width: 606px;
  height: 486px;
  background: white;
  border-radius: 26px;
}

.game__title {
  width: 342px;
  color:#1a2674;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  margin: auto;
  margin-top: 12px;
  line-height: 32px;
}

.game__successful-attempts {
  position: absolute;
  top: 180px;
  left: 44px;
}

.game__unsuccessful-attempts {
  position: absolute;
  top: 180px;
  right: 44px;
}

.wasteboxes {
  position: absolute;
  display: grid;
  grid-template-columns: 112px 112px 112px 112px;
  grid-column-gap: 8px;
  padding: 0 66px;
  bottom: 84px;
}

.wasteboxes__title {
  width: 104px;
  height: 26px;
  border-radius: 24px;
  text-align: center;
  font-weight: 600;
  color: white;
  font-size: 14px;
  line-height: 26px;
  margin: auto;
  margin-bottom: 14px;
}

.wasteboxes__title_yellow {
  background-color: #fad70b;
}
.wasteboxes__title_green {
  background-color: #8fcf13;
}
.wasteboxes__title_blue {
  background-color: #0a61e7;
}
.wasteboxes__title_red {
  background-color: #ce1227;
}
</style>
