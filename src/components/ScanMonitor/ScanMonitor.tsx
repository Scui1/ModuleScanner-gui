import "./ScanMonitor.css";
import * as React from "react"
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ScanManagement } from "../../services/ScanManagement";

const ScanMonitor = () => {
    const [scanRunning, setScanRunning] = useState(false)
    
    useEffect(() => {
        const interval = setInterval(refreshScanStatus, 5000)
        return () => clearInterval(interval)
    }, [])

    function refreshScanStatus() {
        ScanManagement.isScanRunning()
            .then(running => setScanRunning(running))
    }

    function startRescan() {
        ScanManagement.startRescan()
            .then(() => {
                refreshScanStatus()
            })
    }

    return (
        <div className="ScanMonitorComponent">
            <Navbar navigationButtons={[
                <Link to="/" key="ScanConfigurationLink"><button key="ScanConfigurationButton" name="ScanConfigurationButton" className="primaryButton">Scanconfig</button></Link>,
                <Link to="/CacheEditor" key="CacheEditorLink"><button key="CacheEditorButton" name="CacheEditorButton" className="primaryButton">Cache Editor</button> </Link>
                ]} 
                customButtons={[]}/>
            <div className="ScanMonitorDiv">
                { scanRunning ?
                    <h1 style={{color: "green"}}>Scan is running</h1>
                    :
                    <>
                        <h1>Server be chilling</h1>
                        <button id="rescanButton" className="primaryButton" onClick={startRescan}>Start rescan</button>
                    </>
                }
            </div>
        </div>
    );
}

export default ScanMonitor