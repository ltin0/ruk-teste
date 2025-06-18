import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSignUpMutation } from '../src/generated/graphql';

const SignUpScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [areaCode, setAreaCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();


  const [signUp, { loading }] = useSignUpMutation({
    onCompleted: (data) => {
      Alert.alert('Sucesso!', 'Sua conta foi criada. Agora você pode fazer o login.');
      router.back(); 
    },
    onError: (error) => {
      setErrorMessage(error.message);
      console.error("Erro detalhado do cadastro:", error);
    },
  });

  const handleSignUp = () => {
    if (!name || !email || !password || !areaCode || !phoneNumber) {
      setErrorMessage('Todos os campos são obrigatórios.');
      return;
    }
    
    const variables = {
      name,
      email,
      password,
      telephones: [{
        area_code: areaCode,
        number: phoneNumber,
      }]
    };

    signUp({ variables });
  };
  
  const onInputChange = (setter, value) => {
    setter(value);
    if (errorMessage) setErrorMessage('');
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View className="flex-1 justify-center items-center bg-gray-100 p-8">
          <TextInput className="w-full bg-white border border-gray-300 rounded-lg p-4 mb-4 text-lg" placeholder="Nome Completo" value={name} onChangeText={(text) => onInputChange(setName, text)} />
          <TextInput className="w-full bg-white border border-gray-300 rounded-lg p-4 mb-4 text-lg" placeholder="E-mail" value={email} onChangeText={(text) => onInputChange(setEmail, text)} keyboardType="email-address" autoCapitalize="none" />
          <TextInput className="w-full bg-white border border-gray-300 rounded-lg p-4 mb-6 text-lg" placeholder="Senha (mín. 6 caracteres)" value={password} onChangeText={(text) => onInputChange(setPassword, text)} secureTextEntry />
          <View className="flex-row w-full mb-6">
            <TextInput className="w-1/4 bg-white border border-gray-300 rounded-lg p-4 text-lg text-center" placeholder="DDD" value={areaCode} onChangeText={(text) => onInputChange(setAreaCode, text)} keyboardType="numeric" maxLength={2} />
            <View className="w-4" />
            <TextInput className="flex-1 bg-white border border-gray-300 rounded-lg p-4 text-lg" placeholder="Número" value={phoneNumber} onChangeText={(text) => onInputChange(setPhoneNumber, text)} keyboardType="numeric" />
          </View>

          {errorMessage ? <Text className="text-red-500 text-center mb-4 font-semibold">{errorMessage}</Text> : null}
          
          <TouchableOpacity className={`w-full rounded-lg p-4 ${loading ? 'bg-green-300' : 'bg-green-600'}`} onPress={handleSignUp} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text className="text-white text-center font-bold text-lg">Cadastrar</Text>}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;