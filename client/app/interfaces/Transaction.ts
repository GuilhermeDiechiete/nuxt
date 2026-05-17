export interface Transaction {
  id: number
  group_id: number
  transaction_type: 'inputs' | 'outputs'
  date: string
  description: string
  category: string
  category_name: string
  supplier: string
  payment: string
  current_installment: number
  total_installment: number
  status: 'paid' | 'pending'
  amount: number
}

export interface CreateTransaction {
  transaction_type: 'inputs' | 'outputs'
  date: string
  description: string
  category: string
  category_name: string
  supplier: string
  payment: string
  current_installment: number
  total_installment: number
  status: 'paid' | 'pending'
  amount: number
}

export interface TransactionGroup {
  id: number
  category: string
  month: string
  description: string
  current_installment: number,
  total_installment: number,
  amount: number
  date: string
}