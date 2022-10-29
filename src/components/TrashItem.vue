<template>
<div class="trash">
    <div class="trash__item" ref="itemСontainerBackground">
        <div class="trash__background" ref="itemBackground" :style="{backgroundColor: typeDrop.color as any}"></div>
    </div>
    <div class="trash__item trash__item_animation" ref="itemСontainerTrash">
        <div class="trash__content" ref="itemTrash" :style="{backgroundColor: typeType.color as any}" >
            {{typeType.text}}
        </div>
    </div>
</div>
</template>

<script lang="ts">
interface TypeDrop {
    type: String;
    color: String;
}
import { defineComponent } from "vue";
export default defineComponent({
    props: {
        typeDrop: {
            type: Object as () => TypeDrop,
            required: true
        }
    },
    data() {
        return {
            trashTypes: [
                { 
                    text: 'Вторсырье',
                    type: 'yellow',
                    color: '#fad70b'
                }, { 
                    text: 'Смешанные',
                    type: 'green',
                    color: '#8fcf13'
                }, {
                    text: 'Бытовые',
                    type: 'blue',
                    color: '#0a61e7'
                }, {
                    text: 'Опасные',
                    type: 'red',
                    color: '#ce1227'
                }],
            timeDrop: 600,
            timeStart: 1,
            active: false,
            typeType: {} as {
                text: String,
                type: String,
                color: String
            },
        }
    },
    watch: {
        typeDrop() {
            this.animationItemStart()
            setTimeout(() => { this.animationItemEnd() }, this.timeDrop);
        }
    },
    mounted() {
        setTimeout(() => {
            (this.$refs.itemBackground as any).style.height="173px";
            (this.$refs.itemBackground as any).style.width="173px";

            (this.$refs.itemTrash as any).style.height="80px";
            (this.$refs.itemTrash as any).style.width="80px";

            this.active = true
            this.$emit('trashActive', this.active)
            this.typeType = this.trashRandomTypeGeneration()
        }, this.timeStart);
    },
    methods: {
        trashRandomTypeGeneration() {
            return this.trashTypes[Math.floor(Math.random() * this.trashTypes.length)]
        },
        animationItemStart() {
            this.active = false;
            this.$emit('trashActive', this.active);
            if (this.typeDrop.type === this.typeType.type) {
                this.$store.commit('SCORE_INCREMENT_SUCCESSFUL')
            } else {
                this.$store.commit('SCORE_INCREMENT_UNSUCCESSFUL')
            }
            (this.$refs.itemСontainerBackground as any).classList.add(`drop_${this.typeDrop.type}`);
            (this.$refs.itemBackground as any).style.height="10px";
            (this.$refs.itemBackground as any).style.width="10px";

            (this.$refs.itemСontainerTrash as any).classList.add(`drop_${this.typeDrop.type}`);
            (this.$refs.itemTrash as any).style.height="10px";
            (this.$refs.itemTrash as any).style.width="10px";
        },
        animationItemEnd() {
            this.active = true
            this.$emit('trashActive', this.active)
        },
    }
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
    background-color:#f8f8f8;
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
