import { rankingData } from "../services/ranking.js";
import { formatCurrency, formatPercentage } from "../utils/formatters.js";

export function createRankingSection(rankingData) {

    const bullishAverageFormatted = formatCurrency(rankingData.topBullish.bullishAverage);
    const volatilityFormatted = formatPercentage(rankingData.topVolatility.volatilityAverage);
    const ratioFormatted = formatPercentage(rankingData.topDominance.bullishRatio);

    return `
        <section class="mb-10">
            <h2 class="text-xl font-bold text-black tracking-tight mb-4 flex items-center gap-2">
                <span>🔥</span> Destaques do Mercado
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <!-- Card 1: Maior Alta / Cotação Mais Alta -->
                <div class="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
                    <div class="absolute -right-2 -top-2 w-20 h-20 bg-emerald-500/10 rounded-full blur-xl pointer-events-none"></div>
                    
                    <span class="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-2">
                        🚀 Maior Média de Alta
                    </span>
                    
                    <div class="flex justify-between items-baseline mb-1">
                        <h3 class="text-2xl font-black text-white">${rankingData.topBullish.name}</h3>
                        <span class="text-xs font-bold text-slate-400 bg-slate-800 px-2.5 py-1 rounded-lg">
                            ${rankingData.topBullish.coin}
                        </span>
                    </div>

                    <p class="text-sm text-slate-300 font-medium">
                        Média: <strong class="text-emerald-400">${bullishAverageFormatted}</strong>
                    </p>
                </div>

                <!-- Card 2: Maior Volatilidade -->
                <div class="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
                    <div class="absolute -right-2 -top-2 w-20 h-20 bg-amber-500/10 rounded-full blur-xl pointer-events-none"></div>

                    <span class="text-xs font-semibold text-amber-400 uppercase tracking-wider block mb-2">
                        ⚡ Maior Volatilidade
                    </span>

                    <div class="flex justify-between items-baseline mb-1">
                        <h3 class="text-2xl font-black text-white">${rankingData.topVolatility.name}</h3>
                        <span class="text-xs font-bold text-slate-400 bg-slate-800 px-2.5 py-1 rounded-lg">
                            ${rankingData.topVolatility.coin}
                        </span>
                    </div>

                    <p class="text-sm text-slate-300 font-medium">
                        Variação Média: <strong class="text-amber-400">${volatilityFormatted}</strong>
                    </p>
                </div>

                <!-- Card 3: Maior Dominância (Mais dias de Alta) -->
                <div class="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
                    <div class="absolute -right-2 -top-2 w-20 h-20 bg-cyan-500/10 rounded-full blur-xl pointer-events-none"></div>

                    <span class="text-xs font-semibold text-cyan-400 uppercase tracking-wider block mb-2">
                        👑 Maior Dominância
                    </span>

                    <div class="flex justify-between items-baseline mb-1">
                        <h3 class="text-2xl font-black text-white">${rankingData.topDominance.name}</h3>
                        <span class="text-xs font-bold text-slate-400 bg-slate-800 px-2.5 py-1 rounded-lg">
                            ${rankingData.topDominance.coin}
                        </span>
                    </div>

                    <p class="text-sm text-slate-300 font-medium">
                        Taxa de Alta: <strong class="text-cyan-400">${ratioFormatted}</strong>
                    </p>
                </div>
            </div>
        </section>
    `;
}