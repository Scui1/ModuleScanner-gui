import React from 'react';
import PropTypes from 'prop-types';
import './PatternEditor.css';
import ActionEditor from '../ActionEditor/ActionEditor';

const PatternEditor = () => (
  <div className="PatternEditorComponent">
    <div className="PatternEditorHeader">
      <p contenteditable="true">ClientModeShared::CreateMove</p>
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

PatternEditor.propTypes = {};

PatternEditor.defaultProps = {};

export default PatternEditor;
