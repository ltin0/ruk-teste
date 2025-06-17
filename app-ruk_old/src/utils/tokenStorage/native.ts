import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'user-token';

export const saveToken = async (token: string) => {
  try {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
    console.log('Token salvo no SecureStore (mobile)');
  } catch (error) {
    console.error('Erro ao salvar o token no SecureStore (mobile):', error);
    throw error;
  }
};

export const getToken = async (): Promise<string | null> => {
  try {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    console.log('Token obtido do SecureStore (mobile):', token ? 'Existe' : 'Não existe');
    return token;
  } catch (error) {
    console.error('Erro ao obter o token do SecureStore (mobile):', error);
    return null;
  }
};

export const deleteToken = async () => {
  try {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    console.log('Token removido do SecureStore (mobile)');
  } catch (error) {
    console.error('Erro ao remover o token do SecureStore (mobile):', error);
    throw error;
  }
};