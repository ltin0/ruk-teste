import { ApolloProvider } from '@apollo/client';
import { Stack } from 'expo-router';
import client from '../src/lib/apollo';
import "../global.css"; // Importa o CSS global

export default function RootLayout() {
  return (
    <ApolloProvider client={client}>
      
      {/* O componente <Stack> que faltava. Ele é o navegador. */}
      <Stack>

        {/* As configurações de cada tela devem vir aqui dentro */}
        <Stack.Screen 
          name="index" // Tela de Login
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="home" // Tela Home
          options={{ 
            headerShown: true, 
            title: 'Meu Perfil' 
          }} 
        />
        <Stack.Screen 
          name="signup" // Tela de Cadastro
          options={{ 
            headerShown: true, 
            title: 'Criar Nova Conta',
            presentation: 'modal' 
          }} 
        />

      </Stack>

    </ApolloProvider>
  );
}