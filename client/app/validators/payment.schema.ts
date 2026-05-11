import * as v from 'valibot'

export const paymentSchema = v.object({

  name: v.pipe(
    v.string(),
    v.minLength(4, 'Nome deve ter no mínimo 4 caracteres')
  ),

  transaction_type: v.pipe(
    v.string(),
    v.minLength(4, 'Nome deve ter no mínimo 4 caracteres')
  ),
  group: v.pipe(
    v.boolean()
  )
})

export type PaymentSchema = v.InferOutput<typeof paymentSchema>
