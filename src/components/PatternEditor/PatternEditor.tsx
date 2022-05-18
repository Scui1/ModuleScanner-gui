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
  const [actions, setActions] = useState<Action[]>([])

  useEffect(() => {
    setActions(props.pattern.actions)
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
      newAction.arguments = []
      newAction.type = "PatternSearch"

      const updatedAction = [...oldActions, newAction]
      props.pattern.actions = updatedAction
      return updatedAction
    })
  }

  return (
  <div className="PatternEditorComponent">
    <div className="PatternEditorHeader">
      <p suppressContentEditableWarning={true} contentEditable="true">ClientModeShared::CreateMove</p>
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
