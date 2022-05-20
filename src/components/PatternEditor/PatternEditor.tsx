import * as React from 'react';
import './PatternEditor.css';
import ActionEditor from '../ActionEditor/ActionEditor';
import { useEffect, useState } from 'react';
import { Action } from '../../json/scanrequest/Action';
import { Pattern } from '../../json/scanrequest/Pattern';

const possiblePatternTypes = ["Function", "ReturnAddress", "Offset", "Index"]

interface PatternEditorProps {
  pattern: Pattern
  changePatternNameCallback: (newName: string) => void
  changePatternTypeCallback: (newType: string) => void
}

const PatternEditor = (props: PatternEditorProps) => {
  const [patternName, setPatternName] = useState<string>("")
  const [patternType, setPatternType] = useState<string>("")
  const [actions, setActions] = useState<Action[]>([])

  useEffect(() => {
    setActions(props.pattern.actions)
    setPatternName(props.pattern.name)
    setPatternType(props.pattern.type)
  }, [props.pattern])

  function deleteAction(indexToRemove: number) {
    setActions(oldActions => {
      const updatedAction = oldActions.filter((_, index) => index !== indexToRemove)
      props.pattern.actions = updatedAction
      return updatedAction
    })
  }

  function addAction() {
    setActions(oldActions => {
      const newAction = new Action()
      newAction.arguments = ["", "1", "DOWN", "200"]
      newAction.type = "PatternSearch"

      const updatedAction = [...oldActions, newAction]
      props.pattern.actions = updatedAction
      return updatedAction
    })
  }

  function onChangePatternName(e: React.FormEvent<HTMLInputElement>) {
    const newName: string = e.currentTarget.value
    setPatternName(newName)
    props.changePatternNameCallback(newName)
  }

  function onChangePatternType(e: React.FormEvent<HTMLSelectElement>) {
    const newType = e.currentTarget.value
    setPatternType(newType)
    props.changePatternTypeCallback(newType)
  }

  return (
  <div className="PatternEditorComponent">
    <div className="PatternEditorHeader">
      <select id="PatternTypeSelect" name="patternType" value={patternType} onChange={onChangePatternType}>
        {possiblePatternTypes.map(typeName => 
            <option key={typeName} value={typeName}>{typeName}</option>
        )}
      </select>
      <input type="text" id="PatternNameInput" name="patternName" value={patternName} onChange={onChangePatternName}></input>
    </div>
    <div className="EditingArea">
      <div className="ActionsContainer">
        {actions.map((action, index) => 
          <ActionEditor action={action} deleteCallback={deleteAction} index={index} key={index}/>
        )}
      </div>

      <div className="PatternEditorFooter">
        <button className="addActionButton" onClick={addAction}>Add</button>
      </div>
    </div>
  </div>
  );
}

export default PatternEditor;
