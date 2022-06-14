import * as React from "react";
import { useState } from "react";
import { ScanError } from "../../../json/scanresult/ScanError";
import "./ScanErrorList.css";

interface ScanErrorListProps {
    errors: ScanError[]
    changeErrorIndexCallback: (index: number) => void 
}

const ScanErrorList = (props: ScanErrorListProps) => {
    const [selectedErrorName, setSelectedErrorName] = useState("")

    function onChangeSelectedError(e: React.FormEvent<HTMLSelectElement>) {
        setSelectedErrorName(e.currentTarget.value)
        props.changeErrorIndexCallback(e.currentTarget.selectedIndex)
    }

    if (props.errors.length === 0)
        return (<></>);

    return (
        <div className="ScanErrorListComponent">
            <div className="ScanErrorListContainer">
                <p>Errors</p>
                <select name="errors" id="ScanErrorSelection" value={selectedErrorName} size={props.errors.length} onChange={onChangeSelectedError}>
                    {props.errors.map((error, index) => 
                        <option key={`Error${index}`} value={error.patternName}>{error.patternName}</option>
                    )}
                </select>
            </div>

        </div>
    );
}

export default ScanErrorList;