import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ScanResult } from '../../../json/scanresult/ScanResult';
import { ScanResultService } from '../../../services/ScanResultService';
import { ScanResultExtractor } from '../../../utils/ScanResultExtractor';
import { ScanResultItem } from '../../../utils/ScanResultItem';
import { ScanResultToItemsConverter } from '../../../utils/ScanResultToItemsConverter';
import notifier from '../../Notifications/Notifier';
import Navbar from '../../Navbar/Navbar';
import ScanErrorEditor from '../ScanErrorEditor/ScanErrorEditor';
import ScanErrorList from '../ScanErrorList/ScanErrorList';
import ScanResultEditor from '../ScanResultEditor/ScanResultEditor';
import ScanResultList from '../ScanResultList/ScanResultList';
import './ScanResultOverview.css';
import LoadingScreen from '../../LoadingScreen/LoadingScreen';
import ErrorScreen from '../../ErrorScreen/ErrorScreen';

const ScanResultOverview = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [scanResult, setScanResult] = useState<ScanResult | null>(null)
  const [selectedErrorIndex, setSelectedErrorIndex] = useState<number>(0)
  const [selectedResultIndex, setSelectedResultIndex] = useState<number>(-1)
  const [resultItems, setResultItems] = useState<ScanResultItem[]>([])

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

  useEffect(() => {
    setResultItems(oldItems => {
      if (!scanResult)
        return []

      return ScanResultToItemsConverter.convertScanResultToItems(scanResult)
    })
  }, [scanResult])

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

  function onSelectResult(newIndex: number) {
    setSelectedResultIndex(newIndex)
  }

  function onSetResultValue(newValue: number) {
    if (!scanResult)
      return

    const selectedResultItem = resultItems[selectedResultIndex]
    const patternName = selectedResultItem.patternName
    const patternType = selectedResultItem.patternType

    setScanResult(oldScanResult => {
      if (!oldScanResult)
        return null

      const newScanResult = Object.assign({}, oldScanResult)
      const newResultContainer = ScanResultExtractor.getContainerForPatternType(patternType, newScanResult)
      if (newResultContainer)
        newResultContainer[patternName] = newValue
      
      return newScanResult
    })
  }

  function saveScanResult() {
    if (!scanResult)
      return
    
    ScanResultService.saveScanResult(scanResult)
      .then(() => {
        notifier.success("Saved result successfully")
      })
      .catch(reason => {
        notifier.error(`Failed saving result due to: ${reason}`)
      })
  }

  if (loading)
    return (<LoadingScreen/>);

  if (!scanResult)
   return (<ErrorScreen/>);

  return (
  <div className="ScanResultOverview">
    <Navbar navigationButtons={[<Link to="/" key="ScanConfigurationLink"><button key="ScanConfigurationButton" name="ScanConfigurationButton" className="primaryButton">Scanconfig</button></Link>]} 
      customButtons={[<button key="SaveButton" name="Save" className="primaryButton" onClick={saveScanResult}>Save</button>]}/>
    <div className="split left">
      <ScanErrorList errors={scanResult.errors} changeErrorIndexCallback={setSelectedErrorIndex} />
      <ScanResultList onSelectResult={onSelectResult} resultItems={resultItems} />
    </div>
    <div className="split right">
      {selectedErrorIndex >= 0 && selectedErrorIndex <= scanResult.errors.length - 1 ?
        <ScanErrorEditor error={scanResult.errors[selectedErrorIndex]} onRemoveErrorCallback={removeErrorAndSetTempValue}/>

        : selectedResultIndex >= 0 && selectedResultIndex <= resultItems.length - 1 ?
          <ScanResultEditor resultItem={resultItems[selectedResultIndex]} onChangeValue={onSetResultValue}/>
        :
        <p>You need to select something...</p> 
      }
    </div>
    
  </div>
  );
}

export default ScanResultOverview;
