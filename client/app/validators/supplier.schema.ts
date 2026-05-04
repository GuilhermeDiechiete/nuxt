import * as v from 'valibot'

export const supplierSchema = v.object({
  type: v.picklist(['PF', 'PJ'], 'Selecione PF ou PJ'),

  company_name: v.pipe(
    v.string(),
    v.minLength(1, 'Razão social é obrigatória')
  ),

  trade_name: v.pipe(
    v.string(),
    v.minLength(1, 'Nome fantasia é obrigatório')
  ),

  document: v.pipe(
    v.string(),
    v.minLength(11, 'Documento inválido') // pode ajustar depois (CPF/CNPJ)
  ),

  // 🔽 opcionais
  email: v.optional(v.string()),
  phone: v.optional(v.string()),
  zip_code: v.optional(v.string()),
  street: v.optional(v.string()),
  number: v.optional(v.number()),
  city: v.optional(v.string()),
  state: v.optional(v.string()),
  country: v.optional(v.string()),
  pix_key: v.optional(v.string()),
  bank: v.optional(v.string()),
  agency: v.optional(v.string()),
  account: v.optional(v.string())
})

export type SupplierSchema = v.InferOutput<typeof supplierSchema>
