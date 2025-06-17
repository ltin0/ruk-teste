// src/apollo/client.ts
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getToken } from '../utils/tokenStorage';


const httpLink = createHttpLink({
  uri: 'https://ruk-teste.onrender.com/graphql', // URL do seu backend
});

const authLink = setContext(async (_, { headers }) => {
  const token = await getToken();
  console.log('Token no authLink:', token ? 'Existe' : 'Não existe');
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