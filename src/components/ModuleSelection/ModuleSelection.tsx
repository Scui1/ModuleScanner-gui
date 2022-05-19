import * as React from 'react';
import { useState } from 'react';
import { Module } from '../../json/scanrequest/Module';
import './ModuleSelection.css';


interface ModuleSelectionProps {
  modules: Module[]
  changeModuleCallback: (newIndex: number) => void
}

const ModuleSelection = (props: ModuleSelectionProps) => {
  const [selectedModule, setSelectedModule] = useState("")

  function onChangeModule(e: React.FormEvent<HTMLSelectElement>) {
    setSelectedModule(e.currentTarget.value)
    const selectedIndex = props.modules.findIndex(module => module.name === e.currentTarget.value)
    props.changeModuleCallback(selectedIndex)
  }

  return (
  <div className="ModuleSelectionComponent">
    <div className="ModuleSelectionContainer">
      <p>Module</p>
      <select name="modules" id="ModuleSelection" value={selectedModule} size={props.modules.length} onChange={onChangeModule}>
        {props.modules.map(module => 
          <option key={module.name} value={module.name}>{module.name}</option>
        )}
      </select>
    </div>
  </div>
  );
}

export default ModuleSelection;
