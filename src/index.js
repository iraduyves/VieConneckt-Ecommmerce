import React from 'react';
import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom/client'
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import UserProvider from './components/Context/UserProvider';
import ProductProvider from './components/Context/ProductProvider';


const query = new QueryClient({});

ReactDOM.createRoot(document.getElementById('root')).render(

      <QueryClientProvider client={query}>
            <ProductProvider>
                  <UserProvider>
                        <React.StrictMode>
                              <App />
                        </React.StrictMode>
                  </UserProvider>
            </ProductProvider>
      </QueryClientProvider>

)


