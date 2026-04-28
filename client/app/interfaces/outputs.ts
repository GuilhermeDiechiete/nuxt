export interface Output {
  id: string
  date: string
  description: string
  category: string
  payment: string
  current_installment: number
  total_installment: number
  status: 'paid' | 'pending'
  amount: number,
  futures: boolean
}