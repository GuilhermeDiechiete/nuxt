<script setup lang="ts">
const accepted = defineModel<boolean>()

    const privacyPolicy = `
POLÍTICA DE PRIVACIDADE

1. COLETA DE DADOS
Coletamos dados pessoais fornecidos por você no momento do cadastro, como:
- Nome completo
- E-mail
- Telefone
- CPF/CNPJ
- Data de nascimento
- Dados de acesso (usuário e senha)

2. FINALIDADE DO USO DOS DADOS
Seus dados são utilizados exclusivamente para:
- Criação e gerenciamento da sua conta
- Autenticação e segurança de acesso
- Melhoria da experiência dentro da plataforma
- Cumprimento de obrigações legais e regulatórias

3. COMPARTILHAMENTO DE DADOS
Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros para fins comerciais.

Se necessário, seus dados poderão ser compartilhados apenas com:
- Provedores de serviços essenciais (ex: hospedagem, autenticação)
- Autoridades legais mediante obrigação legal

4. ARMAZENAMENTO E SEGURANÇA
Seus dados são armazenados em servidores seguros, com medidas técnicas e organizacionais para proteger contra acesso não autorizado, perda ou alteração indevida.

5. DIREITOS DO USUÁRIO (LGPD)
Você tem direito a:
- Acessar seus dados
- Corrigir informações incorretas
- Solicitar exclusão dos dados
- Revogar consentimento
- Solicitar portabilidade

6. TEMPO DE ARMAZENAMENTO
Os dados são mantidos enquanto sua conta estiver ativa ou conforme exigido por lei.

7. CONSENTIMENTO
Ao continuar, você declara estar ciente e de acordo com esta Política de Privacidade e autoriza o tratamento dos seus dados conforme descrito.

Última atualização: ${new Date().toLocaleDateString('pt-BR')}
`

const emit = defineEmits<{
  (e: 'confirm'): void
}>()

const submit = () => {
  if (!accepted.value) return
  emit('confirm')
}
</script>

<template>
  <div class="space-y-4">

    <div class="flex items-start gap-2">
      <UCheckbox v-model="accepted" />

      <span class="text-sm">
        Eu li e concordo com a
        <UPopover mode="hover">
          <UButton
            label="Política de Privacidade"
            variant="link"
            class="p-0 text-sm"
          />

          <template #content>
            <div class="w-[350px] max-h-[300px] overflow-y-auto p-4 text-xs">
              {{ privacyPolicy }}
            </div>
          </template>
        </UPopover>
      </span>
    </div>
  </div>
</template>