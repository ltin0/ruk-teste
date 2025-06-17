import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { gql, useMutation } from '@apollo/client';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';

// 1. Definimos a mutação GraphQL que queremos executar
const SIGN_IN_MUTATION = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(loginInput: { email: $email, password: $password }) {
      access_token
    }
  }
`;

const LoginScreen = () => {
  // 2. Estados para guardar o e-mail e a senha digitados pelo usuário
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  // 3. Usamos o hook useMutation do Apollo. Ele nos retorna:
  //    - Uma função para chamar a mutação (signIn)
  //    - Um objeto com o estado da requisição { loading, error, data }
  const [signIn, { loading, error, data }] = useMutation(SIGN_IN_MUTATION, {
    // 4. onCompleted é chamado quando a mutação termina com SUCESSO
    onCompleted: async (data) => {
      // Pegamos o token da resposta
      const token = data.signIn.access_token;
      
      // Salvamos o token de forma segura no dispositivo
      await SecureStore.setItemAsync('user-token', token);
      
      // Navegamos para a tela Home
      Alert.alert('Sucesso', 'Login realizado com sucesso!');
      navigation.navigate('Home');
    },
    // onError é chamado se a API retornar algum erro
    onError: (error) => {
      console.error('Erro no login:', error.message);
      Alert.alert('Erro no Login', 'E-mail ou senha inválidos. Tente novamente.');
    }
  });

  // 5. Função que será chamada quando o botão de login for pressionado
  const handleLogin = () => {
    // Validação simples para não enviar campos vazios
    if (!email || !password) {
      Alert.alert('Campos Vazios', 'Por favor, preencha o e-mail e a senha.');
      return;
    }
    
    // Chamamos a função da mutação, passando as variáveis
    signIn({ variables: { email, password } });
  };

  return (
    // KeyboardAvoidingView ajuda a não esconder os inputs atrás do teclado
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <View className="flex-1 justify-center items-center bg-gray-100 p-8">
        <Text className="text-4xl font-bold text-gray-800 mb-10">
          Login
        </Text>

        {/* Input de E-mail */}
        <TextInput
          className="w-full bg-white border border-gray-300 rounded-lg p-4 mb-4 text-lg"
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Input de Senha */}
        <TextInput
          className="w-full bg-white border border-gray-300 rounded-lg p-4 mb-6 text-lg"
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry // Esconde a senha
        />

        {/* Botão de Login */}
        <TouchableOpacity
          className={`w-full rounded-lg p-4 ${loading ? 'bg-blue-300' : 'bg-blue-600'}`}
          onPress={handleLogin}
          disabled={loading} // Desabilita o botão enquanto carrega
        >
          {loading ? (
            <ActivityIndicator color="#fff" /> // Mostra um spinner de carregamento
          ) : (
            <Text className="text-white text-center font-bold text-lg">
              Entrar
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;