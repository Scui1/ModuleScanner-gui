import * as React from 'react';
import { Pattern } from '../../json/scanrequest/Pattern';
import './PatternSelection.css';

interface PatternSelectionProps {
  patterns: Pattern[]
  changePatternCallback: (newIndex: number) => void
}

const PatternSelection = (props: PatternSelectionProps) => {
  const [selectedPattern, setSelectedPattern] = React.useState("")

  function onChangePattern(e: React.FormEvent<HTMLSelectElement>) {
    setSelectedPattern(e.currentTarget.value)
    const selectedIndex = props.patterns.findIndex(pattern => pattern.name === e.currentTarget.value)
    props.changePatternCallback(selectedIndex)
  }
  
  return (
  <div className="PatternSelectionComponent">
    <div className="PatternSelectionContainer">
      <p>Pattern</p>
      <select name="Patterns" id="PatternSelection" value={selectedPattern} size={props.patterns.length} onChange={onChangePattern}>
        {props.patterns.map(pattern => 
          <option key={pattern.name.toString()} value={pattern.name.toString()}>{pattern.name.toString()}</option>
        )}
      </select>
    </div>
  </div>
  );
}

export default PatternSelection;
