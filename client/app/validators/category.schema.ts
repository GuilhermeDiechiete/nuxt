import * as v from 'valibot'

export const categorySchema = v.object({

  name: v.pipe(
    v.string(),
    v.minLength(4, 'Nome deve ter no mínimo 4 caracteres')
  ),

  type: v.pipe(
    v.string(),
    v.minLength(4, 'Nome deve ter no mínimo 4 caracteres')
  ),
})

export type CategorySchema = v.InferOutput<typeof categorySchema>
