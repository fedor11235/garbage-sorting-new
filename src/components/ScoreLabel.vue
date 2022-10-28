<template>
    <div class="score" :style="{backgroundColor: selectColor}">
        <img class="score__img" :src="require(`@/assets/img/${type}.png`)" :alt="type" />
        {{selectScore}}
    </div>
</template>

<script lang="ts">
/* eslint-disable */
import { defineComponent } from "vue";
import { mapState, mapMutations } from "vuex";

export default defineComponent({
    props: {
        type: String,
        color: String,
    },
    computed: {
        selectColor() {
            if (this.type === 'ok') {
                return '#aadd65'
            }
            if (this.type === 'no') {
                return '#d10079'
            }
        },
        selectScore() {
            if (this.type === 'ok') {
                return this.$store.state.scoreSuccessful
            }
            if (this.type === 'no') {
                return this.$store.state.scoreUnsuccessful
            }
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
  