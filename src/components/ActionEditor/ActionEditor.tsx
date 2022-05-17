import * as React from 'react';
import { useState } from 'react';
import './ActionEditor.css';

const possibleActionTypes = ["PatternSearch", "StringSearch", "Offset", "FollowJmp", "GetValue", "GetVFuncIndex"]


const ActionEditor = () => {
  const [selectedActionType, setSelectedActionType] = useState(possibleActionTypes[0]);
  function onChangeActionType(e: React.FormEvent<HTMLSelectElement>) {
    setSelectedActionType(e.currentTarget.value)
  }

  function renderArguments (actionType: String) {
    switch (actionType) {
      case "PatternSearch":
        return (
          <>
            <label htmlFor="bytePattern">Pattern: </label>
            <input type="text" id="bytePattern" name="bytePattern"/>
            <label htmlFor="occurrences">Occurrences: </label>
            <input type="number" id="occurrences" name="occurrences" min="1"/>
            <label htmlFor="searchDirection">Search direction: </label>
            <select name="searchDirection" id="searchDirection">
              <option key="down" value="DOWN">Down</option>
              <option key="up" value="UP">Up</option>
            </select>
            <label htmlFor="maxBytesToSearch">Max bytes to search: </label>
            <input type="number" id="maxBytesToSearch" name="maxBytesToSearch" min="1"/>
          </>
        );
      case "StringSearch":
        return (
          <>
            <label htmlFor="string">String: </label>
            <input type="text" id="string" name="string"/>
            <label htmlFor="occurrences">Occurrences: </label>
            <input type="number" id="occurrences" name="occurrences" min="1"/>
            <label htmlFor="addNullTerminator">Add null terminator: </label>
            <input type="checkbox" id="addNullTerminator" name="addNullTerminator"/>
          </>
        );
      case "Offset":
        return (
          <>
            <label htmlFor="offset">Offset: </label>
            <input type="number" id="offset" name="offset" min="1"/>
          </>
        );
      case "GetValue":
        return (
          <>
            <label htmlFor="size">Size: </label>
            <input type="number" id="size" name="size" min="1"/>
          </>
        );
      case "GetVFuncIndex":
        return (
          <>
            <label htmlFor="size">Size: </label>
            <input type="number" id="size" name="size" min="1"/>
          </>
        );
      default:
        return <></>
    }
  }
  
  return (
    <div className="ActionEditor">
      <label htmlFor="actionTypes">Type: </label>
      <select name="actionTypes" id="actionTypes" value={selectedActionType} onChange={onChangeActionType}>
        {possibleActionTypes.map(typeName => 
            <option key={typeName} value={typeName}>{typeName}</option>
        )}
      </select>
      <div className="actionTools">
        <button className="deleteActionBtn">Delete</button>
        <button className="tryActionBtn">Try</button>
      </div>
      <br/>
      {renderArguments(selectedActionType)}
    </div>
  );
}

export default ActionEditor;
