<template>
  <div class="trash">
    <div class="trash__item" ref="itemСontainerBackground">
      <div
        class="trash__background"
        ref="itemBackground"
        :style="{backgroundColor: typeDrop.color as string}"
      ></div>
    </div>
    <div class="trash__item trash__item_animation" ref="itemСontainerTrash">
      <div
        class="trash__content"
        ref="itemTrash"
        :style="{backgroundColor: typeType.color as string}"
      >
        {{ typeType.text }}
      </div>
    </div>
    <div v-show="success == 'ok'" class="trash__item">
      <div class="trash__result trash__result_color-ok" ref="itemResultOk">
        <img class="trash__result__img" src="@/assets/img/ok.png" />
      </div>
    </div>
    <div v-show="success == 'no'" class="trash__item">
      <div class="trash__result trash__result_color-no" ref="itemResultNo">
        <img class="trash__result__img" src="@/assets/img/no.png" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapMutations, mapState } from "vuex";
import TypeDrop from "@/models/TypeDrop";
import TrashType from "@/models/TrashType";
export default defineComponent({
  props: {
    typeDrop: {
      type: Object as () => TypeDrop,
      required: true,
    },
  },
  data() {
    return {
      timeStart: 1,
      active: false,
      typeType: {} as TrashType,
      success: "",
      backgroundSize: "173px",
      trashSize: "80px",
      resultDeley: 200,
      dropSize: "20px",
    };
  },
  watch: {
    typeDrop(): void {
      this.animationItemStart();
      setTimeout(() => {
        this.animationItemEnd();
      }, this.timeDrop);
    },
  },
  computed: {
    ...mapState(["timeDrop", "trashTypes"]),
  },
  mounted() {
    setTimeout(() => {
      (this.$refs.itemBackground as HTMLDivElement).style.height =
        this.backgroundSize;
      (this.$refs.itemBackground as HTMLDivElement).style.width =
        this.backgroundSize;

      (this.$refs.itemTrash as HTMLDivElement).style.height = this.trashSize;
      (this.$refs.itemTrash as HTMLDivElement).style.width = this.trashSize;

      this.active = true;
      this.$emit("trashActive", this.active);
      this.typeType = this.trashRandomTypeGeneration();
    }, this.timeStart);
  },
  methods: {
    ...mapMutations({
      scoreIncrementSuccessfull: "SCORE_INCREMENT_SUCCESSFUL",
      scoreIncrementUnsuccessfull: "SCORE_INCREMENT_UNSUCCESSFUL",
    }),
    animationItemStart(): void {
      this.active = false;
      this.$emit("trashActive", this.active);
      if (this.typeDrop.type === this.typeType.type) {
        this.scoreIncrementSuccessfull();
        setTimeout(() => (this.success = "ok"), this.resultDeley);
      } else {
        this.scoreIncrementUnsuccessfull();
        setTimeout(() => (this.success = "no"), this.resultDeley);
      }

      (this.$refs.itemСontainerBackground as HTMLDivElement).classList.add(
        `drop_${this.typeDrop.type}`
      );
      (this.$refs.itemBackground as HTMLDivElement).style.height =
        this.dropSize;
      (this.$refs.itemBackground as HTMLDivElement).style.width = this.dropSize;

      (this.$refs.itemСontainerTrash as HTMLDivElement).classList.add(
        `drop_${this.typeDrop.type}`
      );
      (this.$refs.itemTrash as HTMLDivElement).style.height = this.dropSize;
      (this.$refs.itemTrash as HTMLDivElement).style.width = this.dropSize;
    },
    animationItemEnd(): void {
      this.active = true;
      this.$emit("trashActive", this.active);
    },
    trashRandomTypeGeneration(): TrashType {
      return this.trashTypes[
        Math.floor(Math.random() * this.trashTypes.length)
      ];
    },
  },
});
</script>

<style scoped>
.trash {
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  width: 100%;
  height: 403px;
}

.trash__item {
  position: absolute;
  top: 102px;
  left: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 173px;
  height: 173px;
  border-radius: 50%;
  animation-duration: 3s;
  transition: transform 600ms;
}
.trash__background {
  border-radius: 50%;
  width: 10px;
  height: 10px;
  background-color: #f8f8f8;
  transition: width 200ms, height 200ms;
}

.trash__content {
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  font-weight: 600;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  transition: width 200ms, height 200ms;
}

.trash__item_animation {
  transition: transform 300ms !important;
}

.trash__result {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 87px;
  width: 87px;
  border-radius: 50%;
  transition: width 400ms, height 400ms;
}

.trash__result_color-ok {
  background-color: #11ef79;
  transition: width 400ms, height 400ms;
}

.trash__result_color-no {
  background-color: #ff5c5e;
  transition: width 400ms, height 400ms;
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
