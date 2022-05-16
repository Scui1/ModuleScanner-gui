import React from 'react';
import PropTypes from 'prop-types';
import './PatternSelection.css';

const patterns = ["Pattern1", "Pattern2", "Pattern3", "Pattern4"]

const PatternSelection = () => {
  
  return (
  <div className="PatternSelectionComponent">
    <div className="PatternSelectionContainer">
      <p>Pattern</p>
      <select name="Patterns" id="PatternSelection" size={patterns.length}>
        {patterns.map(patternName => 
          <option key={patternName} value={patternName}>{patternName}</option>
        )}
      </select>
    </div>
  </div>
  );
}

PatternSelection.propTypes = {};

PatternSelection.defaultProps = {};

export default PatternSelection;
