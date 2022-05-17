import * as React from "react";
import * as ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ScanRequest } from "./json/scanrequest/ScanRequest";

fetch('https://187ju.de/api/getScanConfig.php')
.then(response => response.json())
.then(scanRequestJson => {
    const scanRequest = Object.assign(ScanRequest, scanRequestJson) as ScanRequest
    console.log(scanRequest)

    const rootElement = document.getElementById('root')
    if (!rootElement)
        throw new Error("failed to find root element, watafak?")

    const root = ReactDOM.createRoot(rootElement)
    root.render(
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    );
        
})
.catch(console.error)