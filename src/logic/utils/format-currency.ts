export class FormatCurrency {
    private static _language = 'pt-BR'
    private static _currency = 'BRL'

    static format(num: number): string {
        return (num ?? 0).toLocaleString(FormatCurrency._language, {
            style: "currency", currency: FormatCurrency._currency
        })
    }
}