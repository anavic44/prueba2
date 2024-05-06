import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Make sure this imports App, not ARDisplay

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(<App />); // This should render App, which includes ARDisplay


