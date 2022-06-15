import * as React from "react"
import { useEffect, useState } from "react"
import { ScanResultItem } from "../../../utils/ScanResultItem"
import "./ScanResultEditor.css"

interface ScanResultEditorProps {
    resultItem: ScanResultItem
    onChangeValue: (newVal: number) => void
}

const ScanResultEditor = (props: ScanResultEditorProps) => {
    const [value, setValue] = useState(0)

    useEffect(() => {
        setValue(props.resultItem.value)
    }, [props.resultItem])

    function onChangeValue(e: React.FormEvent<HTMLInputElement>) {
        setValue(e.currentTarget.valueAsNumber)
        props.onChangeValue(e.currentTarget.valueAsNumber)
    }

    return (
        <div className="ScanResultEditorComponent">
            <div className="ScanResultEditorHeader">
                {`(${props.resultItem.patternType}) ${props.resultItem.patternName}`}<></>
            </div>
            <div className="ScanResultEditorContent">
                <input type="number" name="valueInput" id="scanResultValueInput" value={value} onChange={onChangeValue}/>
            </div>
        </div>
    );
}

export default ScanResultEditor;