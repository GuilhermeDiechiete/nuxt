import * as v from 'valibot'

export const transactionSchema = v.pipe(
  v.object({
    type: v.picklist(['inputs', 'outputs'], 'Tipo inválido'),

    date: v.pipe(
      v.string(),
      v.minLength(1, 'Data é obrigatória')
    ),

    description: v.pipe(
      v.string(),
      v.minLength(3, 'Descrição deve ter no mínimo 3 caracteres')
    ),

    category: v.pipe(
      v.string(),
    ),
    supplier: v.pipe(
      v.string(),
    ),

    payment: v.pipe(
      v.union([v.string(), v.number()]),
      v.custom((value) => !!value, 'Forma de pagamento é obrigatória')
    ),

    current_installment: v.pipe(
      v.number(),
      v.minValue(1, 'Parcela atual deve ser no mínimo 1')
    ),

    total_installment: v.pipe(
      v.number(),
      v.minValue(1, 'Total de parcelas deve ser no mínimo 1')
    ),

    status: v.picklist(['pending'], 'Status inválido'),

    amount: v.pipe(
      v.number(),
      v.minValue(0.01, 'Valor deve ser maior que zero')
    )
  }),

  // 👇 validação entre parcelas
  v.forward(
    v.partialCheck(
      [['current_installment'], ['total_installment']],
      (input) => input.current_installment <= input.total_installment,
      'Parcela atual não pode ser maior que o total'
    ),
    ['current_installment']
  )
)

export type TransactionSchema = v.InferOutput<typeof transactionSchema>