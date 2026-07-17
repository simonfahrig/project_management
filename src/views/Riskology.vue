<script setup lang="ts">
import { onMounted, reactive, ref, watch, provide, computed } from 'vue'
import Histogramm from './Histogramm.vue'
import type { Risk, RiskSpec } from './../components/Risk.ts'

const projectName = ref("Gebiete App")
const startDate = ref(new Date(2026, 6).toISOString().substr(0, 10))
const endDate = ref(new Date(2027, 6).toISOString().substr(0, 10))
const risks = reactive<Risk[]>([
    {
        id: 1,
        title: "Fehlerhafter Zeitplan",
        description: 'Fehler - oder völliges Versagen - bei der Planung des Zeit- und Arbeitsaufwands. Der Umfang dees Projekts wurde falsch eingeschätzt.',
        status: true,
        isBinaryRisk: false,
        riskSpec: {
            worstPenalty: 55,
            mostlikelyPenalty: 5,
            bestPenalty: 0,
            probability: null,
            isFatal: null,
            timePenaltyInMonths: null,
            timePenaltyPercenage: null,
        },
    },
])

const cancelled = ref(0)
const runs = ref(1000)
const simulation = ref<number[] | null>(null)
const median = ref<string>("")
const cancellationRisk = computed(() => {
    return Math.floor(cancelled.value * 1000.0 / (simulation.value - length + cancelled.value)) / 10
})

simulateRun(runs.value)

const renderKey = ref(0)
provide('simulation', simulation)

function calculate() {
    simulateRun(runs.value)
    renderKey.value++
}

function simulateRun(size: number) {
    const nextSimulation = [...Array(size).keys()].map(i => getOverallMultiplyer())
    cancelled.value = nextSimulation.filter(s => s == 0).length
    simulation.value = nextSimulation.filter(s => s > 0)
    const reverseCancelled = nextSimulation.map(s => s == 0 ? 999 : s)
    median.value = getMedian(reverseCancelled)
}

function getMedian(array: number[]): number {
    const sorted = [...array].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    // If even, average the two middle numbers; if odd, return the middle
    const medianFactor = sorted.length % 2 == 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
    const start = new Date(startDate.value);
    const end = new Date(endDate.value);
    const originalPeriod = end.getTime() - start.getTime()
    const medianDays = start.getTime() + (medianFactor * originalPeriod)
    const medianDate = new Date(medianDays)
    return isNaN(medianDate) ? "NaN" : medianDate.toISOString().substr(0, 10)
}

function getOverallMultiplyer(): number {
    let multiplyer = 1
    for (const risk of risks) {
        if (risk.status) {
            if (risk.isBinaryRisk) {
                multiplyer *= getMultiplyerBinary(risk, Math.random())
            } else {
                multiplyer *= getMultiplyer(risk, Math.random())
            }
        }
    }
    return multiplyer
}

function getMultiplyer(risk: Risk, rand: number): number {
    let T34 = 1 + (risk.riskSpec.worstPenalty * 1.0 / 100)
    let T35 = 1 + (risk.riskSpec.mostlikelyPenalty * 1.0 / 100)
    let T36 = 1 + (risk.riskSpec.bestPenalty * 1.0 / 100)
    let T40 = T35 - T36
    let T41 = T34 - T35
    let T42 = T40 / (T40 + T41)
    let T43 = 1 - T42

    let K28 = rand;
    let L28 = K28 > T42 ? T42 : K28
    let M28 = K28 > T42 ? K28 - T42 : 0
    let N28 = K28 > T42 ? T35 : T36 + T40 * Math.sqrt(K28 / T42)
    let O28 = M28 == 0 ? 0 : T41 * (1 - Math.sqrt((T43 - M28) / T43))
    return O28 + N28
}

function getMultiplyerBinary(risk: Risk, rand: number): number {
    const occurs = rand < (risk.riskSpec.probability * 0.01)
    if (!occurs) {
        return 1
    }

    if (risk.riskSpec.isFatal) {
        return 0
    } else {
        const start = new Date(startDate.value);
        const end = new Date(endDate.value);
        const originalPeriod = end.getTime() - start.getTime()
        const factor = (originalPeriod + risk.riskSpec.timePenaltyInMonths * 2629746000) / originalPeriod // avg month has 2629746000 miliseconds
        return factor
    }
}
</script>

<template>
    <div class="container">
        <div class="row">
            <!-- Linke Spalte -->
            <div class="col-1g-6">
                <h3>Project Details</h3>
                <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text" id="addon-wrapping">Project Name</span>
                    <input v-model="projectName" type="text" class="form-control" placeholder="Whizbang"
                        aria-label="Project Name" aria-describedby="addon-wrapping">
                </div>
                <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text" id="addon-wrapping">Project start date</span>
                    <input v-model="startDate" type="date" class="form-control" aria-label="StartDate"
                        aria-describedby="addon-wrapping">
                    <span class="input-group-text" id="addon-wrapping">Most optimistic end date</span> <input
                        v-model="endDate" type="date" class="form-control" aria-label="EndDate"
                        aria-describedby="addon-wrapping">

                </div>
                <div class="d-flex w-100 justify-content-between">
                    <h3>Project Simulation ({{ simulation!.length + cancelled }} Runs)</h3>
                </div>
                <Histogramm :projectName="projectName" :startDate="startDate" :endDate="endDate" :cancelled="cancelled"
                    :key="renderKey" />
                <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text" id="addon-wrapping">Runs</span>
                    <input v-model="runs" type="number" class="form-control" placeholder="Whizbang"
                        aria-label="Project Name" aria-describedby="addon-wrapping">
                    <button type="button" class="btn btn-primary" @click="calculate">Recalculate</button>
                </div>
                <div class="d-flex w-100 justify-content-between">
                    <h4>Most Likely Completion Date</h4>
                    <h4>{{ median }}</h4>
                </div>
                <div class="d-flex w-100 justify-content-between">
                    <h4>Cancellation Risk:</h4>
                    <h4>{{ cancelllationRisk }} %</h4>
                </div>
            </div>

            <!-- Rechte Spalte -->
            <div class="col-1g-6">
                <h3>Risks</h3>
                <ul class="list-group" style="overflow: scroll; max-height:700px">
                    <a href="#" class="list-group-item" v-for="risk in risks" :key="risk.id">
                        <!-- <div class="container"> -->
                        <div class="row">
                            <div class="col-1">
                                <input class="form-check-input me-1" type="checkbox" value="" v-model="risk.status">
                            </div>
                            <div class="col-11">
                                <!-- </div> -->
                                <div class="d-flex w-100 justify-content-between">

                                    <div class="d-flex">
                                        <input class="form-check-input me-1" type="checkbox" value="isBinary"
                                            :id="risk.title" v-model="risk.isBinaryRisk">
                                        <label :for="risk.title" class="me-4">binary risk</label>
                                        <button type="button" class="btn-close" aria-label="Close"></button>
                                    </div>
                                </div>
                                <p class="mb-1" :class="{ 'text-muted': risk.status == false }">{{ risk.description }}
                                </p>
                                <div v-if="risk.isBinaryRisk" class="input-group input-group-sm">
                                    <span class="input-group-text">Probability (%):</span>
                                    <input type="number" class="form-control" v-model="risk.riskSpec.probability">
                                    <span class="input-group-text" v-if="!risk.riskSpec.isFatal">penalty (months)</
                                            span>
                                        <input type="number" class="form-control"
                                            v-model="risk.riskSpec.timePenaltyInMonths" v-if="!risk.riskSpec.isFatal">
                                        <span class="input-group-text" v-if="!risk.riskSpec.isFatal">penalty (%)</span>
                                        <input type="number" class="form-control"
                                            v-model="risk.riskSpec.timePenaltyPercenage" v-if="!risk.riskSpec.isFatal">
                                        <div class="input-group-text">
                                            <input class="form-check-input me-1" type="checkbox" value=""
                                                aria-label="Checkbox for following text input"
                                                v-model="risk.riskSpec.isFatal">fatal risk
                                        </div>
                                </div>
                                <div v-else="risk.isBinaryRisk" class="input-group input-group-sm">
                                    <span class="input-group-text">Optimistic (%):</span>
                                    <input type="number" class="form-control" v-model="risk.riskSpec.bestPenalty">
                                    <span class="input-group-text">Most Likely (%):</span>
                                    <input type="number" class="form-control" v-model="risk.riskSpec.mostlikelyPenalty">
                                    <span class="input-group-text">Pessimistic (%):</span>
                                    <input type="number" class="form-control" v-model="risk.riskSpec.worstPenalty">
                                </div>
                            </div>
                        </div>
                    </a>
                </uL>
                <button type="button" class="btn btn-primary"> + Add Risk</button>
            </div>
        </div>
    </div>

</template>