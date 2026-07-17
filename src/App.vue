<script setup lang="ts">
import { ref, computed } from 'vue'
import VueMermaidString from 'vue-mermaid-string'
import Riskology from './views/Riskology.vue'

const text = ref("no node")
const diagram = computed(() => 'graph BT\n  E(Ebene) --> L(Land)\nE --> A(AnderesLand)\nclick E\nclick L\nclick A')
function nodeClick(nodeId: string) {
  text.value = nodeId;
  console.log(nodeId)
}
</script>
<template>
  <h1>Risikomanagement</h1>
  <Riskology />
</template>

<style scoped></style>
