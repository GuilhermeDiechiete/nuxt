export interface Transaction {
  id: number
  group_id: number
  type: string
  date: string
  description: string
  category: string
  payment: string
  current_installment: number
  total_installment: number
  status: 'paid' | 'pending'
  amount: number
}