import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import functionStore from './Redux/store';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { PersistGate } from 'redux-persist/integration/react'
const {store, persistor} = functionStore()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store} >
            <PersistGate loading={null} persistor={persistor} >
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);

reportWebVitals();