
<script setup lang="ts">
const fields = [
  {
    name: 'username',
    type: 'text',
    label: 'Nome de usuário',
    placeholder: 'Digite seu usuário',
    required: true
  },
  {
    name: 'fullname',
    type: 'text',
    label: 'Nome completo',
    placeholder: 'Digite seu nome completo',
    required: true
  },
  {
    name: 'birthdate',
    type: 'date',
    label: 'Data de nascimento',
    required: true
  },
  {
    name: 'phone',
    type: 'tel',
    label: 'Telefone',
    placeholder: '(00) 00000-0000',
    required: true
  },
  {
    name: 'email',
    type: 'email',
    label: 'E-mail',
    placeholder: 'Digite seu e-mail',
    required: true
  },
  {
    name: 'password',
    type: 'password',
    label: 'Senha',
    placeholder: 'Digite sua senha',
    required: true
  },
  {
    name: 'confirmPassword',
    type: 'password',
    label: 'Confirmação de senha',
    placeholder: 'Repita sua senha',
    required: true
  }
]
</script>

<template>
  <div class="min-h-screen flex items-center justify-center my-8">
    <UCard>
      <UAuthForm
        title="Cadastro"
        description="Preencha seus dados para criar uma conta."
        icon="i-lucide-user-plus"
        :fields="fields"
        :submit="{ label: 'Cadastrar' }",
        class="max-w-md w-full"
      />
    </UCard>
  </div>
</template>