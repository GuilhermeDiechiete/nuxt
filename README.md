# 📊 Nuxt Project

Este projeto foi desenvolvido com **Nuxt 4**, adotando uma stack moderna voltada para performance, escalabilidade e boas práticas no desenvolvimento de aplicações web.

---

## 🚀 Tecnologias utilizadas

### Nuxt 4.4.2
Framework Vue.js moderno com suporte a SSR (Server-Side Rendering), SSG (Static Site Generation) e roteamento baseado em arquivos, proporcionando alta performance e excelente experiência de desenvolvimento.  
https://nuxt.com/docs/4.x/guide

### Pinia 3.0.4
Gerenciador de estado oficial recomendado para Vue/Nuxt. Simples, modular e substituto moderno do Vuex, oferecendo melhor tipagem e organização de stores.  
https://pinia.vuejs.org/introduction.html

### Nuxt UI 4.6.1
Biblioteca de componentes UI baseada em Tailwind CSS, focada em produtividade, consistência visual e integração nativa com Nuxt.  
https://ui.nuxt.com/docs/components

### Tailwind CSS
Framework CSS utilitário que permite a construção rápida de interfaces modernas, responsivas e altamente customizáveis.  
https://tailwindcss.com/

### Iconify (Lucide)
Sistema de ícones vetoriais com suporte a múltiplas bibliotecas, incluindo Lucide, garantindo padronização e facilidade de uso.  
https://iconify.design/  
https://lucide.dev/

### Valibot
Biblioteca leve, performática e totalmente tipada para validação de dados em TypeScript, ideal para formulários e schemas de validação.  
https://valibot.dev/

---

## 📦 Visão geral do projeto

Este projeto segue uma arquitetura modular e escalável, com foco em separação de responsabilidades, reatividade e manutenção simplificada.

A aplicação utiliza uma stack moderna para garantir alta performance, organização e padronização de código no frontend.

---


---

# 🧭 Fluxo da aplicação

A aplicação inicia em `app.vue`, onde é renderizado o `<NuxtPage />`, responsável pelo roteamento das páginas.

Também é utilizado um componente global `MessageBox`, responsável por exibir notificações (toasts) de sucesso e erro ao usuário.

---

## 🖥️ Páginas

- **index.vue**  
  Página inicial da aplicação, responsável pela apresentação do sistema e acesso às páginas de login e cadastro.  
  Estas são as únicas rotas públicas da aplicação.

- **Cadastro → Login**  
  Após o cadastro, o usuário é redirecionado para a página de login.

- **Dashboard (`/dashboard/panel`)**  
  Área autenticada da aplicação, onde o usuário tem acesso ao painel principal, podendo gerenciar:
  - Entradas
  - Saídas
  - Investimentos
  - Outras funcionalidades financeiras

---

## 🔐 Autenticação

Após o login, o backend retorna um token de autenticação, que é armazenado em um store do Pinia (`sessionStore`).

Este token:

- Não é persistido em `localStorage` ou cookies
- Fica armazenado apenas em memória (state do Pinia)
- É perdido ao recarregar a página ou encerrar a sessão

---

## 🧪 Validações

Todas as validações de formulário são centralizadas no diretório: /validators


# 🔄 Fluxo de comunicação com o Backend

Todas as requisições da aplicação são centralizadas através do **Pinia Stores**.

Ou seja, os componentes nunca fazem chamadas diretas ao backend. Toda comunicação ocorre via store, garantindo maior organização, padronização e controle de estado.

---

## 📡 Padrão de resposta do Backend

O backend é responsável por retornar **sempre uma resposta padronizada em JSON**, independentemente do resultado da requisição.

Exemplo de resposta:

### ✔️ Sucesso
```json
{
  "success": true,
  "message": "Operação realizada com sucesso",
  "data": {}
}