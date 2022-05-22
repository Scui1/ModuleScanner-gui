import * as React from 'react';
import { useEffect, useState } from 'react';
import { Pattern } from '../../json/scanrequest/Pattern';
import './PatternSelection.css';

interface PatternSelectionProps {
  patterns: Pattern[]
  changePatternCallback: (newIndex: number) => void
  addPatternCallback: () => void
  removePatternCallback: () => void
}

const PatternSelection = (props: PatternSelectionProps) => {
  const [selectedPattern, setSelectedPattern] = useState("")
  const [patterns, setPatterns] = useState<Pattern[]>([])

  function onChangeSelectedPattern(e: React.FormEvent<HTMLSelectElement>) {
    setSelectedPattern(e.currentTarget.value)
    const selectedIndex = props.patterns.findIndex(pattern => pattern.name === e.currentTarget.value)
    props.changePatternCallback(selectedIndex)
  }

  useEffect(() => {
    setPatterns(props.patterns)
    const selectedIndex = props.patterns.findIndex(pattern => pattern.name === selectedPattern)
    if (selectedIndex === -1) {
      if (props.patterns.length > 0) {
        setSelectedPattern(props.patterns[0].name)
        props.changePatternCallback(0)
      }
    } else {
      setSelectedPattern(props.patterns[selectedIndex].name)
      props.changePatternCallback(selectedIndex)
    }
  }, [props.patterns, props, selectedPattern])
  
  return (
  <div className="PatternSelectionComponent">
    <div className="PatternSelectionContainer">
      <p className="PatternLabel">Pattern</p>
      <button className="RemovePatternButton" onClick={props.removePatternCallback}>-</button>
      <button className="AddPatternButton" onClick={props.addPatternCallback}>+</button>
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
