import * as React from "react";
import * as ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


const rootElement = document.getElementById('root')
if (!rootElement)
    throw new Error("failed to find root element, watafak?")

const root = ReactDOM.createRoot(rootElement)
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);