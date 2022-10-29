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
export default defineComponent({
    props: {
        type: String,
        trashActive: Boolean
    },
    data() {
        return {
            timeClosing: 300,
            trashTypes: [
                { 
                    type: 'yellow',
                    color: '#fad70b'
                }, { 
                    type: 'green',
                    color: '#8fcf13'
                }, {
                    type: 'blue',
                    color: '#0a61e7'
                }, {
                    type: 'red',
                    color: '#ce1227'
                }],
        }
    },
    methods: {
        handlerClick() {
            if (!this.trashActive) return
            (this.$refs.wastetop as any).style.bottom = '-10px'
            const itemDrop = this.trashTypes.find(e=>e.type == this.type)
            console.log(itemDrop, '!itemDrop')
            this.$emit('itemDrop', itemDrop)
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
  