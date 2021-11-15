// == Import : npm
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

// == Import : local
// Composants
import App from './containers/App';
import store from './store';

const client = new ApolloClient({
  uri: 'https://oparadise-back.herokuapp.com/graphql',
  cache: new InMemoryCache(),
  link: createUploadLink({
    uri: 'https://oparadise-back.herokuapp.com/graphql',
  }),
});

// == Render
// 1. Élément React racine (celui qui contient l'ensemble de l'app)
//    => crée une structure d'objets imbriqués (DOM virtuel)
const rootReactElement = (
  <Provider store={store}>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </Provider>

);
// 2. La cible du DOM (là où la structure doit prendre vie dans le DOM)
const target = document.getElementById('root');
// 3. Déclenchement du rendu de React (virtuel) => DOM (page web)
render(rootReactElement, target);
