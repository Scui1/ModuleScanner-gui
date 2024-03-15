import * as React from 'react';
import { useEffect, useState } from 'react';
import { Pattern } from '../../../json/scanrequest/Pattern';
import './PatternSelection.css';

interface PatternSelectionProps {
  patterns: Pattern[]
  changePatternCallback: (newIndex: number) => void
  addPatternCallback: () => void
  removePatternCallback: () => void
}

const PatternSelection = (props: PatternSelectionProps) => {
  const [selectedPattern, setSelectedPattern] = useState("")
  const [selectedPatternIndex, setSelectedPatternIndex] = useState(0)
  const [patterns, setPatterns] = useState<Pattern[]>([])

  function onChangeSelectedPattern(e: React.FormEvent<HTMLSelectElement>) {
    const selectedIndex = props.patterns.findIndex(pattern => pattern.name === e.currentTarget.value)
    setSelectedPatternIndex(selectedIndex)
    setSelectedPattern(e.currentTarget.value)
    props.changePatternCallback(selectedIndex)
  }

  useEffect(() => {
    setPatterns(props.patterns)
    if (props.patterns.length > 0 && selectedPatternIndex < props.patterns.length) {
        setSelectedPattern(props.patterns[selectedPatternIndex].name)
        props.changePatternCallback(selectedPatternIndex)
    }
  }, [props.patterns, props, selectedPatternIndex])
  
  return (
  <div className="PatternSelectionComponent">
    <div className="PatternSelectionContainer">
      <p className="PatternLabel">Pattern</p>
      <button className="primaryButton RemovePatternButton" onClick={props.removePatternCallback}>-</button>
      <button className="primaryButton AddPatternButton" onClick={props.addPatternCallback}>+</button>
      <select name="Patterns" id="PatternSelection" value={selectedPattern} size={props.patterns.length} onChange={onChangeSelectedPattern}>
        {patterns.map((pattern, index) => 
          <option key={pattern.name + index} value={pattern.name}>{`(${pattern.type}) ${pattern.name}`}</option>
        )}
      </select>
    </div>
  </div>
  );
}

export default PatternSelection;
