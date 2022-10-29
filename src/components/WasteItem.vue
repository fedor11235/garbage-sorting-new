<template>
  <div class="waste">
    <img
      class="wastetop"
      ref="wastetop"
      :src="require(`@/assets/img/bucks/buck_top/wastetop_${type}.png`)"
      :alt="`wastetop_${type}`"
    />
    <img
      class="wastebox"
      ref="wastebox"
      :src="require(`@/assets/img/bucks/wastebox_${type}.png`)"
      :alt="`wastebox_${type}`"
      @click="handlerClick"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";
import TrashType from "@/models/TrashType";
export default defineComponent({
  props: {
    type: {
      type: String,
      required: true,
    },
    trashActive: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      timeClosing: 300,
    };
  },
  computed: {
    ...mapState(["trashTypes"]),
  },
  methods: {
    handlerClick(): void {
      if (this.trashActive) {
        (this.$refs.wastetop as HTMLDivElement).style.bottom = "-10px";
        const itemDrop = this.trashTypes.find(
          (e: TrashType) => e.type == this.type
        );
        this.$emit("itemDrop", itemDrop);
        setTimeout(
          () =>
            ((this.$refs.wastetop as HTMLDivElement).style.bottom = "-56px"),
          this.timeClosing
        );
      }
    },
  },
});
</script>

<style>
.waste {
  position: relative;
  width: 112px;
}

.wastetop {
  position: absolute;
  bottom: -56px;
  left: calc(50% - 46px);
  width: 86px;
  margin: 4px;
  transition: bottom 300ms;
}
.wastebox {
  position: absolute;
  width: 112px;
  cursor: pointer;
}
</style>
