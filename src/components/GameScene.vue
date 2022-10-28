<template>
  <div class="scene">
    <div class="game">
      <div  class="game__title">Выберите правильный бак для сортировки мусора</div>
      <ScoreLabel class="game__successful-attempts" type="ok" />
      <ScoreLabel class="game__unsuccessful-attempts" type="no" />
        <StopwatchItem  class="game__stopwatch"/>
      <div class="wasteboxes">
        <div>
          <div class="wasteboxes__title wasteboxes__title_yellow">Вторсырье</div>
          <WasteItem type="yellow" @item-drop="handlerItemDrop" />
        </div>
        <div>
          <div class="wasteboxes__title wasteboxes__title_green">Смешанные</div>
          <WasteItem type="green" @item-drop="handlerItemDrop" />
        </div>
        <div>
          <div class="wasteboxes__title wasteboxes__title_blue">Бытовые</div>
          <WasteItem type="blue" @item-drop="handlerItemDrop" />
        </div>
        <div>
          <div class="wasteboxes__title wasteboxes__title_red">Вторсырье</div>
          <WasteItem type="red" @item-drop="handlerItemDrop" />
        </div>
      </div>
      <div class="game__animation">
        <div class="game__item" ref="itemСontainerBackground">
          <div class="game__background" ref="itemBackground"></div>
        </div>
        <div class="game__item game__item_animation" ref="itemСontainerTrash">
          <div class="game__trash" ref="itemTrash"></div>
        </div>
      </div>
    </div>
    <!-- <GameModal v-if="!$store.state.gameProcessed" /> -->
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { defineComponent } from "vue";
import { mapState, mapMutations } from "vuex";
import WasteItem from "@/components/WasteItem.vue";
import ScoreLabel from "@/components/ScoreLabel.vue";
import StopwatchItem from "@/components/StopwatchItem.vue";
import GameModal from "@/components/GameModal.vue";
export default defineComponent({
  components: {
    WasteItem,
    ScoreLabel,
    StopwatchItem,
    GameModal
  },
  data() {
    return {
      timeDrop: 600,
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
    handlerItemDrop(e: any) {
      this.animationItemStart(e)
      setTimeout(() => { this.animationItemEnd(e) }, this.timeDrop);
    },
    animationItemStart(type: any) {
      (this.$refs.itemСontainerBackground as any).classList.add(`drop_${type}`);
      (this.$refs.itemBackground as any).style.height="10px";
      (this.$refs.itemBackground as any).style.width="10px";

      (this.$refs.itemСontainerTrash as any).classList.add(`drop_${type}`);
      (this.$refs.itemTrash as any).style.height="10px";
      (this.$refs.itemTrash as any).style.width="10px";
    },
    animationItemEnd(type: any) {
      (this.$refs.itemСontainerBackground as any).classList.remove(`drop_${type}`);
      (this.$refs.itemBackground as any).style.height="173px";
      (this.$refs.itemBackground as any).style.width="173px";

      (this.$refs.itemСontainerTrash as any).classList.remove(`drop_${type}`);
      (this.$refs.itemTrash as any).style.height="60px";
      (this.$refs.itemTrash as any).style.width="60px";
    }
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

.game__animation {
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  width: 100%;
  height: 403px;
}

.game__item {
  position: absolute;
  top: 104px;
  left: 222px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 173px;
  height: 173px;
  border-radius: 50%;
  animation-duration: 3s;
  transition: transform 600ms;
}
.game__background {
    border-radius: 50%;
    width: 173px;
    height: 173px;
    background-color:red;
    transition: width 200ms, height 200ms;
}

.game__trash {
  border-radius: 50%;
  width: 60px;
  height: 60px;
  background-color:green;
  transition: width 200ms, height 200ms;
}

.game__item_animation {
  transition: transform 300ms !important;
}

.drop_yellow {
  transform: translate(-186px, 230px);
  -webkit-transform: translate(-186px, 230px);
  -o-transform: translate(-186px, 230px);
  -moz-transform: translate(-186px, 230px);
}

.drop_green {
  transform: translate(-64px, 230px);
  -webkit-transform: translate(-64px, 230px);
  -o-transform: translate(-64px, 230px);
  -moz-transform: translate(-64px, 230px);
}

.drop_blue {
  transform: translate(54px, 230px);
  -webkit-transform: translate(54px, 230px);
  -o-transform: translate(54px, 230px);
  -moz-transform: translate(54px, 230px);
}

.drop_red {
  transform: translate(172px, 230px);
  -webkit-transform: translate(172px, 230px);
  -o-transform: translate(172px, 230px);
  -moz-transform: translate(172px, 230px);
}


/* @keyframes drop {
  from {
    margin-left: 100%;
    width: 300%;
  }

  to {
    margin-left: 0%;
    width: 100%;
  }
} */

.game__stopwatch {
  position: absolute;
  top: 84px;
  left: 202px;
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
