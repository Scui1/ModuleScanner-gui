import * as React from "react";
import { useState } from "react";
import { ScanError } from "../../../json/scanresult/ScanError";
import './ScanErrorEditor.css';

interface ScanErrorEditorProps {
    error: ScanError
    onRemoveErrorCallback: (tempValue: number) => void
}

const ScanErrorEditor = (props: ScanErrorEditorProps) => {
    const [tempValue, setTempValue] = useState(0)

    function onChangeTempValue(e: React.FormEvent<HTMLInputElement>) {
        setTempValue(e.currentTarget.valueAsNumber)
    }

    function onRemoveError() {
        props.onRemoveErrorCallback(tempValue)
    }

    return (
        <div className="ScanErrorEditorComponent">
            <div className="ScanErrorEditorHeader">
                {`(${props.error.patternType}) ${props.error.patternName}`}<></>
            </div>
            <div className="ScanErrorEditorContent">
                <div className="ScanErrorEditorDescription">
                    <p>Description:</p>
                    <p>{props.error.description}</p>
                </div>
                <br/>
                <input type="number" name="tempValueInput" id="tempValueInput" value={tempValue} onChange={onChangeTempValue}/>
                <button className="dangerousButton" onClick={onRemoveError}>Set temporary value and remove error</button>
                <p className="ScanErrorEditorWarnRemoveText">Warning: when the error is removed, the error message cannot be viewed anymore.</p>
            </div>
            
        </div>
    );
}

export default ScanErrorEditor;