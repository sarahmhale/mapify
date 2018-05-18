import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { ApolloProvider } from "react-apollo";
import { client } from './api/config'


const Root = () =>{
  return (
    <ApolloProvider client={client}><App/></ApolloProvider>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
