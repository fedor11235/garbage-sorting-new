<template>
  <div class="scene">
    <div class="game">
      <div class="game__title">
        Выберите правильный бак для сортировки мусора
      </div>
      <ScoreLabel class="game__successful-attempts" type="ok" />
      <ScoreLabel class="game__unsuccessful-attempts" type="no" />
      <TimerItem class="game__stopwatch" />
      <div class="wasteboxes">
        <div>
          <div class="wasteboxes__title wasteboxes__title_yellow">
            Вторсырье
          </div>
          <WasteItem
            type="yellow"
            @item-drop="handlerItemDrop"
            :trash-active="trashActive"
          />
        </div>
        <div>
          <div class="wasteboxes__title wasteboxes__title_green">Смешанные</div>
          <WasteItem
            type="green"
            @item-drop="handlerItemDrop"
            :trash-active="trashActive"
          />
        </div>
        <div>
          <div class="wasteboxes__title wasteboxes__title_blue">Бытовые</div>
          <WasteItem
            type="blue"
            @item-drop="handlerItemDrop"
            :trash-active="trashActive"
          />
        </div>
        <div>
          <div class="wasteboxes__title wasteboxes__title_red">Опасные</div>
          <WasteItem
            type="red"
            @item-drop="handlerItemDrop"
            :trash-active="trashActive"
          />
        </div>
      </div>
      <TrashItem
        :key="renderComponent"
        :typeDrop="typeDrop"
        ref="trashItem"
        @trash-active="(e: boolean) => trashActive = e"
      />
    </div>
    <GameModal v-if="!gameProcessed" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";
import WasteItem from "@/components/WasteItem.vue";
import ScoreLabel from "@/components/ScoreLabel.vue";
import TimerItem from "@/components/TimerItem.vue";
import GameModal from "@/components/GameModal.vue";
import TrashItem from "@/components/TrashItem.vue";
import TypeDrop from "@/models/TypeDrop";

export default defineComponent({
  components: {
    WasteItem,
    ScoreLabel,
    TimerItem,
    GameModal,
    TrashItem,
  },
  data() {
    return {
      typeDrop: {} as TypeDrop,
      renderComponent: 0,
      trashActive: false,
    };
  },
  computed: {
    ...mapState(["gameProcessed", "timeDrop"]),
  },
  methods: {
    handlerItemDrop(e: TypeDrop): void {
      this.typeDrop = e;
      setTimeout(() => {
        this.renderComponent = this.renderComponent === 0 ? 1 : 0;
        this.typeDrop = {
          type: "",
          color: "",
        };
      }, this.timeDrop);
    },
  },
});
</script>

<style scoped>
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
  overflow: hidden;
  width: 606px;
  height: 486px;
  background: white;
  border-radius: 26px;
}

.game__title {
  width: 342px;
  color: #1a2674;
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
