<script setup>
import { computed, ref } from "vue";

let interval;

const time = ref(0);
const start = ref(false);
const inc = ref(1);

const hours = computed(() => Math.floor(time.value / 3600));
const minutes = computed(() =>
  Math.floor((time.value - hours.value * 3600) / 60)
);
const seconds = computed(() =>
  Math.floor(time.value - hours.value * 3600 - minutes.value * 60)
);

function handleStart() {
  if (!start.value) {
    start.value = true;
    interval = setInterval(() => {
      time.value = time.value + inc.value;
    }, 1000);
  } else {
    start.value = false;
    clearInterval(interval);
  }
}

function handleReset() {
  time.value = 0;
}
</script>

<template>
  <div>
    {{ String(hours).padStart(2, "0") }}:{{
      String(minutes).padStart(2, "0")
    }}:{{ String(seconds).padStart(2, "0") }}
  </div>
  <button type="button" @click="handleStart">
    {{ !start ? "Start" : "Pause" }}
  </button>
  <button type="button" @click="handleReset">Reset</button>
  <input v-model="inc" type="number" min="1" />
</template>
