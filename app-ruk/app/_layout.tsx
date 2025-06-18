import { ApolloProvider } from '@apollo/client';
import { Stack } from 'expo-router';
import client from '../src/lib/apollo';
import "../global.css";

export default function RootLayout() {
  return (
    <ApolloProvider client={client}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: true, title: 'Meu Perfil' }} />
        <Stack.Screen name="signup" options={{ headerShown: true, title: 'Criar Nova Conta', presentation: 'modal' }} />
      </Stack>
    </ApolloProvider>
  );
}