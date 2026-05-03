import * as v from 'valibot'

function isValidCPF(cpf: string) {
  cpf = cpf.replace(/\D/g, '')

  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false

  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += Number(cpf[i]) * (10 - i)
  }

  let digit1 = (sum * 10) % 11
  if (digit1 === 10) digit1 = 0
  if (digit1 !== Number(cpf[9])) return false

  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += Number(cpf[i]) * (11 - i)
  }

  let digit2 = (sum * 10) % 11
  if (digit2 === 10) digit2 = 0

  return digit2 === Number(cpf[10])
}

function isValidCNPJ(cnpj: string) {
  cnpj = cnpj.replace(/\D/g, '')

  if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false

  const calc = (base: string, weights: number[]) => {
    const sum = base
      .split('')
      .reduce((acc, num, i) => acc + Number(num) * weights[i], 0)

    const rest = sum % 11
    return rest < 2 ? 0 : 11 - rest
  }

  const base = cnpj.slice(0, 12)
  const digit1 = calc(base, [5,4,3,2,9,8,7,6,5,4,3,2])
  const digit2 = calc(base + digit1, [6,5,4,3,2,9,8,7,6,5,4,3,2])

  return cnpj === base + digit1.toString() + digit2.toString()
}

export const userSchema = v.pipe(
  v.object({
    fullname: v.pipe(
      v.string(),
      v.minLength(10, 'Nome deve ter no mínimo 10 caracteres'),
      v.regex(/^[A-Za-zÀ-ÿ\s]+$/, 'O nome deve conter apenas letras')
    ),

    username: v.pipe(
      v.string(),
      v.minLength(4, 'Usuário deve ter no mínimo 4 caracteres')
    ),

    birth: v.pipe(
      v.string(),
      v.minLength(1, 'Data de nascimento é obrigatória')
    ),

    phone: v.pipe(
      v.string(),
      v.regex(/^\d{10,11}$/, 'Telefone deve conter 10 ou 11 números')
    ),

    email: v.pipe(
      v.string(),
      v.trim(),
      v.email('E-mail inválido')
    ),

    password: v.pipe(
      v.string(),
      v.minLength(6, 'Senha deve ter no mínimo 6 caracteres')
    ),

    confirm_password: v.pipe(
      v.string(),
      v.minLength(6, 'Confirmação de senha inválida')
    ),

    // ✅ NOVOS CAMPOS
    client_type: v.picklist(['PF', 'PJ'], 'Tipo deve ser PF ou PJ'),

    document: v.pipe(
      v.string(),
      v.minLength(11, 'Documento inválido')
    ),
  }),

  // 👇 validação entre campos
  v.forward(
    v.partialCheck(
      [['password'], ['confirm_password']],
      (input) => input.password === input.confirm_password,
      'As senhas não conferem.'
    ),
    ['confirm_password']
  ),

  // 👇 valida CPF/CNPJ baseado no tipo
v.forward(
  v.check((input) => {
    const doc = input.document

    if (input.client_type === 'PF') {
      return doc.length === 11 && isValidCPF(doc)
    }

    if (input.client_type === 'PJ') {
      return doc.length === 14 && isValidCNPJ(doc)
    }

    return false
  }, 'Documento inválido para o tipo informado'),
  ['document']
)
)

export type UserSchema = v.InferOutput<typeof userSchema>