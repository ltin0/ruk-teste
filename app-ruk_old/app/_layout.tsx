import "../global.css";
import { ApolloProvider } from '@apollo/client';
import { Stack } from 'expo-router';
import client from '../src/lib/apollo'; // Verifique se o caminho está correto

export default function RootLayout() {
  return (
    // O ApolloProvider "envelopa" toda a navegação para que todas as telas possam fazer queries/mutations
    <ApolloProvider client={client}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="home" options={{ 
          headerShown: true, // Mostra o cabeçalho na tela Home
          title: 'Meu Perfil' 
        }} />
      </Stack>
    </ApolloProvider>
  );
}