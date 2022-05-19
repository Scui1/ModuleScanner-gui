import * as React from 'react';
import './PatternEditor.css';
import ActionEditor from '../ActionEditor/ActionEditor';
import { useEffect, useState } from 'react';
import { Action } from '../../json/scanrequest/Action';
import { Pattern } from '../../json/scanrequest/Pattern';

interface PatternEditorProps {
  pattern: Pattern
}

const PatternEditor = (props: PatternEditorProps) => {
  const [patternName, setPatternName] = useState<string>("")
  const [actions, setActions] = useState<Action[]>([])

  useEffect(() => {
    setActions(props.pattern.actions)
    setPatternName(props.pattern.name)
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

  function onChangePatternName(e: React.FormEvent<HTMLParagraphElement>) {
    const newName: string = e.currentTarget.textContent || ""
    setPatternName(newName)
    props.pattern.name = newName
  }

  return (
  <div className="PatternEditorComponent">
    <div className="PatternEditorHeader">
      <p suppressContentEditableWarning={true} contentEditable="true" onInput={onChangePatternName} onBlur={onChangePatternName}>{patternName}</p>
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
