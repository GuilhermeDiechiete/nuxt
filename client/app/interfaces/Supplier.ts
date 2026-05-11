export interface Supplier {
  id: number

  // Informações Basicas
  type: string // Fornecedor (PF ou PJ)
  companyName: string
  tradeName:  string
  document: string

  // contato
  email: string
  phone: string

  // endereço
  zip_code: string
  street: string
  number: string
  city: string
  state: string
  country: string

  pix_key: string
  bank: string
  agency: string
  account: string
  

}