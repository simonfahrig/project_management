<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, inject } from 'vue'
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'
import type { ChartItem } from 'chart.js'

const props = defineProps(["projectName", "startDate", "endDate", "cancelled"])

// 1. Chart.js Komponenten registrieren (Tree-Shaking)
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend)
const chartInstance = ref<Chart>(null)
const histogramCanvas = ref<ChartItem>(null)

// Beispieldaten
const rawData = inject<number[]>('simulation')

onMounted (() => {
    const array: number[] = rawData?.value
    const min = Math.min.apply(null, array)
    const max = Math.max.apply(null, array)

    // Histogramm-Daten manuell berechnen (Bins/Intervalle)
    const binsCount = Math.min.apply(null,[Math.max.apply(null, [(array.length / 100), 10]), 40])
    const binSize = (min == max)? 1 : (max - min) / binsCount

    // Labels füllen
    const start = new Date(props.startDate);
    const end = new Date(props.endDate);
    const originalPeriod = end.getTime() - start.getTime()
    const earlyEnd = start.getTime() + (min * originalPeriod)
    const lateEnd = start.getTime() + (max * originalPeriod)

    const totalDuration = lateEnd - earlyEnd
    const intervalSize = totalDuration / binsCount
    const binLabels: string[] = new Array(binsCount)
    for (let i = 0; i <= binsCount; i ++) { 
        const labelDays = earlyEnd + (i * intervalSize)
        const labelDate = new Date(labelDays)
        binLabels[i] = isNaN(labelDate) ? "NaN" : labelDate.toISOString().split('T')[0]
    }

    // Daten einsortieren
    const bins: number[] = Array<number>(binsCount).fill(0)
    array.forEach(val => {
        const binNumber = Math.floor((val - min) / binSize)
        bins[binNumber]++
    })

    // Add cancellation bin
    binLabels.push("")
    binLabels.push("Cancelled")
    bins.push(0)
    bins.push(props.cancelled)

    // 3. Chart direkt auf dem Canvas-Element instanziieren
    chartInstance.value = new Chart(histogramCanvas.value, {
        type: 'bar',
        data: {
            labels: binLabels,
            datasets: [{
                label: 'Häufigkeit',
                data: bins,
                backgroundColor: '#42b883',
                borderColor: '#35495e',
                borderWidth: 1,
                // Wichtig für Histogramm-Optik: Lücken zwischen Balken entfernen
                barPercentage: 1.0,
                categoryPercentage: 1.0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { title: { display: true, text: 'Completion Date' } },
                y: { title: { display: true, text: 'Number of Instances in Range' }, beginAtZero: true }
            }
        }
    })
})

// Speicherleck verhindern, wenn Komponente zerstört wird 
onBeforeUnmount(() => {
    if (chartInstance.value) {
        chartInstance.value.destroy()
    }
})
</script>

<template>
<div class="chart-container">
  <canvas ref="histogramCanvas"></canvas>
</div>
</template>

<style scoped>
.chart-container {
    max-width: 600px;
    margin: 0 auto;
    height: 400px;
}
</style>