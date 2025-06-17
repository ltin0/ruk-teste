// app/index.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'expo-router';
import { saveToken } from '../src/utils/tokenStorage'; 

const SIGN_IN_MUTATION = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(loginInput: { email: $email, password: $password }) {
      access_token
    }
  }
`;

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const [signIn, { loading }] = useMutation(SIGN_IN_MUTATION, {
    onCompleted: async (data) => {
      const token = data.signIn.access_token;
      await saveToken(token);
      Alert.alert('Sucesso!', 'Login realizado com sucesso.');
      router.replace('/home');
    },
    onError: (error) => {
      Alert.alert('Erro no Login', 'E-mail ou senha inválidos.');
      console.error(error);
    },
  });

 const handleLogin = () => {
    console.log('Botão Entrar clicado. E-mail:', email, 'Senha:', password); // <-- Adicione este log

    if (!email || !password) {
        console.log('Validação de campos vazios acionada.'); // <-- Adicione este log
        Alert.alert('Campos vazios', 'Por favor, preencha e-mail e senha.');
        return;
    }
    signIn({ variables: { email, password } });
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
      <View className="flex-1 justify-center items-center bg-gray-100 p-8">
        <Text className="text-4xl font-bold text-gray-800 mb-10">Login</Text>
        <TextInput
          className="w-full bg-white border border-gray-300 rounded-lg p-4 mb-4 text-lg"
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          className="w-full bg-white border border-gray-300 rounded-lg p-4 mb-6 text-lg"
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity
          className={`w-full rounded-lg p-4 ${loading ? 'bg-blue-300' : 'bg-blue-600'}`}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white text-center font-bold text-lg">Entrar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Alert.alert('Funcionalidade em desenvolvimento', 'A tela de registro será implementada em breve.')}
          className="mt-4"
        >
          <Text className="text-blue-600 text-lg">Criar Conta</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;