import * as React from "react";
import * as ReactDOM from 'react-dom/client';
import notifier from "./components/Notifications/Notifier";
import ScanRequestConfiguration from "./components/ScanRequestConfiguration/ScanRequestConfiguration";
import './index.css';

notifier.configure({
    autoClose: 10000,
    position: "top-right",
    delay: 0,
    width: "100%"
});

const rootElement = document.getElementById('root')
if (!rootElement)
    throw new Error("failed to find root element, watafak?")

const root = ReactDOM.createRoot(rootElement)
root.render(
    <React.StrictMode>
        <ScanRequestConfiguration />
    </React.StrictMode>
);