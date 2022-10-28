<template>
<div class="stopwatch">
    <svg>
        <circle class="stopwatch__progress" ref="progressBar" stroke-linecap="round" :stroke="colorTime" stroke-width="18" cx="105" cy="105" :r="radius" fill="transparent" />
    </svg>
    <div class="stopwatch__back" @click="handlerClick">
        <div class="stopwatch__background" ref="itemBackground"></div>
    </div>
</div>
</template>

<script lang="ts">
import { mapState, mapMutations } from 'vuex'
import { defineComponent } from "vue";

export default defineComponent({
name: 'StopwatchItem',
data() {
    return {
        timeBegan: '' as any,
        deadline: '' as any,
        started: 0,
        time: '01:00.000',
        diffMin: 1,
        colorTime: '#d09fed',

        radius: 95,
        circumference: 0,
        offset: 0
    }
},
watch: {
    gameProcessed(val) {
        if(val) {
            this.timeBegan = new Date();
            this.deadline = new Date(
                this.timeBegan.getFullYear(), 
                this.timeBegan.getMonth(),
                this.timeBegan.getDate(),

                this.timeBegan.getHours(),
                this.timeBegan.getMinutes() + this.diffMin,
                this.timeBegan.getSeconds(),
                this.timeBegan.getMilliseconds()
            )
            
            this.started = setInterval(this.clockRunning, 10);
        }
    }
},
computed: {
    ...mapState(['gameProcessed'])
},
mounted() {
    this.circumference = 2 * Math.PI * this.radius;
    (this.$refs.progressBar as any).style.strokeDasharray = `${this.circumference} ${this.circumference}`
    this.setProgress(100)
},
methods: {
    ...mapMutations({
      gameStop: 'GAME_STOP'
    }),
    setProgress(parcent: number) {
        this.offset = this.circumference - parcent / 100 * this.circumference;
        (this.$refs.progressBar as any).style.strokeDashoffset = this.offset ;
        (this.$refs.progressBar as any).style.transform = `rotate(${-90 - (parcent*3.6)}deg)`;
    },
    clockRunning(){
        let currentTime = new Date()

        let timeElapsed = new Date(this.deadline - (currentTime as any))
        let min: number  = timeElapsed.getUTCMinutes()
        let sec: number = timeElapsed.getUTCSeconds()
        let ms: number  = timeElapsed.getUTCMilliseconds()

        let parcent = (sec + ('.' as any) + ms ) / 3 * 5

        this.setProgress(parcent)
        if(parcent <= 0.2) {
            this.stop()
            return
        }

        this.time = 
            this.zeroPrefix(min, 2) + ":" + 
            this.zeroPrefix(sec, 2) + "." + 
            this.zeroPrefix(ms, 3);
    },
    stop() {
        this.gameStop();
        this.timeBegan = null
        clearInterval(this.started);
        this.time = '01:00.000'
        this.setProgress(100)
        this.endingAnimation()
    },
    zeroPrefix(num: number, digit: number) {
        var zero = '';
        for(var i = 0; i < digit; i++) {
            zero += '0';
        }
        return (zero + num).slice(-digit);
    },
    endingAnimation() {	
        this.colorTime =  'red'
        setTimeout(() => this.colorTime =  'white', 1000)
    },
    handlerClick() {
        (this.$refs.itemBackground as any).style.width="173px";
        (this.$refs.itemBackground as any).style.height="173px";
    }
}
})
</script>

<style scoped>
.stopwatch {
    display: flex;
    width: 210px;
    height: 210px;
    color: #fafafa;
    border-radius: 50%;
}

.stopwatch__progress {
    position: absolute;
    transform-origin: center;
    transform: rotate(-90deg);
    transition: stroke-dashoffset 1s, transform 1s;
}

.stopwatch__time {
    position: absolute;
    top: calc(50% - 40px);
    left: calc(50% - 72px);
}
</style>