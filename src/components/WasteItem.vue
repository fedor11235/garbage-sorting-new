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
/* eslint-disable */
import { defineComponent } from "vue";
export default defineComponent({
    props: {
        type: String,
        // wastebox: String,
    },
    data() {
        return {
            timeClosing: 300,
        }
    },
    methods: {
        handlerClick() {
            (this.$refs.wastetop as any).style.bottom = '-10px'
            setTimeout(() => (this.$refs.wastetop as any).style.bottom = '-56px', this.timeClosing)
        }
    }
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
    cursor:pointer;
}

</style>
  