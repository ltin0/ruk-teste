import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  ActivityIndicator, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import { useSignInMutation } from '../src/generated/graphql';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';


const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter(); 

  // Hook do Apollo para executar a mutação
  const [signIn, { loading }] = useSignInMutation({
    onCompleted: async (data) => {
      const token = data.signIn.access_token;
      await AsyncStorage.setItem('user-token', token);
      Alert.alert('Sucesso!', 'Login realizado com sucesso.');
      router.replace('/home'); 
    },
    onError: (error) => {
      setErrorMessage('E-mail ou senha inválidos.');
      console.error("Erro detalhado do login:", error);
    },
  });

  const handleLogin = () => {
    if (!email || !password) {
      setErrorMessage('Por favor, preencha e-mail e senha.');
      return;
    }
    signIn({ variables: { email, password } });
  };

  const handleInputChange = (setter, value) => {
    setter(value);
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
      <View className="flex-1 justify-center items-center bg-gray-100 p-8">
        <Text className="text-4xl font-bold text-gray-800 mb-10">Login</Text>
        
        <TextInput
          className="w-full bg-white border border-gray-300 rounded-lg p-4 mb-4 text-lg"
          placeholder="E-mail"
          value={email}
          onChangeText={(text) => handleInputChange(setEmail, text)} 
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          className="w-full bg-white border border-gray-300 rounded-lg p-4 mb-6 text-lg"
          placeholder="Senha"
          value={password}
          onChangeText={(text) => handleInputChange(setPassword, text)} 
          secureTextEntry
        />

        {errorMessage ? (
          <Text className="text-red-500 text-center mb-4 font-semibold">
            {errorMessage}
          </Text>
        ) : null}
        
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
          onPress={() => router.push('/signup')} // Navega para a tela de cadastro
          className="mt-6"
        >
          <Text className="text-blue-600 text-lg">Criar Conta</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;