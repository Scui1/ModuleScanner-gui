import * as React from 'react';
import { useState } from 'react';
import { Pattern } from '../../../json/scanrequest/Pattern';
import './AddPatternPopup.css';

const possiblePatternTypes = ["Function", "ReturnAddress", "Offset", "Index"]

interface AddPatternPopupPros {
  closePopupCallback: () => void
  addNewPatternCallback: (pattern: Pattern) => void
}

const AddPatternPopup = (props: AddPatternPopupPros) => {
  const [pattern, setPattern] = useState<Pattern>(() => {
    const defaultPattern = new Pattern()
    defaultPattern.actions = []
    defaultPattern.name = ""
    defaultPattern.type = possiblePatternTypes[0]

    return defaultPattern
  })

  function onChangePatternType(e: React.FormEvent<HTMLSelectElement>) {
    const newType = e.currentTarget.value
    setPattern(oldPattern => {
      const newPattern = Object.assign({}, oldPattern)
      newPattern.type = newType
      return newPattern
    })
  }

  function onChangePatternName(e: React.FormEvent<HTMLInputElement>) {
    const newName = e.currentTarget.value
    setPattern(oldPattern => {
      const newPattern = Object.assign({}, oldPattern)
      newPattern.name = newName
      return newPattern
    })
  }

  return (
  <div className="AddPatternPopup">
    <div className="AddPatternPopupContainer">
      <p>Add pattern</p>
      <div className="EditNewPatternArea">
        <select className="NewPatternType" name="patternType" value={pattern.type} onChange={onChangePatternType}>
            {possiblePatternTypes.map(typeName => 
                <option key={typeName} value={typeName}>{typeName}</option>
            )}
        </select>
        <input type="text" className="NewPatternName" name="patternName" value={pattern.name} onChange={onChangePatternName}></input>
      </div>
      <div className="PopupOptions">
        <button className="PopupButton ClosePopupButton" name="ClosePopup" onClick={props.closePopupCallback}>Close</button>
        <button className="PopupButton AddPatternBtn" name="AddPattern" onClick={() => props.addNewPatternCallback(pattern)}>Add</button>
      </div>
    </div>
  </div>
  );
}

export default AddPatternPopup;
