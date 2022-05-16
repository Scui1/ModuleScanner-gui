import React from 'react';
import './ModuleSelection.css';

const modules = ["client.dll", "engine.dll", "server.dll", "materialsystem.dll"];

const ModuleSelection = () => {
  
  return (
  <div className="ModuleSelectionComponent">
    <div className="ModuleSelectionContainer">
      <p>Module</p>
      <select name="modules" id="ModuleSelection" size={modules.length}>
        {modules.map(moduleName => 
          <option key={moduleName} value={moduleName}>{moduleName}</option>
        )}
      </select>
    </div>
  </div>
  );
}

ModuleSelection.propTypes = {};

ModuleSelection.defaultProps = {};

export default ModuleSelection;
