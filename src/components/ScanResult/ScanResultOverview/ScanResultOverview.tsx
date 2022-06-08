import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ScanResult } from '../../../json/scanresult/ScanResult';
import ScanResultService from '../../../services/ScanResultService';
import { ScanResultExtractor } from '../../../utils/ScanResultExtractor';
import Navbar from '../../Navbar/Navbar';
import ScanErrorEditor from '../ScanErrorEditor/ScanErrorEditor';
import ScanErrorList from '../ScanErrorList/ScanErrorList';
import './ScanResultOverview.css';

const ScanResultOverview = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [scanResult, setScanResult] = useState<ScanResult | null>(null)
  const [selectedErrorIndex, setSelectedErrorIndex] = useState<number>(0);

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

  function removeErrorAndSetTempValue(tempValue: number) {
    if (!scanResult)
      return

    const scanError = Object.assign({}, scanResult.errors[selectedErrorIndex])

    setSelectedErrorIndex(oldSelectedIndex => {
      if (oldSelectedIndex === 0)
        return 0
      else if (oldSelectedIndex > 0)
        return oldSelectedIndex - 1
      else
        return oldSelectedIndex + 1
    })
    setScanResult(oldScanResult => {
      if (!oldScanResult)
        return null

      const newScanResult = Object.assign({}, oldScanResult)
      newScanResult.errors = oldScanResult.errors.slice().filter(oldScanError => oldScanError.patternName !== scanError.patternName)

      const newResultContainer = ScanResultExtractor.getContainerForPatternType(scanError.patternType, newScanResult)
      if (newResultContainer)
        newResultContainer[scanError.patternName] = tempValue

      return newScanResult
    })
  }

  if (loading)
    return (<h1>LOADING</h1>);

  if (!scanResult)
    return (<h1>ERROR</h1>);

  return (
  <div className="ScanResultOverview">
    <Navbar navigationButtons={[<Link to="/" key="ScanConfigurationLink"><button key="ScanConfigurationButton" name="ScanConfigurationButton" className="primaryButton">Scanconfig</button></Link>]} 
      customButtons={[]}/>
    <div className="split left">
      <ScanErrorList errors={scanResult.errors} changeErrorIndexCallback={setSelectedErrorIndex} />
    </div>
    <div className="split right">
      {selectedErrorIndex >= 0 && selectedErrorIndex <= scanResult.errors.length - 1 ?
        <ScanErrorEditor error={scanResult.errors[selectedErrorIndex]} onRemoveErrorCallback={removeErrorAndSetTempValue}/>
        : 
        <></> 
      }
    </div>
    
  </div>
  );
}

export default ScanResultOverview;
