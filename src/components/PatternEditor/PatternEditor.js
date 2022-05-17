import React from 'react';
import './PatternEditor.css';
import ActionEditor from '../ActionEditor/ActionEditor';

const PatternEditor = () => (
  <div className="PatternEditorComponent">
    <div className="PatternEditorHeader">
      <p suppressContentEditableWarning={true} contentEditable="true">ClientModeShared::CreateMove</p>
    </div>
    <div className="EditingArea">
      <div className="ActionsContainer">
        <ActionEditor/>
        <ActionEditor/>
        <ActionEditor/>
        <ActionEditor/>
        <ActionEditor/>
        <ActionEditor/>
        <ActionEditor/>
        <ActionEditor/>
        <ActionEditor/>
      </div>

      <div className="PatternEditorFooter">
        <button className="addActionButton">Add</button>
      </div>
    </div>
  </div>
);

export default PatternEditor;
