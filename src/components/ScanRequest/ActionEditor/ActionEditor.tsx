import * as React from 'react';
import { useEffect, useState } from 'react';
import { Action } from '../../../json/scanrequest/Action';
import './ActionEditor.css';

const possibleActionTypes: string[] = ["PatternSearch", "StringSearch", "GetExport", "Offset", "FollowJmp", "GetValue", "GetVFuncIndex", "Deref"]

interface ActionEditingProps {
  action: Action 
  index: number
  deleteCallback: (index: number) => void
  tryCallback: (index: number) => void
}

const ActionEditor = (props: ActionEditingProps) => {
  const [selectedActionType, setSelectedActionType] = useState("");
  const [actionArguments, setActionArguments] = useState<string[]>([])

  useEffect(() => {
    setSelectedActionType(props.action.type)
    setActionArguments(props.action.arguments)
  }, [props.action])

  function onChangeActionType(e: React.FormEvent<HTMLSelectElement>) {
    const newActionType = e.currentTarget.value
    const newArgumentsArray = getDefaultArgumentsForActionType(newActionType)
    setSelectedActionType(newActionType)
    setActionArguments(newArgumentsArray)
    props.action.type = newActionType
    props.action.arguments = newArgumentsArray
  }

  function onChangeArgument(e: React.FormEvent<HTMLSelectElement> | React.FormEvent<HTMLInputElement>, index: number) {
    let newVal = e.currentTarget.value
    if (e.currentTarget.type === "checkbox") {
      newVal = (e as React.FormEvent<HTMLInputElement>).currentTarget.checked.toString()
    } else if (e.currentTarget.type === "number") {
      const parsedValue = parseInt(newVal)
      if (isNaN(parsedValue)) {
        newVal = actionArguments[index]
      } else {
        newVal = parsedValue.toString()
      }
    } else {
      newVal = convertEscapedCharsToAscii(newVal)
    }

    setActionArguments(oldArguments => {
      const newArguments = oldArguments.slice()
      newArguments[index] = newVal

      return newArguments
    })
    props.action.arguments[index] = newVal
  }

  function validatePattern(e: React.FormEvent<HTMLInputElement>) {
    const newVal = e.currentTarget.value
    if (newVal.trim().length === 0) {
      e.currentTarget.classList.add("actionInputError")
      return
    }

    const patternRegex = /^([A-F0-9]{2}|[?]{1,2})$/
    const byteStrings = newVal.split(" ")
    for (const byteString of byteStrings) {
      if (!patternRegex.test(byteString)) {
        e.currentTarget.classList.add("actionInputError")
        return
      }
    }

    e.currentTarget.classList.remove("actionInputError")
  }

  function convertEscapedCharsToAscii(toUnescape: string) {
    return toUnescape
      .replaceAll("\\n", "\n")
      .replaceAll("\\t", "\t")
  }

  function escapeAsciiChars(toEscape: string) {
    return toEscape
      .replaceAll("\n", "\\n")
      .replaceAll("\t", "\\t")
  }

  function getDefaultArgumentsForActionType(actionType: string) {
    switch(actionType) {
      case "PatternSearch":
        return ["", "1", "DOWN", "200"]
      case "StringSearch":
        return ["", "1", "false"]
      case "GetExport":
        return [""]
      case "Offset":
        return ["1"]
      case "GetValue":
        return ["4"]
      case "GetVFuncIndex":
        return ["4"]
      case "Deref":
        return ["1"]
    }
    return []
  }

  function renderArguments (actionType: string) {
    switch (actionType) {
      case "PatternSearch":
        return (
          <>
            <label htmlFor="bytePattern">Pattern: </label>
            <input type="text" className="actionInputBig" name="bytePattern" value={actionArguments[0]} onChange={(e)=>{onChangeArgument(e, 0); validatePattern(e)}}/>
            <label htmlFor="occurrences">Occurrences: </label>
            <input type="number" className="actionInputSmall" name="occurrences" min="1" value={actionArguments[1]} onChange={e=>onChangeArgument(e, 1)}/>
            { props.index > 0 && <>
              <label htmlFor="searchDirection">Search direction: </label>
              <select name="searchDirection" value={actionArguments[2]} onChange={e=>onChangeArgument(e, 2)}>
                <option key="down" value="DOWN">Down</option>
                <option key="up" value="UP">Up</option>
              </select>
              <label htmlFor="maxBytesToSearch">Max bytes to search: </label>
              <input type="number" className="actionInputSmall" name="maxBytesToSearch" min="1" value={actionArguments[3]} onChange={e=>onChangeArgument(e, 3)}/> 
            </> }
            
          </>
        );
      case "StringSearch":
        return (
          <>
            <label htmlFor="string">String: </label>
            <input type="text" className="actionInputBig" name="string" value={escapeAsciiChars(actionArguments[0])} onChange={e=>onChangeArgument(e, 0)}/>
            <label htmlFor="occurrences">Occurrences: </label>
            <input type="number" className="actionInputSmall" name="occurrences" min="1" value={actionArguments[1]} onChange={e=>onChangeArgument(e, 1)}/>
            <label htmlFor="addNullTerminator">Add null terminator: </label>
            <input type="checkbox" name="addNullTerminator" checked={actionArguments[2] === "true"} onChange={e=>onChangeArgument(e, 2)}/>
          </>
        );
      case "GetExport":
        return (
            <>
              <label htmlFor="exportName">Name: </label>
              <input type="text" className="actionInputSmall" name="exportName" value={actionArguments[0]} onChange={e=>onChangeArgument(e, 0)}/>
            </>
        );
      case "Offset":
        return (
          <>
            <label htmlFor="offset">Offset: </label>
            <input type="number" className="actionInputSmall" name="offset" value={actionArguments[0]} onChange={e=>onChangeArgument(e, 0)}/>
          </>
        );
      case "GetValue":
        return (
          <>
            <label htmlFor="size">Size: </label>
            <input type="number" className="actionInputSmall" name="size" min="1" max="4" value={actionArguments[0]} onChange={e=>onChangeArgument(e, 0)}/>
          </>
        );
      case "GetVFuncIndex":
        return (
          <>
            <label htmlFor="size">Size: </label>
            <input type="number" className="actionInputSmall" name="size" min="1" max="4" value={actionArguments[0]} onChange={e=>onChangeArgument(e, 0)}/>
          </>
        );
      case "Deref":
        return (
          <>
            <label htmlFor="times">Times: </label>
            <input type="number" className="actionInputSmall" name="times" min="1" value={actionArguments[0]} onChange={e=>onChangeArgument(e, 0)}/>
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
        <button className="primaryButton" onClick={() => props.deleteCallback(props.index)}>Delete</button>
        <button className="primaryButton" onClick={() => props.tryCallback(props.index)}>Try</button>
      </div>
      <br/>
      {renderArguments(selectedActionType)}
    </div>
  );
}

export default ActionEditor;
