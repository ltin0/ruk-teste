// src/utils/tokenStorage/index.ts
import { Platform } from 'react-native';

// Declarar as variáveis que serão exportadas
let saveToken: (token: string) => Promise<void>;
let getToken: () => Promise<string | null>;
let deleteToken: () => Promise<void>;

if (Platform.OS === 'web') {
  // Se for web, importe e use a implementação web
  const WebTokenStorage = require('./web'); // Usar require para importação síncrona
  saveToken = WebTokenStorage.saveToken;
  getToken = WebTokenStorage.getToken;
  deleteToken = WebTokenStorage.deleteToken;
} else {
  // Para mobile, importe e use a implementação native
  const NativeTokenStorage = require('./native'); // Usar require para importação síncrona
  saveToken = NativeTokenStorage.saveToken;
  getToken = NativeTokenStorage.getToken;
  deleteToken = NativeTokenStorage.deleteToken;
}

// Re-exporta as funções selecionadas
export { saveToken, getToken, deleteToken };