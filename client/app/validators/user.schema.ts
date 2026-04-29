import * as v from 'valibot'

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
  }),

  // 👇 validação entre campos
  v.forward(
    v.partialCheck(
      [['password'], ['confirm_password']],
      (input) => input.password === input.confirm_password,
      'As senhas não conferem.'
    ),
    ['confirm_password']
  )
)

export type UserSchema = v.InferOutput<typeof userSchema>