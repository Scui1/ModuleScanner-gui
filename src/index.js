import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ScanRequest from './json/scanrequest/ScanRequest'

fetch('https://187ju.de/api/getScanConfig.php')
.then(response => response.json())
.then(scanRequestJson => {
    
    const scanRequest = Object.assign(scanRequestJson, ScanRequest.prototype)
    console.log(scanRequest)

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
        <App />
    );
        
})
.catch(console.error)