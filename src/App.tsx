import * as React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import ModuleSelection from './components/ModuleSelection/ModuleSelection';
import PatternEditor from './components/PatternEditor/PatternEditor';
import PatternSelection from './components/PatternSelection/PatternSelection';
import { ScanRequest } from "./json/scanrequest/ScanRequest";



const App = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [scanRequest, setScanRequest] = useState<ScanRequest | null>(null)
  const [selectedModuleIndex, setSelectedModuleIndex] = useState<number>(0)
  const [selectedPatternIndex, setSelectedPatternIndex] = useState<number>(0)
  function changeModuleCallback(newIndex: number) {setSelectedModuleIndex(newIndex)}
  function changePatternCallback(newIndex: number) {setSelectedPatternIndex(newIndex)}

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
    <div className="App">
      <div className="split left">
        <ModuleSelection modules={scanRequest.modules} changeModuleCallback={changeModuleCallback}/>
        <PatternSelection patterns={scanRequest.modules[selectedModuleIndex].patterns} changePatternCallback={changePatternCallback}/>
      </div>
      <div className="split right">
        <PatternEditor pattern={scanRequest.modules[selectedModuleIndex].patterns[selectedPatternIndex]}/>
      </div>
    </div>
  );
};

export default App;
