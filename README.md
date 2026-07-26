# 🇺🇸​ 📈 Currency Bullish Trend Analyzer

A lightweight Node.js script designed to fetch parallel currency exchange rate histories (USD/BRL, EUR/BRL, BTC/BRL) and compute average closing prices specifically on bullish (positive percentage change) days.

## 🚀 Key Features

- **Concurrent Async Requests:** Fetches multiple endpoints in parallel using `Promise.all`.
- **Resilient Error Handling:** Validates HTTP response status before JSON parsing.
- **Pure Functional Pipeline:** Isolates data filtering, mapping, and reduction into single-responsibility functions.
- **Edge-Case Safe:** Prevents division-by-zero (`0/0`) errors when no bullish days exist in the period.
- **Native Localization:** Formats financial outputs with `Intl.NumberFormat`.

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Language:** JavaScript (ES6+)
- **APIs:** Fetch API, AwesomeAPI (Economy)

## 💻 Usage

```bash
node index.js
```
---
# 🇧🇷 📈 Analisador de Tendência de Alta de Moedas

Um script em Node.js projetado para consultar históricos de cotações em paralelo (USD/BRL, EUR/BRL, BTC/BRL) e calcular a média dos preços de fechamento especificamente nos dias com tendência de alta (variação percentual positiva).

## 🚀 Principais Funcionalidades

- **Requisições Assíncronas Concorrentes:** Busca múltiplos endpoints em paralelo utilizando `Promise.all`.
- **Tratamento de Erros Resiliente:** Valida o status da resposta HTTP antes de realizar o parse para JSON.
- **Pipeline Funcional Puro:** Isola o filtro, o mapeamento e a redução de dados em funções com responsabilidade única (SRP).
- **Tratamento de Edge Cases:** Previne erros de divisão por zero (`0/0`) caso não existam dias de alta no período consultado.
- **Formatação Nativa:** Formata os valores monetários utilizando `Intl.NumberFormat` para a moeda BRL.

## 🛠️ Tecnologias Utilizadas

- **Ambiente de Execução:** Node.js
- **Linguagem:** JavaScript (ES6+)
- **APIs:** Fetch API, AwesomeAPI (Economia)

## 💻 Como Executar

```bash
node index.js