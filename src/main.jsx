import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { store } from './components/redux/store.js';
import Authentication from './components/authenctication/useAuthentication.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider>
        <Router>
          <Authentication>
            <App />
          </Authentication>
        </Router>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
)
