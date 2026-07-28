# 🇺🇸 📈 Currency Metrics Analyzer

A clean, modular Node.js utility designed to fetch parallel historical currency exchange rates (USD/BRL, EUR/BRL, BTC/BRL) and calculate core market metrics using functional data pipelines.

## 🚀 Key Features

- **Concurrent Async Requests:** Fetches multiple endpoints in parallel using `Promise.all`.
- **Trend & Frequency Analysis:** Computes average closing prices and total day counts separately for bullish (`pctChange > 0`) and bearish (`pctChange < 0`) sessions.
- **Volatility Metrics:** Measures average daily percentage fluctuation using absolute variation.
- **Spread & Intra-Day Range:** Calculates average percentage spread between daily highs and lows.
- **Period Extremes:** Extracts absolute highest (`periodHigh`) and lowest (`periodLow`) prices across the period without initial-value pitfalls.
- **Pure Functional Pipelines:** Isolated helper functions for mapping, filtering, reducing, and sanitizing data (SRP).
- **Edge-Case Resilience:** Prevents `NaN` and division-by-zero (`0/0`) errors across empty arrays or extreme values.
- **Native Localization:** Formats outputs into BRL (`R$`) and percentages (`%`) using `Intl.NumberFormat`.

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Language:** JavaScript (ES6+)
- **APIs:** Fetch API, AwesomeAPI (Economy)

## 💻 Usage

```bash
node index.js
```
---



# 📈 Analisador de Métricas do Mercado de Moedas

Um script em Node.js limpo e modular projetado para consultar históricos de cotações em paralelo (USD/BRL, EUR/BRL, BTC/BRL) e calcular métricas essenciais do mercado utilizando pipelines funcionais.

## 🚀 Principais Funcionalidades

- **Requisições Assíncronas Concorrentes:** Busca múltiplos endpoints em paralelo utilizando `Promise.all`.
- **Análise de Tendência e Frequência:** Calcula a média dos preços de fechamento e a contagem total de dias separadamente para sessões de alta (`pctChange > 0`) e de baixa (`pctChange < 0`).
- **Métricas de Volatilidade:** Mede a oscilação percentual média diária utilizando a variação absoluta.
- **Spread & Amplitude Diária:** Calcula o spread percentual médio entre a máxima e a mínima de cada dia.
- **Extremos do Período:** Extrai a máxima absoluta (`periodHigh`) e a mínima absoluta (`periodLow`) do período sem problemas de inicialização de tipo.
- **Pipelines Funcionais Puros:** Funções utilitárias isoladas para mapeamento, filtragem, redução e higienização de dados (Princípio da Responsabilidade Única).
- **Resiliência a Edge Cases:** Previne erros de `NaN` e divisão por zero (`0/0`) em arrays vazios ou conjuntos de dados atípicos.
- **Formatação Nativa:** Exibe relatórios formatados em moeda nacional (`R$`) e porcentagem (`%`) via `Intl.NumberFormat`.

## 🛠️ Tecnologias Utilizadas

- **Ambiente de Execução:** Node.js
- **Linguagem:** JavaScript (ES6+)
- **APIs:** Fetch API, AwesomeAPI (Economia)

## 💻 Como Executar

```bash
node index.js
```
