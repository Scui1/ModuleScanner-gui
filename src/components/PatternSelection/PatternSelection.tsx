import * as React from 'react';
import { useEffect, useState } from 'react';
import { Pattern } from '../../json/scanrequest/Pattern';
import './PatternSelection.css';

interface PatternSelectionProps {
  patterns: Pattern[]
  changePatternCallback: (newIndex: number) => void
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
  }, [props.patterns])
  
  return (
  <div className="PatternSelectionComponent">
    <div className="PatternSelectionContainer">
      <p>Pattern</p>
      <select name="Patterns" id="PatternSelection" value={selectedPattern} size={props.patterns.length} onChange={onChangeSelectedPattern}>
        {patterns.map(pattern => 
          <option key={pattern.name} value={pattern.name}>{`(${pattern.type}) ${pattern.name}`}</option>
        )}
      </select>
    </div>
  </div>
  );
}

export default PatternSelection;
