// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import { useMutation } from '@apollo/client';
import { SIGN_IN_MUTATION } from '../graphql/mutations';
import { saveToken } from '../utils/tokenStorage/native'; // IMPORTAÇÃO CORRIGIDA: sem a extensão .native ou .web

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [signIn, { loading, error }] = useMutation(SIGN_IN_MUTATION, {
    onCompleted: async (data) => {
      const token = data.signIn.access_token;
      await saveToken(token);
      Alert.alert('Sucesso', 'Login realizado com sucesso!');
      navigation.navigate('Home');
    },
    onError: (err) => {
      console.error('Login error:', err);
      Alert.alert('Erro no Login', err.message);
    },
  });

  const handleSubmit = async () => {
    try {
      await signIn({
        variables: {
          loginInput: {
            email,
            password,
          },
        },
      });
    } catch (e) {
      // Erro já tratado no onError do useMutation
    }
  };

  return (
    <View className="flex-1 items-center justify-center p-4">
      <Text className="text-2xl font-bold mb-4">Login</Text>
      <TextInput
        className="w-full p-2 mb-3 border border-gray-300 rounded"
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        className="w-full p-2 mb-3 border border-gray-300 rounded"
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title={loading ? 'Entrando...' : 'Entrar'} onPress={handleSubmit} disabled={loading} />

      {error && <Text className="text-red-500 mt-2">{error.message}</Text>}

      <Button title="Criar Conta" onPress={() => Alert.alert('Funcionalidade em desenvolvimento', 'A tela de registro será implementada em breve.')} className="mt-4" />
    </View>
  );
};

export default LoginScreen;