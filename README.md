##  Links do Projeto em Produção

* **API (Backend):** [https://desafio-ruk-api.onrender.com/graphql](https://desafio-ruk-api.onrender.com/graphql)
* **App (Frontend Web):** [https://desafio-ruk-app.onrender.com](https://desafio-ruk-app.onrender.com)


| Requisito | Status |
| :--- | :--- | 
| **Usar GRAPHQL** | A comunicação cliente-servidor é feita exclusivamente via uma API GraphQL, com queries para busca e mutations para alteração de dados. |
| **Validar os dados de entrada** |  A validação dos dados de entrada (e.g., formato de e-mail, tamanho da senha) é realizada no backend com o uso de DTOs e as bibliotecas `class-validator` e `class-transformer`. |
| **Implementar JWT stateless** | O sistema de autenticação é 100% stateless, utilizando JSON Web Tokens (JWT) gerados no login e validados a cada requisição em rotas protegidas via `passport-jwt`. |
| **Usar persistência de dados** |  Os dados de usuários e telefones são persistidos em um banco de dados PostgreSQL, com o mapeamento objeto-relacional gerenciado pelo TypeORM. |
| **Usar um linter** | O ESLint foi utilizado e configurado para garantir a qualidade e a padronização do código TypeScript. |
| **Utilizar Docker** |  A imagem final de produção do backend e do frontend são containerizadas com Docker, utilizando `Dockerfiles` de múltiplos estágios para otimização e segurança. |
| **Deployar API na nuvem** | A API, o frontend e o banco de dados estão implantados na plataforma Render, configurados para integração contínua a partir do repositório Git. |
| **Publicar código-fonte** |  Todo o código-fonte do projeto está versionado e disponível neste repositório. |
| **Criptografia para senha** | As senhas dos usuários são criptografadas com o algoritmo `bcrypt` antes de serem salvas no banco, garantindo que nunca sejam armazenadas em texto plano. |

##  Arquitetura e Fluxo de Funcionamento

A aplicação segue uma arquitetura cliente-servidor desacoplada. O frontend é responsável pela interface e experiência do usuário, enquanto o backend gerencia toda a lógica de negócio, segurança e persistência de dados.

O fluxo de autenticação do usuário funciona da seguinte forma:

1.  **Cadastro de Usuário:**
    * O usuário preenche o formulário de cadastro no aplicativo.
    * Uma `mutation` GraphQL (`signUp`) é enviada para a API no Render.
    * O serviço do NestJS valida os dados. Se válidos, a senha é hasheada com `bcrypt` e os dados do usuário e seus telefones são salvos no banco PostgreSQL via TypeORM.

2.  **Login de Usuário:**
    * O usuário preenche os campos de e-mail e senha na tela de login.
    * Uma `mutation` GraphQL (`signIn`) é enviada para a API.
    * O `AuthService` no backend busca o usuário pelo e-mail e compara a senha enviada com o hash salvo no banco usando `bcrypt.compare`.
    * Se a autenticação for bem-sucedida, o `JwtService` gera um token JWT, assinado com a chave secreta (`JWT_SECRET`), contendo o ID e e-mail do usuário no payload. Este token é retornado para o aplicativo.

3.  **Acesso a Dados Protegidos:**
    * O aplicativo cliente salva o token JWT recebido no `AsyncStorage`.
    * Para acessar a tela Home, o app faz uma `query` GraphQL (`me`). O `Apollo Client` (no frontend) anexa automaticamente o token ao cabeçalho `Authorization: Bearer <token>` de cada requisição.
    * No backend, um `Guard` (`JwtAuthGuard`) intercepta a requisição. Ele usa a estratégia `passport-jwt` para verificar a assinatura e a data de expiração do token.
    * Se o token for válido, o acesso à rota é liberado, os dados do usuário são buscados no banco e retornados ao frontend para serem exibidos no "Cartão de Identificação".

4.  **Logout:**
    * O token JWT é removido do `AsyncStorage` no cliente.
    * O usuário é redirecionado para a tela de login. Como os tokens são stateless, nenhuma ação é necessária no backend.


#### **Backend**
* **Framework:** NestJS
* **Linguagem:** TypeScript
* **API:** GraphQL
* **Banco de Dados:** PostgreSQL
* **ORM:** TypeORM
* **Autenticação:** JWT (JSON Web Tokens), Passport.js
* **Containerização:** Docker

#### **Frontend**
* **Framework:** React Native com Expo (Router)
* **Linguagem:** TypeScript
* **Comunicação com API:** Apollo Client
* **Estilização:** Tailwind CSS com NativeWind
