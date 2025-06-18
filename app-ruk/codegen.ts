import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://ruk-teste.onrender.com/graphql", 
  
  documents: "app/**/*.{ts,tsx}",
  
  generates: {
    "./src/generated/": {
      preset: 'client',
      plugins: []
    }
  }
};

export default config;