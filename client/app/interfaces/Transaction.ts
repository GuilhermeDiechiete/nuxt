export interface Transaction {
  id: number
  group_id: number
  type: 'inputs' | 'outputs'
  date: string
  description: string
  category: string
  payment: string
  current_installment: number
  total_installment: number
  status: 'paid' | 'pending'
  amount: number
}

export interface CreateTransaction {
  type: 'inputs' | 'outputs'
  date: string
  description: string
  category: string
  payment: string
  current_installment: number
  total_installment: number
  status: 'paid' | 'pending'
  amount: number
}