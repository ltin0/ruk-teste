import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage'; // <-- MUDANÇA AQUI
const httpLink = createHttpLink({
  uri: 'https://ruk-teste.onrender.com/graphql', 
});
const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem('user-token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;