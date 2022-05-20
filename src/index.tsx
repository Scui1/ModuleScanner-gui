import * as React from "react";
import * as ReactDOM from 'react-dom/client';
import ScanRequestConfiguration from "./components/ScanRequestConfiguration/ScanRequestConfiguration";
import './index.css';

const rootElement = document.getElementById('root')
if (!rootElement)
    throw new Error("failed to find root element, watafak?")

const root = ReactDOM.createRoot(rootElement)
root.render(
    <React.StrictMode>
        <ScanRequestConfiguration />
    </React.StrictMode>
);