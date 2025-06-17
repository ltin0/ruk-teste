import "../global.css";
import { ApolloProvider } from '@apollo/client';
import { Stack } from 'expo-router';
import client from '../src/lib/apollo';

export default function RootLayout() {
  return (
    <ApolloProvider client={client}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="home" options={{ headerShown: true, title: 'Meu Perfil' }} />
        <Stack.Screen name="signup" options={{ 
          headerShown: true, 
          title: 'Criar Nova Conta',
          presentation: 'modal' //efeitinho
        }} />
      </Stack>
    </ApolloProvider>
  );
}