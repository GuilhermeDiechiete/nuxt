import * as v from 'valibot'

export const categorySchema = v.object({

  category: v.pipe(
    v.string(),
    v.minLength(2, 'Nome deve ter no mínimo 2 caracteres')
  ),
  transaction_type: v.pipe(
    v.string(),
    v.minLength(4, 'Nome deve ter no mínimo 4 caracteres')
  ),
  name: v.pipe(
    v.string(),
    v.minLength(2, 'Nome deve ter no mínimo 2 caracteres')
  ),
})

export type CategorySchema = v.InferOutput<typeof categorySchema>
