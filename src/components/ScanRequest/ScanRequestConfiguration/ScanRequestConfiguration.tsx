import * as React from 'react';
import { useEffect, useState } from 'react';
import './ScanRequestConfiguration.css';
import ModuleSelection from '../ModuleSelection/ModuleSelection';
import PatternEditor from '../PatternEditor/PatternEditor';
import PatternSelection from '../PatternSelection/PatternSelection';
import { ScanRequest } from "../../../json/scanrequest/ScanRequest";
import AddPatternPopup from '../AddPatternPopup/AddPatternPopup';
import { Pattern } from '../../../json/scanrequest/Pattern';
import notifier from '../../Notifications/Notifier';
import { ScanResultDisplayer } from '../../../utils/ScanResultDisplayer';
import Navbar from '../../Navbar/Navbar';
import { Link } from 'react-router-dom';
import { ScanConfigService } from '../../../services/ScanConfigService';
import LoadingScreen from '../../LoadingScreen/LoadingScreen';
import ErrorScreen from '../../ErrorScreen/ErrorScreen';

const ScanRequestConfiguration = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [scanRequest, setScanRequest] = useState<ScanRequest | null>(null)
  const [selectedModuleIndex, setSelectedModuleIndex] = useState<number>(0)
  const [selectedPatternIndex, setSelectedPatternIndex] = useState<number>(-1)
  const [addPatternPopupShown, setAddPatternPopupShown] = useState<boolean>(false)
  function changeModuleCallback(newIndex: number) {
    setSelectedPatternIndex(0)
    setSelectedModuleIndex(newIndex)
  }
  function changePatternCallback(newIndex: number) {setSelectedPatternIndex(newIndex)}
  function changePatternNameCallback(newName: string) {
    if (!isValidPatternName(newName)) {
      notifier.error("Not a valid pattern name. Name must not be empty and must not exist.")
      return;
    }

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
    if (!isValidPatternName(newPattern.name)) {
      notifier.error("Not a valid pattern name. Name must not be empty and must not exist.")
      return;
    }

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

  function isValidPatternName(name: string): boolean {
    if (!name || name.length === 0)
      return false

    const nameAlreadyExists = scanRequest?.modules[selectedModuleIndex].patterns
      .filter(pattern => pattern.name === name)
      .length !== 0

    return !nameAlreadyExists
  }

  function removePattern() {
    if (selectedPatternIndex === -1 || !scanRequest)
      return

    const patternName = scanRequest.modules[selectedModuleIndex].patterns[selectedPatternIndex].name
    setSelectedPatternIndex(-1)
    setScanRequest(oldScanRequest => {
      if (!oldScanRequest)
        return oldScanRequest

      const newScanRequest = Object.assign({}, oldScanRequest);
      const module = newScanRequest.modules[selectedModuleIndex]
      const newPatterns = module.patterns.slice().filter(pattern => pattern.name !== patternName)
      newScanRequest.modules[selectedModuleIndex].patterns = newPatterns

      return newScanRequest
    })
  }

  function scanPattern(): Promise<void> {
    if (!scanRequest)
      return new Promise(resolve => resolve())

    return ScanResultDisplayer.scanAndDisplay(scanRequest.modules[selectedModuleIndex].name, scanRequest.modules[selectedModuleIndex].patterns[selectedPatternIndex])
  }

  function scanAction(actionIndex: number): Promise<void> {
    if (!scanRequest)
      return new Promise(resolve => resolve())

    const pattern = Object.assign({}, scanRequest.modules[selectedModuleIndex].patterns[selectedPatternIndex])
    pattern.actions = scanRequest.modules[selectedModuleIndex].patterns[selectedPatternIndex].actions.slice(0, actionIndex + 1)

    return ScanResultDisplayer.scanAndDisplay(scanRequest.modules[selectedModuleIndex].name, pattern)
  }

  function saveScanRequest() {
    if (!scanRequest)
      return

    ScanConfigService.saveScanConfig(scanRequest)
    .then(() => {
      notifier.success("Saved config successfully")
    })
    .catch(reason => {
      notifier.error(`Failed saving config due to: ${reason}`)
    })
  }

  useEffect(() => {
    setLoading(true)
    ScanConfigService.getScanConfig()
      .then(scanRequest => {
        setScanRequest(scanRequest)
        setLoading(false)
      })
      .catch(reason => {
        console.error(reason)
        setLoading(false)
      })
  }, [])
  
  if (loading)
    return (<LoadingScreen/>);

  if (!scanRequest)
    return (<ErrorScreen/>);
  
  return (
    <div className="ScanRequestConfiguration">
      <Navbar navigationButtons={[
          <Link to="/CacheEditor" key="CacheEditorLink"><button key="CacheEditorButton" name="CacheEditorButton" className="primaryButton">Cache Editor</button></Link>,
          <Link to="/ScanMonitor" key="ScanMonitorLink"><button key="ScanMonitorButton" name="ScanMonitorButton" className="primaryButton">Scan Monitor</button></Link>
        ]}
        customButtons={[<button key="SaveButton" name="Save" className="primaryButton" onClick={saveScanRequest}>Save</button>]}/>
      <div className="split left">
        <ModuleSelection modules={scanRequest.modules} changeModuleCallback={changeModuleCallback}/>
        <PatternSelection patterns={scanRequest.modules[selectedModuleIndex].patterns} 
          changePatternCallback={changePatternCallback} addPatternCallback={() => setAddPatternPopupShown(true)} removePatternCallback={removePattern}/>
      </div>
      <div className="split right">
        { selectedPatternIndex >= 0 && selectedPatternIndex <= scanRequest.modules[selectedModuleIndex].patterns.length - 1 &&
          <PatternEditor pattern={scanRequest.modules[selectedModuleIndex].patterns[selectedPatternIndex]} 
            changePatternNameCallback={changePatternNameCallback} changePatternTypeCallback={changePatternTypeCallback} 
            scanPatternCallback={scanPattern} scanActionCallback={scanAction}/>
        }
      </div>
      { addPatternPopupShown && 
        <AddPatternPopup closePopupCallback={() => setAddPatternPopupShown(false)} addNewPatternCallback={addNewPattern}/>
      }
    </div>
  );
};

export default ScanRequestConfiguration;
