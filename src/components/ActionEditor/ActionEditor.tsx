import * as React from 'react';
import { useEffect, useState } from 'react';
import { Action } from '../../json/scanrequest/Action';
import './ActionEditor.css';

const possibleActionTypes: string[] = ["PatternSearch", "StringSearch", "Offset", "FollowJmp", "GetValue", "GetVFuncIndex"]
const actionArgumentSizes: Record<string, number> = {
  "PatternSearch": 4,
  "StringSearch": 3,
  "Offset": 1,
  "FollowJmp": 0,
  "GetValue": 1,
  "GetVFuncIndex": 1
}

interface ActionEditingProps {
  action: Action 
  index: number
  deleteCallback: (index: number) => void
}

const ActionEditor = (props: ActionEditingProps) => {
  const [selectedActionType, setSelectedActionType] = useState("");
  const [actionArguments, setActionArguments] = useState<string[]>([])

  useEffect(() => {
    setSelectedActionType(props.action.type)
    setActionArguments(props.action.arguments)
  }, [props.action])

  function onChangeActionType(e: React.FormEvent<HTMLSelectElement>) {
    const newArgumentsSize = actionArgumentSizes[e.currentTarget.value]
    const newArgumentsArray = new Array<string>(newArgumentsSize).fill("")
    setSelectedActionType(e.currentTarget.value)
    setActionArguments(newArgumentsArray)
    props.action.type = e.currentTarget.value
    props.action.arguments = newArgumentsArray
  }

  function onChangeArgument(e: React.FormEvent<HTMLSelectElement> | React.FormEvent<HTMLInputElement>, index: number) {
    const newVal = e.currentTarget.value
    setActionArguments(oldArguments => {
      const newArguments = oldArguments.slice()
      newArguments[index] = newVal

      return newArguments
    })
    props.action.arguments[index] = newVal
  }

  function blockNonDigitsInNumberInput(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  }

  function renderArguments (actionType: String) {
    switch (actionType) {
      case "PatternSearch":
        return (
          <>
            <label htmlFor="bytePattern">Pattern: </label>
            <input type="text" name="bytePattern" value={actionArguments[0]} onChange={e=>onChangeArgument(e, 0)}/>
            <label htmlFor="occurrences">Occurrences: </label>
            <input type="number" name="occurrences" min="1" onKeyDown={blockNonDigitsInNumberInput} value={actionArguments[1]} onChange={e=>onChangeArgument(e, 1)}/>
            <label htmlFor="searchDirection">Search direction: </label>
            <select name="searchDirection" value={actionArguments[2]} onChange={e=>onChangeArgument(e, 2)}>
              <option key="down" value="DOWN">Down</option>
              <option key="up" value="UP">Up</option>
            </select>
            <label htmlFor="maxBytesToSearch">Max bytes to search: </label>
            <input type="number" name="maxBytesToSearch" min="1" onKeyDown={blockNonDigitsInNumberInput} value={actionArguments[3]} onChange={e=>onChangeArgument(e, 3)}/>
          </>
        );
      case "StringSearch":
        return (
          <>
            <label htmlFor="string">String: </label>
            <input type="text" name="string" value={actionArguments[0]} onChange={e=>onChangeArgument(e, 0)}/>
            <label htmlFor="occurrences">Occurrences: </label>
            <input type="number" name="occurrences" min="1" onKeyDown={blockNonDigitsInNumberInput} value={actionArguments[1]} onChange={e=>onChangeArgument(e, 1)}/>
            <label htmlFor="addNullTerminator">Add null terminator: </label>
            <input type="checkbox" name="addNullTerminator" value={actionArguments[2]} onChange={e=>onChangeArgument(e, 2)}/>
          </>
        );
      case "Offset":
        return (
          <>
            <label htmlFor="offset">Offset: </label>
            <input type="number" name="offset" min="1" onKeyDown={blockNonDigitsInNumberInput} value={actionArguments[0]} onChange={e=>onChangeArgument(e, 0)}/>
          </>
        );
      case "GetValue":
        return (
          <>
            <label htmlFor="size">Size: </label>
            <input type="number" name="size" min="1" onKeyDown={blockNonDigitsInNumberInput} value={actionArguments[0]} onChange={e=>onChangeArgument(e, 0)}/>
          </>
        );
      case "GetVFuncIndex":
        return (
          <>
            <label htmlFor="size">Size: </label>
            <input type="number" name="size" min="1" onKeyDown={blockNonDigitsInNumberInput} value={actionArguments[0]} onChange={e=>onChangeArgument(e, 0)}/>
          </>
        );
      default:
        return <></>
    }
  }
  
  return (
    <div className="ActionEditor">
      <label htmlFor="actionTypes">Type: </label>
      <select name="actionTypes" value={selectedActionType} onChange={onChangeActionType}>
        {possibleActionTypes.map(typeName => 
            <option key={typeName} value={typeName}>{typeName}</option>
        )}
      </select>
      <div className="actionTools">
        <button className="deleteActionBtn" onClick={() => props.deleteCallback(props.index)}>Delete</button>
        <button className="tryActionBtn">Try</button>
      </div>
      <br/>
      {renderArguments(selectedActionType)}
    </div>
  );
}

export default ActionEditor;
