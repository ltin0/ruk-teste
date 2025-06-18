import React from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { useGetMeQuery } from '../src/generated/graphql';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';



const HomeScreen = () => {
  const router = useRouter();
  const { data, loading, error } = useGetMeQuery();
  const handleLogout = async () => {
    await AsyncStorage.removeItem('user-token');
    router.replace('/'); 
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  if (error) {
    Alert.alert('Sessão Expirada', 'Ocorreu um erro. Faça o login novamente.');
    handleLogout();
    return null;
  }

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-gray-100 p-5">
      <View className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <View className="items-center mb-5">
          <View className="w-24 h-24 bg-blue-600 rounded-full justify-center items-center shadow-md">
            <Text className="text-white text-4xl font-bold">
              {data?.me.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </Text>
          </View>
          <Text className="text-3xl font-bold text-gray-800 mt-4">{data?.me.name}</Text>
          <Text className="text-md text-gray-500">{data?.me.email}</Text>
        </View>

        <View className="border-t border-gray-200 pt-5">
          <Text className="text-lg font-semibold text-gray-700 mb-2">Telefones:</Text>
          {data?.me.telephones.map((tel, index) => (
            <View key={index} className="flex-row items-center mb-1 pl-2">
              <Text className="text-gray-600 text-lg">📞</Text>
              <Text className="text-gray-800 text-base ml-3">
                ({tel.area_code}) {tel.number}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <TouchableOpacity
        onPress={handleLogout}
        className="mt-10 bg-red-600 py-3 px-8 rounded-full shadow-lg"
      >
        <Text className="text-white font-bold text-lg">Sair</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;