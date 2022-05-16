import React from 'react';
import './App.css';
import ModuleSelection from './components/ModuleSelection/ModuleSelection';
import PatternEditor from './components/PatternEditor/PatternEditor';
import PatternSelection from './components/PatternSelection/PatternSelection';

const App = () => {
  return (
    <div className="App">
      <div className="split left">
        <ModuleSelection/>
        <PatternSelection/>
      </div>
      <div className="split right">
        <PatternEditor/>
      </div>
    </div>
  );
};

export default App;
