// src/screens/HomeScreen.tsx
import React from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'expo-router';
import { deleteToken } from '../utils/tokenStorage/native'; // Importe a função deleteToken

// 1. Definimos a Query GraphQL para buscar os dados do usuário logado
const GET_ME_QUERY = gql`
  query GetMe {
    me {
      id
      name
      email
      telephones {
        area_code
        number
      }
      created_at
      modified_at
    }
  }
`;

const HomeScreen = () => {
  const router = useRouter();
  const { data, loading, error, refetch } = useQuery(GET_ME_QUERY, {
    fetchPolicy: 'network-only', // Garante que sempre buscaremos os dados mais recentes do servidor
  });

  const handleLogout = async () => {
    await deleteToken(); // Usa a função deleteToken do utilitário
    router.replace('/'); // Redireciona para a tela de login/inicial
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    // Exibe um alerta com a mensagem de erro e redireciona para o login
    Alert.alert('Erro', `Sua sessão expirou ou ocorreu um erro: ${error.message}. Por favor, faça login novamente.`);
    handleLogout(); 
    return null; // Não renderiza nada enquanto redireciona
  }

  // Desestruturamos os dados do usuário, garantindo que 'me' exista
  const user = data?.me;

  // Caso o usuário não seja encontrado após o carregamento e sem erro aparente
  if (!user) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text>Nenhum dado de usuário encontrado.</Text>
        <TouchableOpacity
          onPress={handleLogout}
          className="mt-10 bg-red-500 py-3 px-8 rounded-lg"
        >
          <Text className="text-white font-bold text-lg">Sair</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Formata as datas para exibição
  const createdAtFormatted = user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A';
  const modifiedAtFormatted = user.modified_at ? new Date(user.modified_at).toLocaleDateString() : 'N/A';

  return (
    <View className="flex-1 items-center justify-center bg-gray-100 p-5">
      <View className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        
        <View className="items-center mb-6">
          <View className="w-24 h-24 bg-blue-600 rounded-full justify-center items-center">
            {/* para o avatar */}
            <Text className="text-white text-4xl font-bold">
              {user.name.split(' ').map(n => n[0]).join('')}
            </Text>
          </View>
          <Text className="text-3xl font-bold text-gray-800 mt-4">{user.name}</Text>
          <Text className="text-md text-gray-500">{user.email}</Text>
        </View>

        <View className="border-t border-gray-200 pt-6">
          <Text className="text-lg font-semibold text-gray-700 mb-2">Telefones:</Text>
          {user.telephones.length > 0 ? (
            user.telephones.map((tel, index) => (
              <View key={index} className="flex-row items-center mb-1">
                <Text className="text-gray-600">📞</Text>
                <Text className="text-gray-800 text-base ml-2">
                  ({tel.area_code}) {tel.number}
                </Text>
              </View>
            ))
          ) : (
            <Text className="text-gray-600 text-base">Nenhum telefone cadastrado.</Text>
          )}
        </View>

        <View className="mt-4 text-gray-700">
          <Text className="text-md">
            <Text className="font-semibold">Criado em:</Text> {createdAtFormatted}
          </Text>
          <Text className="text-md">
            <Text className="font-semibold">Última Modificação:</Text> {modifiedAtFormatted}
          </Text>
        </View>

      </View>

      <TouchableOpacity
        onPress={handleLogout}
        className="mt-10 bg-red-500 py-3 px-8 rounded-lg"
      >
        <Text className="text-white font-bold text-lg">Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;