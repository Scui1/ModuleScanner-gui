import * as React from 'react';
import { useEffect, useState } from 'react';
import './ScanRequestConfiguration.css';
import ModuleSelection from '../ModuleSelection/ModuleSelection';
import PatternEditor from '../PatternEditor/PatternEditor';
import PatternSelection from '..//PatternSelection/PatternSelection';
import { ScanRequest } from "../../json/scanrequest/ScanRequest";
import AddPatternPopup from '../AddPatternPopup/AddPatternPopup';
import { Pattern } from '../../json/scanrequest/Pattern';

const ScanRequestConfiguration = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [scanRequest, setScanRequest] = useState<ScanRequest | null>(null)
  const [selectedModuleIndex, setSelectedModuleIndex] = useState<number>(0)
  const [selectedPatternIndex, setSelectedPatternIndex] = useState<number>(0)
  const [addPatternPopupShown, setAddPatternPopupShown] = useState<boolean>(false)
  function changeModuleCallback(newIndex: number) {setSelectedModuleIndex(newIndex)}
  function changePatternCallback(newIndex: number) {setSelectedPatternIndex(newIndex)}
  function changePatternNameCallback(newName: string) {
    setScanRequest(oldScanRequest => {
      if (!oldScanRequest)
        return oldScanRequest

      const newScanRequest = Object.assign({}, oldScanRequest);
      newScanRequest.modules[selectedModuleIndex].patterns[selectedPatternIndex].name = newName

      return newScanRequest
    })
  }

  function changePatternTypeCallback(newType: string) {
    setScanRequest(oldScanRequest => {
      if (!oldScanRequest)
        return oldScanRequest

      const newScanRequest = Object.assign({}, oldScanRequest);
      newScanRequest.modules[selectedModuleIndex].patterns[selectedPatternIndex].type = newType

      return newScanRequest
    })
  }
  
  function addNewPattern(newPattern: Pattern) {
    setScanRequest(oldScanRequest => {
      if (!oldScanRequest)
        return oldScanRequest

        const newScanRequest = Object.assign({}, oldScanRequest);
        const newPatterns = newScanRequest.modules[selectedModuleIndex].patterns.slice()
        newPatterns.push(newPattern)
        newScanRequest.modules[selectedModuleIndex].patterns = newPatterns

        return newScanRequest
    })
  }

  useEffect(() => {
    setLoading(true)
    fetch('https://187ju.de/api/getScanConfig.php')
    .then(response => response.json())
    .then(scanRequestJson => {
      setScanRequest( Object.assign(new ScanRequest(), scanRequestJson) as ScanRequest)
      setLoading(false)
    })
    .catch(reason => {
      console.error(reason)
      setLoading(false)
    })
  }, [])


  
  // new loadingscreen component?
  if (loading)
    return (<h1>LOADING</h1>);

  if (!scanRequest)
    return (<h1>ERROR</h1>);
  
  return (
    <div className="ScanRequestConfiguration">
      <div className="split left">
        <ModuleSelection modules={scanRequest.modules} changeModuleCallback={changeModuleCallback}/>
        <PatternSelection patterns={scanRequest.modules[selectedModuleIndex].patterns} 
          changePatternCallback={changePatternCallback} openAddPatternCallback={() => setAddPatternPopupShown(true)}/>
      </div>
      <div className="split right">
        <PatternEditor pattern={scanRequest.modules[selectedModuleIndex].patterns[selectedPatternIndex]} 
          changePatternNameCallback={changePatternNameCallback} changePatternTypeCallback={changePatternTypeCallback}/>
      </div>
      { addPatternPopupShown ? <AddPatternPopup closePopupCallback={() => setAddPatternPopupShown(false)} addNewPatternCallback={addNewPattern}/> 
        : <></>
      }
    </div>
  );
};

export default ScanRequestConfiguration;
