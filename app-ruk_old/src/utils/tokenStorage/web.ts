// src/utils/tokenStorage/web.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'user-token';

export const saveToken = async (token: string) => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
    console.log('Token salvo no AsyncStorage (web)');
  } catch (error) {
    console.error('Erro ao salvar o token no AsyncStorage (web):', error);
    throw error;
  }
};

export const getToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    console.log('Token obtido do AsyncStorage (web):', token ? 'Existe' : 'Não existe');
    return token;
  } catch (error) {
    console.error('Erro ao obter o token do AsyncStorage (web):', error);
    return null;
  }
};

export const deleteToken = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
    console.log('Token removido do AsyncStorage (web)');
  } catch (error) {
    console.error('Erro ao remover o token do AsyncStorage (web):', error);
    throw error;
  }
};