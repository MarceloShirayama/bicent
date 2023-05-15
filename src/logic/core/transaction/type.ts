export enum TransactionType {
    REVENUE = "revenue",
    EXPENSE = "expense"
}

export type Transaction = {
    id?: string
    description: string
    value: number
    date: Date
    type: TransactionType
}
