import * as React from "react";
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import notifier from "./components/Notifications/Notifier";
import ScanRequestConfiguration from "./components/ScanRequestConfiguration/ScanRequestConfiguration";
import ScanResultEditor from "./components/ScanResultEditor/ScanResultEditor";
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
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ScanRequestConfiguration />}/>
                <Route path="/CacheEditor" element={<ScanResultEditor/>}></Route>
            </Routes>
            
        </BrowserRouter>
    </React.StrictMode>
);