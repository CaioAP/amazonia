<template>
  <div class="board-container">
    <div class="board-height">
      <span v-for="height in boardHeight" :key="height">{{ height }}</span>
    </div>
    <div class="board">
      <template v-for="height in boardHeight" :key="height">
        <div v-for="(col, idx) in boardLength" :key="col" :class="{ odd: isOdd(height, idx) }" class="board-cell">
          <button class="btn-cell" :disable="allSelected || props.selected.includes(`${col}${height}`)"
            @click="select(col, height)">
            <span v-if="`${col}${height}` === selected[0]">Start</span>
            <span v-if="`${col}${height}` === selected[1]">Pickup</span>
            <span v-if="`${col}${height}` === selected[2]">End</span>
          </button>
        </div>
      </template>
    </div>
    <div class="board-length">
      <span v-for="length in boardLength" :key="length">{{ length }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from 'vue';

interface Props {
  selected: string[];
  maxSelected?: number;
}

const props = withDefaults(defineProps<Props>(), {
  selected: () => [],
  maxSelected: 3,
});
const emit = defineEmits(['select']);

let currentSelected = reactive<string[]>(props.selected);
const allSelected = computed(() => props.selected.length > 2);
const boardHeight = computed(() => [8, 7, 6, 5, 4, 3, 2, 1]);
const boardLength = computed(() => ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']);

watch(() => props.selected, (newValue) => {
  currentSelected = newValue;
})

function select(col: string, height: number) {
  const cell = `${col}${height}`;
  if (props.selected.length < props.maxSelected)
    currentSelected.push(cell);
  emit('select', currentSelected);
}

function isOdd(row: number, cell: number) {
  const oddRow = row % 2;
  const oddCell = cell % 2;
  return (oddRow && oddCell) || (!oddRow && !oddCell);
} 
</script>

<style scoped>
.board-container {
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
  width: 50%;
}

.board-height {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-right: 1rem;
  font-size: 1.25rem;
}

.board-length {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 0.5rem;
  margin-left: 1.5rem;
  font-size: 1.25rem;
}

.board {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr);
  width: calc(100% - 1.75rem);
}

.board-cell {
  padding-right: 3px;
}

.board-cell:hover .btn-cell {
  background: #ffffff88;
}

.board-cell.odd:hover .btn-cell {
  background: #00000088;
}

.btn-cell {
  min-width: 100%;
  min-height: 100%;
  aspect-ratio: 1/1;
  background: transparent;
  cursor: pointer;
  box-shadow: none;
  border: none;
  color: #EF0044;
  font-size: 1.25rem;
  font-weight: bold;
}

.board-cell .btn-cell {
  background-color: white;
}

.board-cell.odd .btn-cell {
  background-color: black;
}
</style>