export function formatCurrency(value) {
    if (value === null) {
        return value;
    }
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

export function formatPercentage(value) {
    if (value === null) {
        return value;
    }
    return new Intl.NumberFormat('pt-BR', { style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value / 100);
}