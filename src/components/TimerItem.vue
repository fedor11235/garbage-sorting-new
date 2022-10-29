<template>
  <div class="stopwatch">
    <svg>
      <circle
        class="stopwatch__progress"
        ref="progressBar"
        stroke-linecap="round"
        :stroke="colorTime"
        stroke-width="18"
        cx="105"
        cy="105"
        :r="radius"
        fill="transparent"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import { mapState, mapMutations } from "vuex";
import { defineComponent } from "vue";

export default defineComponent({
  name: "TimerItem",
  data() {
    return {
      timeBegan: {} as Date,
      deadline: {} as Date,
      started: 0,
      diffMin: 1,
      colorTime: "#d09fed",
      radius: 95,
      circumference: 0,
      offset: "0",
      timeStart: 100,
      timeStop: 0.2,
      timeEndProgresBar: 1000,
    };
  },
  watch: {
    gameProcessed(val: boolean): void {
      if (val === true) {
        this.timeBegan = new Date();
        this.deadline = new Date(
          this.timeBegan.getFullYear(),
          this.timeBegan.getMonth(),
          this.timeBegan.getDate(),

          this.timeBegan.getHours(),
          this.timeBegan.getMinutes() + this.diffMin,
          this.timeBegan.getSeconds(),
          this.timeBegan.getMilliseconds()
        );
        this.started = setInterval(this.clockRunning, 1);
      }
    },
  },
  computed: {
    ...mapState(["gameProcessed"]),
  },
  mounted() {
    this.circumference = 2 * Math.PI * this.radius;
    (
      this.$refs.progressBar as SVGElement
    ).style.strokeDasharray = `${this.circumference} ${this.circumference}`;
    this.setProgress(this.timeStart);
  },
  methods: {
    ...mapMutations({
      gameStop: "GAME_STOP",
    }),
    setProgress(parcent: number): void {
      this.offset = String(
        this.circumference - (parcent / 100) * this.circumference
      );
      (this.$refs.progressBar as SVGElement).style.strokeDashoffset =
        this.offset;
      (this.$refs.progressBar as SVGElement).style.transform = `rotate(${
        -90 - parcent * 3.6
      }deg)`;
    },
    clockRunning(): void {
      let currentTime = new Date();

      let timeElapsed = new Date(+this.deadline - +currentTime);
      let sec: number = timeElapsed.getUTCSeconds();
      let ms: number = timeElapsed.getUTCMilliseconds();

      let parcent = (Number(String(sec) + "." + String(ms)) / 3) * 5;

      this.setProgress(parcent);
      if (parcent <= this.timeStop) {
        this.stop();
      }
    },
    stop(): void {
      this.gameStop();
      clearInterval(this.started);
      this.setProgress(this.timeStart);
      this.endingAnimation();
      this.timeBegan = {} as Date;
      this.deadline = {} as Date;
    },
    endingAnimation(): void {
      this.colorTime = "red";
      setTimeout(() => (this.colorTime = "#d09fed"), this.timeEndProgresBar);
    },
  },
});
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
