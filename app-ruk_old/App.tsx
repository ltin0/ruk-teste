// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ApolloProvider } from '@apollo/client';
import client from './src/apollo/client';

import LoginScreen from './src/screens/LoginScreen'; // Importa a LoginScreen
import HomeScreen from './src/screens/HomeScreen';
// import SignUpScreen from './src/screens/SignUpScreen'; // Descomente quando criar esta tela

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login"> {/* Define Login como tela inicial */}
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Meu Cartão' }} />
          {/* <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Registro' }} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}