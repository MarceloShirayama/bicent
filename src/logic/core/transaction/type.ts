export enum TransactionType {
    REVENUE = "receita",
    EXPENSE = "despesa"
}

export type Transaction = {
    id?: string
    description: string
    value: number
    date: Date
    type: TransactionType
}
