import * as React from "react";
import { useState } from "react";
import { ScanResultItem } from "../../../utils/ScanResultItem";
import "./ScanResultList.css";

interface ScanErrorListProps {
    resultItems: ScanResultItem[]
    onSelectResult:(index: number) => void
}

const ScanResultList = (props: ScanErrorListProps) => {
    const [selectedResult, setSelectedResult] = useState("")

    function onSelectResultItem(e: React.FormEvent<HTMLSelectElement>) {
        setSelectedResult(e.currentTarget.value)
        props.onSelectResult(e.currentTarget.selectedIndex)
    }

    return (
        <div className="ScanResultListComponent">
            <div className="ScanResultListContainer">
                <p>Results</p>
                <select name="results" id="ScanResultSelection" value={selectedResult} size={props.resultItems.length} onChange={onSelectResultItem}>
                    {props.resultItems.map((item, index) => 
                        <option key={`ResultItem${index}`} value={item.patternName}>{`(${item.patternType}) ${item.patternName}`}</option>
                    )}
                </select>
            </div>
        </div>
    );
}

export default ScanResultList