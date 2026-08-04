import { formatCurrency, formatPercentage } from '../utils/formatters.js'

export function createCurrencyCard(metric) {

    const isBullishDominant = metric.bullishDays >= metric.bearishDays;

    return `
        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl hover:border-slate-700 transition-all duration-300">
            <div class="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-5">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-slate-800 border p-8 border-slate-700/50 flex items-center justify-center font-bold text-slate-100 text-lg shadow-inner">
                        ${metric.coin.slice(0, 3)}
                    </div>
                    <div>
                        <h3 class="text-lg font-bold text-slate-100 tracking-tight">${metric.name}</h3>
                        <span class="text-xs font-medium text-slate-400">Cotação vs BRL</span>
                    </div>
                </div>
                <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${isBullishDominant
            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
            : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
        }">
                    ${isBullishDominant ? 'Tendência de Alta' : 'Tendência de Baixa'}
                </span>
            </div>
            <div class="grid grid-cols-2 gap-4 mb-5">
                <div class="bg-slate-950/50 rounded-xl p-3 border border-slate-800/50">
                    <span class="text-xs font-medium text-slate-400 block mb-1">Média Alta (Bullish)</span>
                    <span class="text-base font-semibold text-emerald-400">
                        ${formatCurrency(metric.bullishAverage)}
                    </span>
                    <span class="text-[11px] text-slate-400 block mt-0.5">${metric.bullishDays} dias de alta</span>
                </div>

                <div class="bg-slate-950/50 rounded-xl p-3 border border-slate-800/50">
                    <span class="text-xs font-medium text-slate-400 block mb-1">Média Baixa (Bearish)</span>
                    <span class="text-base font-semibold text-rose-400">
                        ${formatCurrency(metric.bearishAverage)}
                    </span>
                    <span class="text-[11px] text-slate-400 block mt-0.5">${metric.bearishDays} dias de baixa</span>
                </div>
            </div>
            <div class="space-y-2.5 text-xs text-slate-300">
                <div class="flex justify-between items-center py-1.5 border-b border-slate-800/40">
                    <span class="text-xs">Dominância Bullish</span>
                    <span class="font-medium text-slate-200">${formatPercentage(metric.bullishRatio)}</span>
                </div>

                <div class="flex justify-between items-center py-1.5 border-b border-slate-800/40">
                    <span class="text-xs">Volatilidade Média</span>
                    <span class="font-medium text-slate-200">${formatPercentage(metric.volatilityAverage)}</span>
                </div>

                <div class="flex justify-between items-center py-1.5 border-b border-slate-800/40">
                    <span class="text-xs">Spread Médio</span>
                    <span class="font-medium text-slate-200">${formatPercentage(metric.spreadAverage)}</span>
                </div>

                <div class="flex justify-between items-center pt-1 text-[16px]">
                    <span class="text-slate-400">Mín: <strong class="text-slate-300">${formatCurrency(metric.periodLow)}</strong></span>
                    <span class="text-slate-400">Máx: <strong class="text-slate-300">${formatCurrency(metric.periodHigh)}</strong></span>
                </div>
            </div>
        </div>
    `;
}