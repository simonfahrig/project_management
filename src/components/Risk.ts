export interface RiskSpec{
    worstPenalty: number,
    mostlikelyPenalty: number,
    bestPenalty: number,
    probability: number,
    isFatal: boolean,
    timePenaltyInMonths: number,
    timePenaltyPercenage: number,
}

export interface Risk {
id: number
title: string,
description: string,
status: boolean,
isBinaryRisk: boolean,
riskSpec: RiskSpec,
}