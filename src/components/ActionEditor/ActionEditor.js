import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ActionEditor.css';

const possibleActionTypes = ["PatternSearch", "StringSearch", "Offset", "FollowJmp", "GetValue", "GetVFuncIndex"]


const ActionEditor = () => {
  const [selectedActionType, setSelectedActionType] = useState(possibleActionTypes[0]);
  function onChangeActionType(e) {
    setSelectedActionType(e.target.value)
  }

  function renderArguments (actionType) {
    switch (actionType) {
      case "PatternSearch":
        return (
          <>
            <label for="bytePattern">Pattern: </label>
            <input type="text" id="bytePattern" name="bytePattern"/>
            <label for="occurrences">Occurrences: </label>
            <input type="number" id="occurrences" name="occurrences" min="1"/>
            <label for="searchDirection">Search direction: </label>
            <select name="searchDirection" id="searchDirection">
              <option key="down" value="DOWN">Down</option>
              <option key="up" value="UP">Up</option>
            </select>
            <label for="maxBytesToSearch">Max bytes to search: </label>
            <input type="number" id="maxBytesToSearch" name="maxBytesToSearch" min="1"/>
          </>
        );
      case "StringSearch":
        return (
          <>
            <label for="string">String: </label>
            <input type="text" id="string" name="string"/>
            <label for="occurrences">Occurrences: </label>
            <input type="number" id="occurrences" name="occurrences" min="1"/>
            <label for="addNullTerminator">Add null terminator: </label>
            <input type="checkbox" id="addNullTerminator" name="addNullTerminator"/>
          </>
        );
      case "Offset":
        return (
          <>
            <label for="offset">Offset: </label>
            <input type="number" id="offset" name="offset" min="1"/>
          </>
        );
      case "GetValue":
        return (
          <>
            <label for="size">Size: </label>
            <input type="number" id="size" name="size" min="1"/>
          </>
        );
      case "GetVFuncIndex":
        return (
          <>
            <label for="size">Size: </label>
            <input type="number" id="size" name="size" min="1"/>
          </>
        );
      default:
        return <></>
    }
  }
  
  return (
    <div className="ActionEditor">
      <label for="actionTypes">Type: </label>
      <select name="actionTypes" id="actionTypes" value={selectedActionType} onChange={onChangeActionType}>
        {possibleActionTypes.map(typeName => 
            <option value={typeName}>{typeName}</option>
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




ActionEditor.propTypes = {};

ActionEditor.defaultProps = {};

export default ActionEditor;
