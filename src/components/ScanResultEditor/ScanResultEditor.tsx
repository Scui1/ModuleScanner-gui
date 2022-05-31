import * as React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './ScanResultEditor.css';

const ScanResultEditor = () => (
  <div className="ScanResultEditor">
    <Navbar navigationButtons={[<Link to="/"><button key="ScanConfigurationButton" name="ScanConfigurationButton" className="primaryButton">Scanconfig</button></Link>]} 
      customButtons={[]}/>
    <div className="split left">

    </div>
    <div className="split right">
    </div>
    
  </div>
);

export default ScanResultEditor;
