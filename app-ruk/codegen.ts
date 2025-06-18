import type { CodegenConfig } from '@graphql-codegen/cli';

// 1. Definimos as queries e mutações como strings de texto aqui mesmo
const GetMe = `
  query GetMe {
    me {
      id
      name
      email
      telephones {
        area_code
        number
      }
    }
  }
`;

const SignIn = `
  mutation SignIn($email: String!, $password: String!) {
    signIn(loginInput: { email: $email, password: $password }) {
      access_token
    }
  }
`;

const SignUp = `
  mutation SignUp($name: String!, $email: String!, $password: String!, $telephones: [TelephoneInput!]!) {
    signUp(createUserInput: { name: $name, email: $email, password: $password, telephones: $telephones }) {
      id
      created_at
    }
  }
`;

// 2. Passamos as strings diretamente para a configuração
const config: CodegenConfig = {
  overwrite: true,
  schema: "https://ruk-teste.onrender.com/graphql",
  documents: [GetMe, SignIn, SignUp], // <--- A grande mudança está aqui
  generates: {
    './src/generated/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo'
      ],
      config: {
        withHooks: true,
      },
    }
  }
};

export default config;