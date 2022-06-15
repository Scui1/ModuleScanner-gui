import * as React from "react";
import * as ReactDOM from 'react-dom/client';
import { HashRouter, Route, Routes} from "react-router-dom";
import notifier from "./components/Notifications/Notifier";
import ScanRequestConfiguration from "./components/ScanRequest/ScanRequestConfiguration/ScanRequestConfiguration";
import ScanResultOverview from "./components/ScanResult/ScanResultOverview/ScanResultOverview";
import './index.css';

notifier.configure({
    autoClose: 8000,
    pauseOnHover: true,
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
        <HashRouter>
            <Routes>
                <Route path="/" element={<ScanRequestConfiguration />}/>
                <Route path="/CacheEditor" element={<ScanResultOverview/>}/>
            </Routes>
            
        </HashRouter>
    </React.StrictMode>
);