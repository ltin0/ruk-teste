import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ApolloProvider } from '@apollo/client';
import AppNavigator from './src/navigation/AppNavigator';
import client from './src/lib/apollo';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <AppNavigator />
        <StatusBar style="auto" />
      </NavigationContainer>
    </ApolloProvider>
  );
}