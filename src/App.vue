<script setup lang="ts">
import { ref, computed } from 'vue'
import VueMermaidString from 'vue-mermaid-string'
const text = ref("no node")
const diagram = computed(() => 'graph BT\n  E(Ebene) --> L(Land)\nE --> A(AnderesLand)\nclick E\nclick L\nclick A')
function nodeClick(nodeId:string){
  text.value = nodeId;
  console.log(nodeId)
}
</script>
<template>
  <h1>You did it!</h1>
  <p>
    Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
    documentation
  </p>
  <vue-mermaid-string :value="diagram" @node-click="nodeClick"/>
  <p>{{ text }}</p>
</template>

<style scoped></style>
