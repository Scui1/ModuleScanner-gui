import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ScanResult } from '../../../json/scanresult/ScanResult';
import ScanResultService from '../../../services/ScanResultService';
import Navbar from '../../Navbar/Navbar';
import './ScanResultOverview.css';

const ScanResultOverview = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [scanResult, setScanResult] = useState<ScanResult | null>(null)

  useEffect(() => {
    setLoading(true)
    ScanResultService.getScanResult()
      .then(scanResult => {
        setScanResult(scanResult)
        setLoading(false)
      })
      .catch(reason => {
        console.error(reason)
        setLoading(false)
      })
  }, [])

  if (loading)
    return (<h1>LOADING</h1>);

  if (!scanResult)
    return (<h1>ERROR</h1>);

  return (
  <div className="ScanResultOverview">
    <Navbar navigationButtons={[<Link to="/"><button key="ScanConfigurationButton" name="ScanConfigurationButton" className="primaryButton">Scanconfig</button></Link>]} 
      customButtons={[]}/>
    <div className="split left">

    </div>
    <div className="split right">
    </div>
    
  </div>
  );
}

export default ScanResultOverview;
